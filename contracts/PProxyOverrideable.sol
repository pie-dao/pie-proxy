pragma solidity ^0.6.2;

import "./PProxy.sol";
import "./interfaces/IPProxyOverrides.sol";

contract PProxyOverrideable is PProxy {

    bytes32 constant OVERRIDES_SLOT = keccak256(abi.encodePacked("OVERRIDES_SLOT"));

    function getOverrides() public view returns (address) {
        return readAddress(OVERRIDES_SLOT);
    }

    function setOverrides(address _newOverrides) public onlyProxyOwner {
        setAddress(OVERRIDES_SLOT, _newOverrides);
    }

    function internalFallback() internal virtual override {
        IPProxyOverrides overrides = IPProxyOverrides(readAddress(OVERRIDES_SLOT));
        // If overrrides function implements function override the called function.
        if(overrides.doesOverride(msg.sig)) {
            address contractAddr = address(overrides);
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
        } else {
            super.internalFallback();
        }
    }
}