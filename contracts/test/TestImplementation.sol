pragma solidity ^0.8.0;


contract TestImplementation {

    string public value;
    string public value1;

    function setValue1(string calldata _value) external {
        value1 = _value;
    }

    function getValue1() public view returns(string memory) {
        return value1;
    }

    function setValue(string calldata _value) external {
        value = _value;
    }

    function getValue() public view returns(string memory) {
        return value;
    }

}