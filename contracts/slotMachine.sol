// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SlotMachine is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    address public betTokenAddress;
    bool public isInitialised;

    modifier onlyWhenInitialised() {
        require(isInitialised, "Contract is not initialized");
        _;
    }

    constructor(address _tokenAddress) Ownable(msg.sender) {
        betTokenAddress = _tokenAddress;
    }

    function initialize() external onlyOwner {
        require(
            IERC20(betTokenAddress).transferFrom(
                msg.sender,
                address(this),
                10000 * 10**18
            ),
            "Initial funding failed"
        );
        isInitialised = true;
    }

    struct SlotMachineGame {
        uint256 wager;
        uint256 stopGain;
        uint256 stopLoss;
        uint64 blockNumber;
        uint32 numSpins;
    }

    mapping(address => SlotMachineGame) slotMachineGames;

    event SlotMachine_Play_Event(
        address indexed playerAddress,
        uint256 wager,
        uint32 numSpins,
        uint256 stopGain,
        uint256 stopLoss
    );

    event SlotMachine_Outcome_Event(
        address indexed playerAddress,
        uint256 wager,
        uint256 payout,
        address tokenAddress,
        uint8[3][] spins,
        uint256[] payouts,
        uint32 numGames
    );

    function SlotMachine_Play(
        uint256 wager,
        uint32 numSpins,
        uint256 stopGain,
        uint256 stopLoss
    ) external nonReentrant onlyWhenInitialised {
        require(numSpins > 0 && numSpins <= 10, "Invalid number of spins");

        address msgSender = msg.sender;
        _transferWager(wager * numSpins, msgSender);

        slotMachineGames[msgSender] = SlotMachineGame(
            wager,
            stopGain,
            stopLoss,
            uint64(block.number),
            numSpins
        );

        emit SlotMachine_Play_Event(
            msgSender,
            wager,
            numSpins,
            stopGain,
            stopLoss
        );

        getRandomNumberAndSettleBets(numSpins, msgSender);
    }

    function settleBet(uint32[] memory randomWords, address playerAddress)
        internal
    {
        if (playerAddress == address(0)) revert();

        SlotMachineGame storage game = slotMachineGames[playerAddress];
        int256 totalValue;
        uint256 payout;
        uint32 i;
        uint8[3][] memory spins = new uint8[3][](game.numSpins);
        uint256[] memory payouts = new uint256[](game.numSpins);

        address tokenAddress = betTokenAddress;

        for (i = 0; i < game.numSpins; i++) {
            if (totalValue >= int256(game.stopGain)) {
                break;
            }
            if (totalValue <= -int256(game.stopLoss) && game.stopLoss != 0) {
                break;
            }

            spins[i] = [
                uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) % 8),
                uint8(uint256(keccak256(abi.encodePacked(block.number, msg.sender, i))) % 8),
                uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), msg.sender, i))) % 8)
            ];

            uint256 spinPayout = calculatePayout(spins[i], game.wager);
            totalValue += int256(spinPayout - game.wager);
            payout += spinPayout;
            payouts[i] = spinPayout;
        }

        emit SlotMachine_Outcome_Event(
            playerAddress,
            game.wager,
            payout,
            tokenAddress,
            spins,
            payouts,
            i
        );

        delete slotMachineGames[playerAddress];
        if (payout != 0) {
            _transferPayout(playerAddress, payout, tokenAddress);
        }
    }

    function calculatePayout(uint8[3] memory numbers, uint256 betAmount) internal pure returns (uint256) {
        if (numbers[0] == 7 && numbers[1] == 7 && numbers[2] == 7) {
            return betAmount * 100;
        }

        if (numbers[0] == numbers[1] && numbers[1] == numbers[2]) {
            return betAmount * (numbers[0] + 1) * 10;
        }

        if ((numbers[0] == 7 && numbers[1] == 7) || (numbers[0] == 7 && numbers[2] == 7) || (numbers[1] == 7 && numbers[2] == 7)) {
            return betAmount * 20;
        }

        if ((numbers[0] + 1 == numbers[1] && numbers[1] + 1 == numbers[2]) || 
            (numbers[0] - 1 == numbers[1] && numbers[1] - 1 == numbers[2])) {
            return betAmount * 15;
        }

        if (numbers[0] == numbers[1] || numbers[0] == numbers[2] || numbers[1] == numbers[2]) {
            return betAmount * 5;
        }

        return 0;
    }

    function getRandomNumberAndSettleBets(uint32 numSpins, address playerAddress) public {
        require(numSpins > 0, "Invalid number of spins");

        uint32[] memory randomNumberArray = new uint32[](numSpins);
        for (uint256 i = 0; i < numSpins; i++) {
            randomNumberArray[i] = uint32(
                uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, i))) % 2**32
            );
        }

        settleBet(randomNumberArray, playerAddress);
    }

    function _transferWager(uint256 wager, address msgSender) internal {
        require(wager > 0, "Zero wager");
        IERC20(betTokenAddress).safeTransferFrom(
            msgSender,
            address(this),
            wager
        );
    }

    function _transferPayout(address player, uint256 payout, address tokenAddress) internal {
        IERC20(tokenAddress).safeTransfer(player, payout);
    }
}
