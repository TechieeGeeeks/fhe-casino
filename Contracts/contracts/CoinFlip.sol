// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./BankRoll.sol";
import "fhevm/lib/TFHE.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFlip is Ownable {
    using SafeERC20 for IERC20;
    address public betTokenAddress;
    uint8[] public array;

    error ZeroWager();
    error InvalidNumBets(uint256 maxNumBets);

    bool public isInitialised;
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

    event CoinFlip_Outcome_Event(
        address indexed playerAddress,
        uint256 wager,
        uint256 payout
    );

    function COINFLIP_PLAY(uint256 wager, bool isHeads) external {
        _transferWager(wager, msg.sender);

        settleBet(msg.sender, isHeads, wager);
    }

    function settleBet(
        address playerAddress,
        bool isHeads,
        uint256 wager
    ) internal {
        uint256 payout;
        uint8 randomWord = TFHE.decrypt(TFHE.randEuint8()) % 2;

        if (randomWord == 1 && isHeads == true) {
            payout = wager * 2;
        }
        if (randomWord == 0 && isHeads == false) {
            payout += wager * 2;
        }

        emit CoinFlip_Outcome_Event(playerAddress, wager, payout);
        if (payout > 0) {
            _transferPayout(playerAddress, payout);
        }
    }
}
