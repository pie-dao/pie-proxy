pragma solidity ^0.6.2;

interface IPProxyOverrides {
    function doesOverride(bytes4 _selector) external view returns (bool);
}