pragma solidity ^0.6.2;


contract TestImplementation {

    string public value;

    function setValue(string calldata _value) external {
        value = _value;
    }

    function getValue() public view returns(string memory) {
        return value;
    }

}