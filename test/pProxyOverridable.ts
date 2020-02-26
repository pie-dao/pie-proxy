import { ethers } from "@nomiclabs/buidler";
import { Signer, Wallet } from "ethers";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import PProxyOverrideableArtifact from "../artifacts/PProxyOverridable.json";
import { PProxyOverridable } from "../typechain/PProxyOverridable"
import TestImplementationArtifact from "../artifacts/TestImplementation.json";
import { TestImplementation } from "../typechain/TestImplementation";
import TestOverridesArtifact from "../artifacts/TestOverrides.json";
import { TestOverrides } from "../typechain/TestOverrides";
import { TestImplementationFactory } from "../typechain/TestImplementationFactory";
import { TestOverridesFactory } from "../typechain/TestOverridesFactory";


chai.use(solidity);
const { expect } = chai;

const PLACE_HOLDER_ADDRESS = "0x0000000000000000000000000000000000000001";

describe("PProxyOverrideable", () => {
  let signers: Signer[];
  let proxy: PProxyOverridable;
  let implementationContract: TestImplementation;
  let overridesContract: TestOverrides;

  beforeEach(async() => {
    signers = await ethers.signers();
    proxy = await deployContract(<Wallet>signers[0], PProxyOverrideableArtifact) as PProxyOverridable;
    implementationContract = await deployContract(<Wallet>signers[0], TestImplementationArtifact) as TestImplementation;
    overridesContract = await deployContract(<Wallet>signers[0], TestOverridesArtifact) as TestOverrides;
  });

  describe("Setting Overrides", async() => {
    it("Setting the override contract should work", async() => {
        await proxy.setOverrides(PLACE_HOLDER_ADDRESS);
        const overrides = await proxy.getOverrides();
        expect(overrides).to.eq(PLACE_HOLDER_ADDRESS);
    });
    it("Setting the overrride from a non proxy owner should fail", async() => {
        const altSignerProxy = proxy.connect(signers[1]);
        await expect(altSignerProxy.setOverrides(PLACE_HOLDER_ADDRESS)).to.be.reverted;
    });
  });

  describe("Overriding functions", async() => {
    it("Calling non overwritten functions should call the original function", async() => { 
        await proxy.setOverrides(overridesContract.address);
        const proxiedImplementation = await setAndGetImplementation();
        const value = "TEST"
        await proxiedImplementation.setValue(value);
        const actualValue = await proxiedImplementation.getValue();
        expect(actualValue).to.eq(value);
    })
    it("Calling overwritten functions should work", async() => {
        await proxy.setOverrides(overridesContract.address);
        const proxiedImplementation = await setAndGetImplementation();
        
        const value = "TEST";
        await proxiedImplementation.setValue1(value);

        const actualValue = await proxiedImplementation.getValue1();
        expect(actualValue).to.eq("OVERWRITTEN");
    })
    it("Adding a new function should work", async() => {
        const proxiedImplementation = await setAndGetOverrides();
        await setAndGetImplementation();

        const name = await proxiedImplementation.name();
        expect(name).to.eq("TOKEN_NAME");
    })
  });

  async function setAndGetImplementation() {
    await proxy.setImplementation(implementationContract.address);
    return (new TestImplementationFactory(signers[0])).attach(proxy.address);
  }

  async function setAndGetOverrides() {
    await proxy.setOverrides(overridesContract.address);
    return (new TestOverridesFactory(signers[0]).attach(proxy.address));
  }

});