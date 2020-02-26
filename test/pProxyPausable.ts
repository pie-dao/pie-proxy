import { ethers } from "@nomiclabs/buidler";
import { Signer, Wallet } from "ethers";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import PProxyArtifact from "../artifacts/PProxyPausable.json";
import { PProxyPausable } from "../typechain/PProxyPausable"
import TestImplementationArtifact from "../artifacts/TestImplementation.json";
import { TestImplementation } from "../typechain/TestImplementation";
import { TestImplementationFactory } from "../typechain/TestImplementationFactory"; 


chai.use(solidity);
const { expect } = chai;

const PLACE_HOLDER_ADDRESS = "0x0000000000000000000000000000000000000001";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("PProxy", () => {
  let signers: Signer[];
  let proxy: PProxyPausable;
  let implementationContract: TestImplementation;

  beforeEach(async () => {
    signers = await ethers.signers();
    proxy = await deployContract(<Wallet>signers[0], PProxyArtifact) as PProxyPausable;
    implementationContract = await deployContract(<Wallet>signers[0], TestImplementationArtifact) as TestImplementation;    
  });

  describe("Pauzer", async() => {
    it("Pauzer should be deployer of the contract", async() => {
      const expectedPauzer = await signers[0].getAddress();
      const pauzer = await proxy.getPauzer();
      expect(pauzer).to.eq(expectedPauzer);
    });

    it("Setting the proxy pauzer should work", async() => {
      const newPauzer = PLACE_HOLDER_ADDRESS;
      await proxy.setPauzer(newPauzer);
      const pauzer = await proxy.getPauzer();
      expect(pauzer).to.eq(newPauzer);
    });

    it("Setting the pauzer from a non proxy owner address should fail", async() => {
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.setPauzer(PLACE_HOLDER_ADDRESS)).be.reverted;
    });

    it("Renouncing pauzer should work", async() => {
      await proxy.renouncePauzer();
      const pauzer = await proxy.getPauzer();
      expect(pauzer).to.eq(ZERO_ADDRESS);
    });

    it("Renouncing pauzer from a non pauzer address should fail", async() => {
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.renouncePauzer()).to.be.reverted;
    });
  });

  describe("Pauzing", async() => {
    it("Pausing the contract should work", async() => {
      await proxy.setPaused(true);
      const paused = await proxy.getPaused();
      expect(paused).to.be.true;
    });

    it("Pausing the contract from a non pauzer address should fail", async() => {
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.setPaused(true)).to.be.reverted;
    });

    it("Calling a function when not paused should work", async() => {
      const proxiedImplementation = await setAndGetImplementation();
      await proxiedImplementation.setValue(PLACE_HOLDER_ADDRESS);
      const value = await proxiedImplementation.getValue();
      expect(value).to.eq(PLACE_HOLDER_ADDRESS);
    });

    it("Calling a function when paused should fail", async() => {
      await proxy.setPaused(true);
      const proxiedImplementation = await setAndGetImplementation();
      await expect(proxiedImplementation.setValue("TEST")).to.be.reverted;
    });

    it("Calling a function after unpausing should work", async() => {
      await proxy.setPaused(true);
      await proxy.setPaused(false);
      const proxiedImplementation = await setAndGetImplementation();
      await proxiedImplementation.setValue(PLACE_HOLDER_ADDRESS);
      const value = await proxiedImplementation.getValue();
      expect(value).to.eq(PLACE_HOLDER_ADDRESS);
    });
  });

  async function setAndGetImplementation() {
    await proxy.setImplementation(implementationContract.address);
    return (new TestImplementationFactory(signers[0])).attach(proxy.address);
  }

});
