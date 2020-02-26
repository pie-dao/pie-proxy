import { ethers } from "@nomiclabs/buidler";
import { Signer, Wallet } from "ethers";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import PProxyArtifact from "../artifacts/PProxy.json";
import { PProxy } from "../typechain/PProxy"
import TestImplementationArtifact from "../artifacts/TestImplementation.json";
import { TestImplementation } from "../typechain/TestImplementation";
import { TestImplementationFactory } from "../typechain/TestImplementationFactory"; 


chai.use(solidity);
const { expect } = chai;

const PLACE_HOLDER_ADDRESS = "0x0000000000000000000000000000000000000001";

describe("PProxy", () => {
  let signers: Signer[];
  let proxy: PProxy;
  let implementationContract: TestImplementation;

  beforeEach(async() => {
    signers = await ethers.signers();
    proxy = await deployContract(<Wallet>signers[0], PProxyArtifact) as PProxy;
    implementationContract = await deployContract(<Wallet>signers[0], TestImplementationArtifact) as TestImplementation;    
  });

  describe("Ownership", async() => {
    it("Owner should be msg.sender", async() => {
      const expected = await signers[0].getAddress();
      const owner = await proxy.getProxyOwner();
      expect(owner).to.eq(expected, "Owner is not deployer");
    });

    it("Calling setProxyOwner by a different address than the proxyOwner should fail", async() => {
      const newOwner = await signers[0].getAddress();
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.setProxyOwner(newOwner)).to.be.reverted;
    });

    it("Setting the proxy owner should work", async() => {
      const newOwner = await signers[0].getAddress();
      await proxy.setProxyOwner(newOwner);
      const actualNewOwner = await proxy.getProxyOwner();
      expect(actualNewOwner).to.eq(newOwner);
    });
  });

  describe("Setting the implementation", async() => {
    it("Setting the implementation contract should work", async() => {
      await proxy.setImplementation(PLACE_HOLDER_ADDRESS);
      const implementation = await proxy.getImplementation();
      expect(implementation).to.eq(PLACE_HOLDER_ADDRESS);
    })

    it("Setting the implementation contract from a non owner should fail", async() => {
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.setImplementation(PLACE_HOLDER_ADDRESS)).to.be.reverted;
    });

  });

  describe("Delegating calls to implementation contract", async() => {
    it("Calls should be delegated to implementation contract", async() => {
      const value = "TEST";
      await proxy.setImplementation(implementationContract.address);
      const proxiedImplementation = (new TestImplementationFactory(signers[0])).attach(proxy.address);
      await proxiedImplementation.setValue("TEST");
      const actualValue = await proxiedImplementation.getValue();
      expect(actualValue).to.eq(value, "");

      // Implementation storage should not be changed
      const implementationValue = await implementationContract.getValue();
      expect(implementationValue).to.eq("");
    });
  })

});