# Pie Proxy

Generic proxy pattern which can be used with any smart contract.

This project uses [Hardhat](https://hardhat.org/) and [Ethers](https://docs.ethers.io/ethers.js/html/index.html).

# 🚨Reserved Storage Slots 🚨

Using these slots in the implementation by accident would be an issue.

```
bytes32 constant IMPLEMENTATION_SLOT = keccak256(abi.encodePacked("IMPLEMENTATION_SLOT"));
bytes32 constant OWNER_SLOT = keccak256(abi.encodePacked("OWNER_SLOT"));
bytes32 constant PAUSED_SLOT = keccak256(abi.encodePacked("PAUSED_SLOT")); (DEPRECATED)
bytes32 constant PAUZER_SLOT = keccak256(abi.encodePacked("PAUZER_SLOT")); (DEPRECATED)
```

## Features

### Upgradeabilitys

The proxy owner can update the implementation and the overrides contract

### Pauzing

Allows the pauser address to pause the contract in case of emergency

## Installing dependencies

Clone this repository, then install the dependencies with `npm i`.

## Available Functionality

### Build Contracts

`npx hardhat compile`

### Generate TypeChain Typings

`npx hardhat build`

### Run Contract Tests

`npx hardhat test`

### Run Coverage Report for Tests

`npx hardhat coverage`

## Interacting with the proxy

### Changing the owner

The proxy owner is able to set the address of the implementation contract.
To change the proxy owner you can call this function from the current proxyOwner:

```js
    function setProxyOwner(address _newOwner) onlyProxyOwner public;
```

### Updating the implementation

To change the implementation contract you can call this function from the proxyOwner:

```js
    function setImplementation(address _newImplementation) onlyProxyOwner public;
```

### Updating the implementation and initializing

You can create a new implementation contract and initialize it in one transaction by calling this function from the proxyOwner:

```js
    function setImplementationAndCall(address _newImplementation, bytes calldata _data) payable onlyProxyOwner public;
```

This can typically be used with initializers to prevent situations where an attacker can insert a call to the intializer after the proxy has been deployed.
By calling setImplementationAndCall the proxy owner can ensure that the initializer is called in the same transaction as the implementation is set.

### Considerations when upgrading implementations

When using a diamond standard contract often its not needed to upgrade the diamond but the upgrade can be carried out through upgrading the diamond facets.

When upgrading a "normal" contract you have to make sure to only append to the storage vars to not corrupt storage. Changing the inheritance can corrupt your storage.
