// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bankroll is Ownable {
    address public token;
    mapping(address => bool) public gameContracts;

    constructor(address _token) Ownable(msg.sender) {
        token = _token;
    }

    function initialize(address[] memory _gameContracts) public onlyOwner {
        require(
            IERC20(token).transferFrom(
                msg.sender,
                address(this),
                100000000 * 10**18
            ),
            "Initial funding failed"
        );
        for (uint256 i = 0; i < _gameContracts.length; i++) {
            gameContracts[_gameContracts[i]] = true;
            IERC20(token).approve(_gameContracts[i], type(uint256).max);
        }
    }

    function transferToBankRoll(address _user, uint256 _amount)
        external
        onlyAllowedContracts
    {
        IERC20(token).transferFrom(_user, address(this), _amount);
    }

    function transferFromBankRoll(address _user, uint256 _amount)
        external
        onlyAllowedContracts
    {
        IERC20(token).transferFrom(address(this), _user, _amount);
    }

    modifier onlyAllowedContracts() {
        if (!gameContracts[msg.sender]) {
            revert();
        }
        _;
    }
}
