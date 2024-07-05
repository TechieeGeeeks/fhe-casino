// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./BankRoll.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "fhevm/lib/TFHE.sol";

contract Mines is Ownable {
    using SafeERC20 for IERC20;

    address public betTokenAddress;
    bool public isInitialised;
    uint256 public houseBalance;
    uint256 counter;

    modifier onlyWhenInitialised() {
        require(isInitialised, "Contract is not initialized");
        _;
    }

    address public bankRoll;

    constructor(address _tokenAddress, address _bankRoll) Ownable(msg.sender) {
        betTokenAddress = _tokenAddress;
        bankRoll = _bankRoll;
    }

    function _transferWager(uint256 wager, address player) internal {
        require(wager >= 1, "Wager must be at least 1");
        Bankroll(bankRoll).transferToBankRoll(player, wager);
    }

    function _transferPayout(address player, uint256 payout) internal {
        Bankroll(bankRoll).transferFromBankRoll(player, payout);
    }


    event MinesGameOutcome(
        address indexed playerAddress,
        uint256 wager,
        uint256 payout,
        address tokenAddress,
        uint8[2][] selectedPoints,
        uint8[2][] minePositions
    );

    function placeBet(uint8[2][] memory points, uint8 numMines, uint256 wager) external onlyWhenInitialised {
        require(wager > 0, "Wager must be greater than zero");
        require(numMines > 0 && numMines <= 5, "Invalid number of mines");
        
        for (uint8 i = 0; i < points.length; i++) {
            require(points[i][0] < 5 && points[i][1] < 5, "Invalid point coordinates");
        }

        _transferWager(wager, msg.sender);
        settleBet(points, numMines, wager, msg.sender);
    }

    function settleBet(uint8[2][] memory points, uint8 numMines, uint256 wager, address playerAddress) internal {
        require(playerAddress != address(0), "Invalid player address");

        uint32 random = uint32(TFHE.decrypt(TFHE.randEuint32()));
        uint8[2][] memory minePositions = new uint8[2][](numMines);

        for (uint8 i = 0; i < numMines; i++) {
            uint8 randValue1 = uint8((random >> (i * 3)) & 0x07) % 6;
            uint8 randValue2 = uint8((random >> ((i * 3) + 1)) & 0x07) % 6;
            minePositions[i] = [randValue1 , randValue2 ];
        }

        bool hitMine = false;
        for (uint8 i = 0; i < points.length; i++) {
            for (uint8 j = 0; j < minePositions.length; j++) {
                if (points[i][0] == minePositions[j][0] && points[i][1] == minePositions[j][1]) {
                    hitMine = true;
                    break;
                }
            }
            if (hitMine) break;
        }

        uint256 payout = 0;
        if (!hitMine) {
            payout = calculatePayout(uint8(points.length), numMines, wager);
            _transferPayout(playerAddress, payout);
        }

        houseBalance += wager;
        if (payout > 0) {
            houseBalance -= payout;
        }

        emit MinesGameOutcome(playerAddress, wager, payout, betTokenAddress, points, minePositions);
    }

    function calculatePayout(uint8 numPoints, uint8 numMines, uint256 wager) internal pure returns (uint256) {
        uint256 difficultyFactor = numPoints * numMines;
        return wager * difficultyFactor; // Adjust the payout logic as needed
    }

}
