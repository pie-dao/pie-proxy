import { ethers } from "hardhat";
import { Signer, Wallet } from "ethers";
import chai from "chai";
import { PProxy, TestImplementation } from "../typechain-types";

const { expect } = chai;

const PLACE_HOLDER_ADDRESS = "0x0000000000000000000000000000000000000001";

describe("PProxy", () => {
  let signers: Signer[];
  let proxy: PProxy;
  let implementationContract: TestImplementation;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    const pproxyFactory = await ethers.getContractFactory("PProxy");
    const implementationFactory = await ethers.getContractFactory(
      "TestImplementation"
    );

    proxy = (await pproxyFactory.deploy()) as PProxy;
    implementationContract =
      (await implementationFactory.deploy()) as TestImplementation;
  });

  describe("Ownership", async () => {
    it("Owner should be msg.sender", async () => {
      const expected = await signers[0].getAddress();
      const owner = await proxy.getProxyOwner();
      expect(owner).to.eq(expected, "Owner is not deployer");
    });

    it("Calling setProxyOwner by a different address than the proxyOwner should fail", async () => {
      const newOwner = await signers[0].getAddress();
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.setProxyOwner(newOwner)).to.be.reverted;
    });

    it("Setting the proxy owner should work", async () => {
      const newOwner = await signers[0].getAddress();
      await proxy.setProxyOwner(newOwner);
      const actualNewOwner = await proxy.getProxyOwner();
      expect(actualNewOwner).to.eq(newOwner);
    });
  });

  describe("Setting the implementation", async () => {
    it("Setting the implementation contract should work", async () => {
      await proxy.setImplementation(PLACE_HOLDER_ADDRESS);
      const implementation = await proxy.getImplementation();
      expect(implementation).to.eq(PLACE_HOLDER_ADDRESS);
    });

    it("Setting the implementation contract from a non owner should fail", async () => {
      const altSignerProxy = proxy.connect(signers[1]);
      await expect(altSignerProxy.setImplementation(PLACE_HOLDER_ADDRESS)).to.be
        .reverted;
    });

    it("Can make a call when setting the implementation with setImplementationAndCall", async () => {
      const value = "TEST";
      const encodedCall = implementationContract.interface.encodeFunctionData(
        "setValue",
        [value]
      );

      await proxy.setImplementationAndCall(
        implementationContract.address,
        encodedCall
      );

      const proxiedImplementation = new ethers.Contract(
        proxy.address,
        implementationContract.interface,
        signers[0]
      ) as TestImplementation;
      const actualValue = await proxiedImplementation.getValue();
      const implementationValue = await implementationContract.getValue();
      const implementationAddress = await proxy.getImplementation();

      expect(implementationAddress).to.eq(implementationContract.address);
      expect(actualValue).to.eq(value);
      expect(implementationValue).to.eq("");
    });
  });

  describe("Delegating calls to implementation contract", async () => {
    let proxiedImplementation: TestImplementation;

    beforeEach(async () => {
      await proxy.setImplementation(implementationContract.address);

      proxiedImplementation = new ethers.Contract(
        proxy.address,
        implementationContract.interface,
        signers[0]
      ) as TestImplementation;
    });

    it("Calls should be delegated to implementation contract", async () => {
      const value = "TEST";
      await proxiedImplementation.setValue("TEST");

      const actualValue = await proxiedImplementation.getValue();
      const implementationValue = await implementationContract.getValue();

      expect(actualValue).to.eq(value, "");
      expect(implementationValue).to.eq("");
    });

    it("should work with a payable function or when sending eth", async () => {
      const value = ethers.utils.parseEther("1");
      await proxiedImplementation.isPayable({ value });

      const actualPaid = await proxiedImplementation.paid();
      const implementationPaid = await implementationContract.paid();

      expect(actualPaid).to.eq(value);
      expect(implementationPaid).to.eq(0);
    });
  });
});
