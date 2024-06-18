// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { SafeERC20, IERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFlip is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public bettingToken;

    struct CoinFlipGame {
        uint256 wager;
        uint64 blockNumber;
        uint32 numBets;
        bool isHeads;
    }

    mapping(address => CoinFlipGame) public coinFlipGames;

    event CoinFlip_Play_Event(
        address indexed playerAddress,
        uint256 wager,
        bool isHeads,
        uint32 numBets
    );

    event CoinFlip_Outcome_Event(
        address indexed playerAddress,
        uint256 wager,
        uint256 payout,
        uint8[] coinOutcomes,
        uint256[] payouts,
        uint32 numGames
    );

    event CoinFlip_Refund_Event(
        address indexed player,
        uint256 wager
    );

    error WagerAboveLimit(uint256 wager, uint256 maxWager);
    error InvalidNumBets(uint256 maxNumBets);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        bettingToken = IERC20(_tokenAddress);
    }

    /**
     * @dev Function to get the current state of a player's game
     * @param player Address of the player to get the state for
     * @return CoinFlipGame Current game state of the player
     */
    function CoinFlip_GetState(address player) external view returns (CoinFlipGame memory) {
        return coinFlipGames[player];
    }

    /**
     * @dev Function to play Coin Flip, takes the user's wager, saves bet parameters and requests random numbers
     * @param wager Wager amount in tokens
     * @param numBets Number of bets to make
     * @param isHeads Player's bet on which side the coin will land (true for heads, false for tails)
     */
    function CoinFlip_Play(
        uint256 wager,
        bool isHeads,
        uint32 numBets
    ) external nonReentrant {
        address msgSender = msg.sender;
        require(numBets > 0, "Invalid number of bets");
        require(numBets <= 10, "Exceeded maximum number of bets per transaction");

        uint256 totalWager = wager * numBets;
        require(bettingToken.balanceOf(msgSender) >= totalWager, "Insufficient balance");
        require(bettingToken.allowance(msgSender, address(this)) >= totalWager, "Insufficient allowance");

        bettingToken.safeTransferFrom(msgSender, address(this), totalWager);

        coinFlipGames[msgSender] = CoinFlipGame(
            wager,
            uint64(block.number),
            numBets,
            isHeads
        );

        emit CoinFlip_Play_Event(
            msgSender,
            wager,
            isHeads,
            numBets
        );

        uint8[] memory randomNumbers = generateRandomNumbers(numBets);
        settleBets(msgSender, randomNumbers);
    }

    /**
     * @dev Internal function to generate random numbers using block.number and block.timestamp
     * @param numBets Number of random numbers to generate
     * @return Array of random numbers
     */
    function generateRandomNumbers(uint32 numBets) internal view returns (uint8[] memory) {
        uint8[] memory randomNumbers = new uint8[](numBets);
        for (uint32 i = 0; i < numBets; i++) {
            randomNumbers[i] = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, i))) % 2);
        }
        return randomNumbers;
    }

    /**
     * @dev Function to settle bets based on random numbers
     * @param player Address of the player
     * @param randomNumbers Array of random numbers used to determine outcomes
     */
    function settleBets(address player, uint8[] memory randomNumbers) internal {
        CoinFlipGame storage game = coinFlipGames[player];
        require(game.numBets > 0, "No active game");

        uint256 payout = 0;
        uint256[] memory payouts = new uint256[](game.numBets);
        uint8[] memory coinOutcomes = new uint8[](game.numBets);

        for (uint32 i = 0; i < game.numBets; i++) {
            coinOutcomes[i] = randomNumbers[i];

            if ((coinOutcomes[i] == 1 && game.isHeads) || (coinOutcomes[i] == 0 && !game.isHeads)) {
                payout += game.wager * 3 / 2; // Payout 1.5 times the wager
                payouts[i] = game.wager * 3 / 2;
            }
        }

        emit CoinFlip_Outcome_Event(
            player,
            game.wager,
            payout,
            coinOutcomes,
            payouts,
            game.numBets
        );

        if (payout > 0) {
            bettingToken.safeTransfer(player, payout);
        }
    }

    /**
     * @dev Function to refund the user's tokens if they decide to cancel their bet
     */
    function CoinFlip_Refund() external nonReentrant {
        address msgSender = msg.sender;
        CoinFlipGame storage game = coinFlipGames[msgSender];

        require(game.numBets > 0, "No active game");

        uint256 totalWager = game.wager * game.numBets;
        bettingToken.safeTransfer(msgSender, totalWager);

        delete coinFlipGames[msgSender];

        emit CoinFlip_Refund_Event(msgSender, totalWager);
    }

}
