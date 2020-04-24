/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";

import { PProxyStorage } from "./PProxyStorage";

export class PProxyStorageFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(): Promise<PProxyStorage> {
    return super.deploy() as Promise<PProxyStorage>;
  }
  getDeployTransaction(): UnsignedTransaction {
    return super.getDeployTransaction();
  }
  attach(address: string): PProxyStorage {
    return super.attach(address) as PProxyStorage;
  }
  connect(signer: Signer): PProxyStorageFactory {
    return super.connect(signer) as PProxyStorageFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PProxyStorage {
    return new Contract(address, _abi, signerOrProvider) as PProxyStorage;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_value",
        type: "address"
      }
    ],
    name: "addressToBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_value",
        type: "bytes32"
      }
    ],
    name: "bytes32ToAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "readAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "readBool",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "storageRead",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506102c0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806337a440e61461005c5780635ced058e1461009e57806382c947b71461010c5780639d84ae6914610164578063bb15ac8e146101d2575b600080fd5b6100886004803603602081101561007257600080fd5b8101908080359060200190929190505050610218565b6040518082815260200191505060405180910390f35b6100ca600480360360208110156100b457600080fd5b8101908080359060200190929190505050610228565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014e6004803603602081101561012257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610235565b6040518082815260200191505060405180910390f35b6101906004803603602081101561017a57600080fd5b8101908080359060200190929190505050610258565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101fe600480360360208110156101e857600080fd5b8101908080359060200190929190505050610272565b604051808215151515815260200191505060405180910390f35b6000808254905080915050919050565b60008160001c9050919050565b60008173ffffffffffffffffffffffffffffffffffffffff1660001b9050919050565b600061026b61026683610218565b610228565b9050919050565b6000600160001b61028283610218565b14905091905056fea2646970667358221220fd786a9b3d051bcb6dc2aaa35e22fd84193d2c14d329762d8d06198eafcfc9f464736f6c63430006020033";