/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";

import { TestSideEffectsRequire } from "./TestSideEffectsRequire";

export class TestSideEffectsRequireFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(): Promise<TestSideEffectsRequire> {
    return super.deploy() as Promise<TestSideEffectsRequire>;
  }
  getDeployTransaction(): UnsignedTransaction {
    return super.getDeployTransaction();
  }
  attach(address: string): TestSideEffectsRequire {
    return super.attach(address) as TestSideEffectsRequire;
  }
  connect(signer: Signer): TestSideEffectsRequireFactory {
    return super.connect(signer) as TestSideEffectsRequireFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestSideEffectsRequire {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestSideEffectsRequire;
  }
}

const _abi = [
  {
    inputs: [],
    name: "sideEffectAfter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "sideEffectBefore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060fe8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80631fd025451460375780632063cad014603f575b600080fd5b603d6047565b005b604560bc565b005b600060ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f5369646520656666656374206661696c6564000000000000000000000000000081525060200191505060405180910390fd5b565b600060c657600080fd5b56fea26469706673582212208dccf09e240e779b98bd7dd0e762ef19a62a9e1cc7cf6c0c1ef27d09b51f8e2f64736f6c63430006020033";