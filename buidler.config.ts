require("dotenv").config();

import { BuidlerConfig, usePlugin, task } from "@nomiclabs/buidler/config";
import { PProxyPausableFactory } from "./typechain/PProxyPausableFactory";
import { PProxyFactory } from "./typechain/PProxyFactory";

usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@nomiclabs/buidler-etherscan");
usePlugin("buidler-typechain");
usePlugin("solidity-coverage");

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const KOVAN_PRIVATE_KEY = process.env.KOVAN_PRIVATE_KEY || "";
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

interface ExtendedBuidlerConfig extends BuidlerConfig {
  [x:string]: any
}

const config: ExtendedBuidlerConfig = {
  defaultNetwork: "buidlerevm",
  solc: {
    version: "0.8.9"
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MAINNET_PRIVATE_KEY]
    },  
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [KOVAN_PRIVATE_KEY]
    },
    coverage: {
      url: 'http://127.0.0.1:8555' // Coverage launches its own ganache-cli client
    }
  },
  etherscan: {
    // The url for the Etherscan API you want to use.
    url: "https://api.etherscan.io/api",
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },
  typechain: {
    outDir: "typechain",
    target: "ethers"
  }
};

task("deploy-pausable-proxy", "deploys a pausable proxy contract")
  .setAction(async(taskArgs, { ethers }) => {
    const signer = (await ethers.signers())[0];
    const factory = new PProxyPausableFactory(signer);
    const proxy = await factory.deploy();

    console.log(`Deployed proxy at: ${proxy.address}`);
});

task("set-proxy-implementation", "sets the implementation contract of the proxy")
  .addParam("proxy", "address of the proxy contract")
  .addParam("implementation", "address of the implementation contract")
  .setAction(async(taskArgs, { ethers }) => {
    const signer = (await ethers.signers())[0];
    const proxy = PProxyFactory.connect(taskArgs.proxy, signer);
    const tx = await proxy.setImplementation(taskArgs.implementation);
    const receipt = await tx.wait(1);

    console.log(`Implementation set tx: ${receipt.transactionHash}`);
});

task("set-proxy-owner", "sets the proxy owner")
  .addParam("proxy", "address of the proxy contract")
  .addParam("owner", "adderss of the proxy owner")
  .setAction(async(taskArgs, { ethers }) => {
    const signer = (await ethers.signers())[0];
    const proxy = PProxyFactory.connect(taskArgs.proxy, signer);
    const tx = await proxy.setProxyOwner(taskArgs.owner);
    const receipt = await tx.wait(1);

    console.log(`Proxy owner set tx: ${receipt.transactionHash}`);
});

export default config;
