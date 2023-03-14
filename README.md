# Pie Proxy

Generic proxy pattern which can be used with any smart contract.

This project uses [Buidler](https://buidler.dev) and [Ethers](https://docs.ethers.io/ethers.js/html/index.html).

# 🚨Reserved Storage Slots 🚨

Using these slots in the implementation by accident would be an issue.
```
bytes32 constant IMPLEMENTATION_SLOT = keccak256(abi.encodePacked("IMPLEMENTATION_SLOT"));
bytes32 constant OWNER_SLOT = keccak256(abi.encodePacked("OWNER_SLOT"));
bytes32 constant PAUSED_SLOT = keccak256(abi.encodePacked("PAUSED_SLOT")); (DEPRECATED)
bytes32 constant PAUZER_SLOT = keccak256(abi.encodePacked("PAUZER_SLOT")); (DEPRECATED)
```

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


### Interacting with the proxy

#### Changing the owner

The proxy owner is able to set the address of the implementation contract.
To change the proxy owner you can call this function from the current proxyOwner:

```
    function setProxyOwner(address _newOwner) onlyProxyOwner public;
```

### Updating the implementation

To change the implementation contract you can call this function from the proxyOwner:

```
    function setImplementation(address _newImplementation) onlyProxyOwner public;
```

### Considerations when upgrading implementations

When using a diamond standard contract often its not needed to upgrade the diamond but the upgrade can be carried out through upgrading the diamond facets.

When upgrading a "normal" contract you have to make sure to only append to the storage vars to not corrupt storage. Changing the inheritance can corrupt your storage.