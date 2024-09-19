import { expect } from "chai";
import { ethers } from "hardhat";

import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("MyERC20", function () {
  

  async function deployMyERC20Fixture() {
    const [owner, addr1] = await ethers.getSigners();
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    const myERC20 = await MyERC20.deploy();
    return {myERC20, owner, addr1};
  };

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
        const {myERC20, owner} = await loadFixture(deployMyERC20Fixture);
      expect(await myERC20.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const {myERC20, owner} = await loadFixture(deployMyERC20Fixture);
      const ownerBalance = await myERC20.balanceOf(owner.address);
      expect(await myERC20.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the correct token name and symbol", async function () {
      const {myERC20} = await loadFixture(deployMyERC20Fixture);
      expect(await myERC20.name()).to.equal("ERC20");
      expect(await myERC20.symbol()).to.equal("ERC");
    });

    it("Should mint 1000e18 tokens to the owner", async function () {
      const {myERC20, owner} = await loadFixture(deployMyERC20Fixture);
      const ownerBalance = await myERC20.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther("1000"));
    });
  });
});