# Pie Proxy

Generic proxy pattern which can be used with any smart contract.

This project uses [Buidler](https://buidler.dev) and [Ethers](https://docs.ethers.io/ethers.js/html/index.html).

## Features 

### Upgradeability

The proxy owner can update the implementation and the overrides contract

### Overrides

Allows to overwrite functions from the implementation contract.

### Pauzing

Allows the pauser address to pause the contract in case of emergency

### Conditions (TODO)

Allows to attach conditions which which halt some functionality modify implementation. Can be used for capping assets under management, capping gas price or providing reentrancy protection without modifying the implementation.

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
