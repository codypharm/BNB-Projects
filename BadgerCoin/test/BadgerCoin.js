const { expect } = require("chai");

//parent test block
describe("BadgerCoin", () => {
  let badgerContract, owner, other;

  //assign needed variables before running tests
  before(async () => {
    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    const badgerCoin = await BadgerCoin.deploy("BadgerCoin", "BC");
    badgerContract = await badgerCoin.deployed();
    [owner, other] = await ethers.getSigners();
  });

  //test initial states
  describe("Initial states", () => {
    //checking for total supply
    it("Should return 1000000 as total supply", async () => {
      const supply = await badgerContract.totalSupply();
      //compare values after converting to ether
      expect(ethers.utils.formatEther(supply)).to.equal("1000000.0");
    });

    //checking for number of decimals
    it("Should return 18 as number of decimals", async () => {
      const decimal = await badgerContract.decimals();
      expect(decimal.toString()).to.equal("18");
    });

    //checking for owners babalnce
    it("Should return right balance", async () => {
      const balance = await badgerContract.balanceOf(owner.address);
      expect(ethers.utils.formatEther(balance)).to.equal("1000000.0");
    });
  });

  //Testing transactions
  describe("Trasactions", () => {
    //suuccessfull transfer
    it("Should trasnfer 10 Ether", async () => {
      //transfer 10 ethers
      const txn1 = await badgerContract.transfer(
        other.address,
        ethers.utils.parseUnits("10", "ether")
      );
      //get balance
      const ownerBalance = await badgerContract.balanceOf(owner.address);
      const otherBalance = await badgerContract.balanceOf(other.address);
      //decrease by 10 ether
      expect(ethers.utils.formatEther(ownerBalance)).to.equal("999990.0");
      //increase by 10 ether
      expect(ethers.utils.formatEther(otherBalance)).to.equal("10.0");
    });

    //Reverted transfer
    it("Should revert", async () => {
      await expect(() =>
        badgerContract
          .connect(other)
          .transfer(owner.address, ethers.utils.parseUnits("20", "ether"))
          .to.be.revertedWith("ERC20: transfer amount exceeds balance")
      );
    });
  });
});
