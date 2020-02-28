pragma solidity ^0.6.2;

import "./PProxyOverrideable.sol";
import "./PProxyPausable.sol";

contract PProxyOverrideablePausable is PProxyOverrideable, PProxyPausable {
    function internalFallback() internal override(PProxyOverrideable, PProxyPausable) notPaused {
        PProxyOverrideable.internalFallback();
    }
}