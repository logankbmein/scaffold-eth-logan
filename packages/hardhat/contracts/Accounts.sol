pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract Accounts {

  struct Wallet {
    address addr;
    string name;
    uint balance;
  }

  mapping (address => uint) accounts;
  mapping (address => Wallet) wallets;

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

  function getWallet(address _addr) public view returns (address addr, string memory name, uint bal) {
    Wallet storage wallet = wallets[_addr];
    return (wallet.addr, wallet.name, wallet.balance);
  }

  modifier validateAddress(address _addr) { 
    require(_addr != address(0), "Not a valid address!");
    _;
  }

  function setWallet(address _addr, string memory _name, uint _balance) public validateAddress(_addr) {
    Wallet storage wallet = wallets[_addr];
    wallet.addr = _addr;
    wallet.name = _name;
    wallet.balance = _balance;
  }

  function deleteWallet(address _addr) public {
    delete wallets[_addr];
  }

}