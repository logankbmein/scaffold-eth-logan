const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity, MockProvider } = require("ethereum-waffle");

const DEFAULT_ADDR = '0x0000000000000000000000000000000000000000';

use(solidity);

describe("My Dapp", function () {
  let myContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("Accounts", function () {
    it("Should deploy Accounts contract", async function () {
      const Accounts = await ethers.getContractFactory("Accounts");

      accountsContract = await Accounts.deploy();
    });
    describe("basic accounts", function () {
      it("Should return the default value for an unset address", async function () {
        const [newAddress] = new MockProvider().getWallets()
        const newBalance = 50;
        expect(await accountsContract.getAccountBalance(newAddress.address)).to.equal(0);
      })

      it("Should be able to add an account given an address", async function () {
        const [newWallet] = new MockProvider().getWallets()
        const newAddress = newWallet.address;
        const newBalance = 50;

        await accountsContract.setAccountBalance(newAddress, newBalance);
        expect(await accountsContract.getAccountBalance(newAddress)).to.equal(newBalance);
      })

      it("Should be able to clear an existing account balance", async function () {
        const [newWallet] = new MockProvider().getWallets()
        const newAddress = newWallet.address;
        const newBalance = 50;

        await accountsContract.setAccountBalance(newAddress, newBalance);
        expect(await accountsContract.getAccountBalance(newAddress)).to.equal(newBalance);
        await accountsContract.clearAccountBalance(newAddress);
        expect(await accountsContract.getAccountBalance(newAddress)).to.equal(0);
      })
    })
    describe("wallets", function () {
      it("Should return default values for a non-existent wallet", async function () {
        const [newWallet] = new MockProvider().getWallets()
        const newAddress = newWallet.address;
        const [addr, walletName, bal] = await accountsContract.getWallet(newAddress);
        expect(addr).to.equal(DEFAULT_ADDR);
        expect(walletName).to.equal('');
        expect(bal).to.equal(0);
      });

      it("Should allow you to update a wallet", async function () {
        const [newWallet] = new MockProvider().getWallets()
        const newAddress = newWallet.address;
        await accountsContract.setWallet(newAddress, "logan", 45);
        const [addr, walletName, bal] = await accountsContract.getWallet(newAddress);
        expect(addr).to.equal(newAddress);
        expect(walletName).to.equal("logan");
        expect(bal).to.equal(45);
      })

      it("Should allow you to delete a wallet", async function () {
        const [newWallet] = new MockProvider().getWallets()
        const newAddress = newWallet.address;
        await accountsContract.setWallet(newAddress, "logan", 45);
        let [addr, walletName, bal] = await accountsContract.getWallet(newAddress);
        expect(addr).to.equal(newAddress);
        expect(walletName).to.equal("logan");
        expect(bal).to.equal(45);
        await accountsContract.deleteWallet(newAddress);
        [addr, walletName, bal] = await accountsContract.getWallet(newAddress);
        expect(addr).to.equal(DEFAULT_ADDR);
        expect(walletName).to.equal('');
        expect(bal).to.equal(0);
      })
    })
  })

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const YourContract = await ethers.getContractFactory("YourContract");

      myContract = await YourContract.deploy();
    });

    describe("setPurpose()", function () {
      it("Should be able to set a new purpose", async function () {
        const newPurpose = "Test Purpose";

        await myContract.setPurpose(newPurpose);
        expect(await myContract.purpose()).to.equal(newPurpose);
      });

      // Uncomment the event and emit lines in YourContract.sol to make this test pass

      /*it("Should emit a SetPurpose event ", async function () {
        const [owner] = await ethers.getSigners();

        const newPurpose = "Another Test Purpose";

        expect(await myContract.setPurpose(newPurpose)).to.
          emit(myContract, "SetPurpose").
            withArgs(owner.address, newPurpose);
      });*/
    });
  });
});
