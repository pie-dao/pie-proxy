pragma solidity ^0.6.2;

import "./PProxyStorage.sol";

contract PProxy is PProxyStorage {

    bytes32 constant IMPLEMENTATION_SLOT = keccak256(abi.encodePacked("IMPLEMENTATION_SLOT"));
    bytes32 constant OWNER_SLOT = keccak256(abi.encodePacked("OWNER_SLOT"));
    // constant bytes32 IMPLEMENTATION_SLOT = keccak256(abi.encodePacked("IMPLEMENTATION_SLOT"));

    constructor () public {
        setAddress(OWNER_SLOT, msg.sender);
    }

    function getProxyOwner() public view returns (address) {
       return readAddress(OWNER_SLOT);
    }

    fallback () external payable {
        address contractAddr = readAddress(IMPLEMENTATION_SLOT);
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), contractAddr, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

}