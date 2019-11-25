import { ethers } from "@nomiclabs/buidler";
import { deployContract, solidity } from "ethereum-waffle";
import chai from "chai";

import { defaultWallets } from "../src/utils/wallet-utils";

import CounterArtifact from "../build/artefacts/Counter.json";
import { Counter } from "../build/typechain/Counter";

chai.use(solidity);
const { expect } = chai;

describe("Testing counter contract", () => {
  const [ root, other ] = defaultWallets(ethers.provider);
  let counter: Counter;

  describe("When deploying counter contract", async () => {
    before("deploy contract", async () => {
      counter = await deployContract(root, CounterArtifact) as Counter;
    });

    it("should deploy to a proper address", async () => {
      expect(counter.address).to.be.properAddress;
    });

    it("should have correct initial state", async () => {
      expect(await counter.getCount()).to.be.equal(0);
    });
  });

  describe("With counter contract deployed", async () => {
    beforeEach(async () => {
      counter = await deployContract(root, CounterArtifact) as Counter;
    });

    describe("when testing `countUp()`", () => {
      it("should emit the `CountedTo` event", async () => {
        await expect(counter.countUp()).to.emit(counter, "CountedTo").withArgs(1);
      });

      it("should increment counter", async () => {
        await counter.connect(other).countUp();
        expect(await counter.getCount()).to.be.equal(1);
      });
    });

    describe("when testing `countDown()`", () => {
      beforeEach(async () => {
        await counter.countUp();
      });

      it("should emit the `CountedTo` event", async () => {
        await expect(counter.countDown()).to.emit(counter, "CountedTo").withArgs(0);
      });

      it("should increment counter", async () => {
        await counter.countDown();
        expect(await counter.getCount()).to.be.equal(0);
      });
    });
  });

});
