/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";

import { PProxy } from "./PProxy";

export class PProxyFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(): Promise<PProxy> {
    return super.deploy() as Promise<PProxy>;
  }
  getDeployTransaction(): UnsignedTransaction {
    return super.getDeployTransaction();
  }
  attach(address: string): PProxy {
    return super.attach(address) as PProxy;
  }
  connect(signer: Signer): PProxyFactory {
    return super.connect(signer) as PProxyFactory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): PProxy {
    return new Contract(address, _abi, signerOrProvider) as PProxy;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    stateMutability: "payable",
    type: "fallback"
  },
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
        name: "_value",
        type: "bytes32"
      }
    ],
    name: "bytes32ToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "getImplementation",
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
    inputs: [],
    name: "getProxyOwner",
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
    name: "readString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImplementation",
        type: "address"
      }
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address"
      }
    ],
    name: "setProxyOwner",
    outputs: [],
    stateMutability: "nonpayable",
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
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_value",
        type: "string"
      }
    ],
    name: "stringToBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "result",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061006760405160200180807f4f574e45525f534c4f5400000000000000000000000000000000000000000000815250600a019050604051602081830303815290604052805190602001203361006c60201b60201c565b6100be565b61008a8261007f8361008e60201b60201c565b6100b160201b60201c565b5050565b60008173ffffffffffffffffffffffffffffffffffffffff1660001b9050919050565b6000829050818155505050565b610c85806100cd6000396000f3fe6080604052600436106100ab5760003560e01c80639d84ae69116100645780639d84ae69146103a4578063aaf10f421461041f578063bb15ac8e14610476578063caaee91c146104c9578063cfb519281461051a578063d784d426146105f6576100ac565b80631ab7710d146100b65780631bc289601461010d57806337a440e6146101c15780635ced058e1461021057806382c947b71461028b5780639201de55146102f0576100ac565b5b6100b4610647565b005b3480156100c257600080fd5b506100cb6106c1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561011957600080fd5b506101466004803603602081101561013057600080fd5b8101908080359060200190929190505050610717565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561018657808201518184015260208101905061016b565b50505050905090810190601f1680156101b35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101cd57600080fd5b506101fa600480360360208110156101e457600080fd5b8101908080359060200190929190505050610731565b6040518082815260200191505060405180910390f35b34801561021c57600080fd5b506102496004803603602081101561023357600080fd5b8101908080359060200190929190505050610741565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561029757600080fd5b506102da600480360360208110156102ae57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061074e565b6040518082815260200191505060405180910390f35b3480156102fc57600080fd5b506103296004803603602081101561031357600080fd5b8101908080359060200190929190505050610771565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036957808201518184015260208101905061034e565b50505050905090810190601f1680156103965780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103b057600080fd5b506103dd600480360360208110156103c757600080fd5b8101908080359060200190929190505050610904565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561042b57600080fd5b5061043461091e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561048257600080fd5b506104af6004803603602081101561049957600080fd5b8101908080359060200190929190505050610974565b604051808215151515815260200191505060405180910390f35b3480156104d557600080fd5b50610518600480360360208110156104ec57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061098c565b005b34801561052657600080fd5b506105e06004803603602081101561053d57600080fd5b810190808035906020019064010000000081111561055a57600080fd5b82018360208201111561056c57600080fd5b8035906020019184600183028401116401000000008311171561058e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610ab1565b6040518082815260200191505060405180910390f35b34801561060257600080fd5b506106456004803603602081101561061957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610adc565b005b600061069860405160200180807f494d504c454d454e544154494f4e5f534c4f5400000000000000000000000000815250601301905060405160208183030381529060405280519060200120610904565b905060405136600082376000803683855af43d806000843e81600081146106bd578184f35b8184fd5b600061071260405160200180807f4f574e45525f534c4f5400000000000000000000000000000000000000000000815250600a01905060405160208183030381529060405280519060200120610904565b905090565b606061072a61072583610731565b610771565b9050919050565b6000808254905080915050919050565b60008160001c9050919050565b60008173ffffffffffffffffffffffffffffffffffffffff1660001b9050919050565b60608060206040519080825280601f01601f1916602001820160405280156107a85781602001600182028038833980820191505090505b509050600080905060008090505b60208110156108525760008160080260020a8660001c0260001b9050600060f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614610844578084848151811061080c57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535082806001019350505b5080806001019150506107b6565b506060816040519080825280601f01601f1916602001820160405280156108885781602001600182028038833980820191505090505b50905060008090505b828110156108f8578381815181106108a557fe5b602001015160f81c60f81b8282815181106108bc57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610891565b50809350505050919050565b600061091761091283610731565b610741565b9050919050565b600061096f60405160200180807f494d504c454d454e544154494f4e5f534c4f5400000000000000000000000000815250601301905060405160208183030381529060405280519060200120610904565b905090565b6000600160001b61098483610731565b149050919050565b6109db60405160200180807f4f574e45525f534c4f5400000000000000000000000000000000000000000000815250600a01905060405160208183030381529060405280519060200120610904565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a5e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180610c25602b913960400191505060405180910390fd5b610aae60405160200180807f4f574e45525f534c4f5400000000000000000000000000000000000000000000815250600a0190506040516020818303038152906040528051906020012082610c01565b50565b60006060829050600081511415610ace576000801b915050610ad7565b60208301519150505b919050565b610b2b60405160200180807f4f574e45525f534c4f5400000000000000000000000000000000000000000000815250600a01905060405160208183030381529060405280519060200120610904565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180610c25602b913960400191505060405180910390fd5b610bfe60405160200180807f494d504c454d454e544154494f4e5f534c4f540000000000000000000000000081525060130190506040516020818303038152906040528051906020012082610c01565b50565b610c1382610c0e8361074e565b610c17565b5050565b600082905081815550505056fe5050726f78792e6f6e6c7950726f78794f776e65723a206d73672073656e646572206e6f74206f776e6572a2646970667358221220f68b5492ce1ade021f77aa74fe1a8c1e1f28c7d4eb1d9bde095954ec11779c2764736f6c63430006020033";
