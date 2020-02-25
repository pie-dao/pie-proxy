import { ethers } from "@nomiclabs/buidler";
import { Signer, Wallet } from "ethers";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import PProxyArtifact from "../artifacts/PProxy.json";
import { PProxy } from "../typechain/PProxy"

chai.use(solidity);
const { expect } = chai;

describe("PProxy", () => {
  let signers: Signer[];
  let proxy: PProxy;

  beforeEach(async () => {
    signers = await ethers.signers();
    proxy = await deployContract(<Wallet>signers[0], PProxyArtifact) as PProxy;
   
  });

  describe("Ownership", async() => {
    it("Owner should be msg.sender", async() => {
      const expected = await signers[0].getAddress();
      
      // TODO write tests here

    });

  });

});