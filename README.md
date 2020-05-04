# Pie Proxy

Generic proxy pattern which can be used with any smart contract.

This project uses [Buidler](https://buidler.dev) and [Ethers](https://docs.ethers.io/ethers.js/html/index.html).

# 🚨Warning about upgrading your contracts 🚨
You cannot change the order in which the contract state variables are declared, nor their type.
Similar to ZOS proxy
https://docs.openzeppelin.com/upgrades/2.8/writing-upgradeable#modifying-your-contracts

## Features 

### Upgradeability

The proxy owner can update the implementation and the overrides contract

### Pauzing

Allows the pauser address to pause the contract in case of emergency

## Installing dependencies

Clone this repository, then install the dependencies with `yarn`.

## Available Functionality

### Build Contracts

`yarn compile`

### Generate TypeChain Typings

`yarn build`

### Run Contract Tests

`yarn test`

### Run Coverage Report for Tests

`yarn coverage`


### Deploy to Ethereum

Modify network config in `buidler.config.ts` and add API key and private key, then run:

`npx buidler run --network rinkeby scripts/deploy.ts`

### Verify on Etherscan

Add Etherscan API key to `buidler.config.ts`, then run:

`npx buidler verify-contract --contract-name Counter --address <DEPLOYED ADDRESS>`
