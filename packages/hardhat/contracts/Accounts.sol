pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract Accounts {

  mapping (address => uint) public accounts;

  function setAccountBalance(address _addr, uint _bal) public {
    accounts[_addr] = _bal;
  }

  // get balance for an address
  function getAccountBalance(address _addr) public view returns (uint) {
    return accounts[_addr];
  }

  function clearAccountBalance(address _addr) public {
    delete accounts[_addr];
  }

}