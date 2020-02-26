pragma solidity ^0.6.2;

contract TestOverrides {

    function doesOverride(bytes4 _selector) public view returns (bool) {
        if(
            _selector == this.name.selector ||
            _selector == this.symbol.selector
        ) {
            return true;
        }

        return false;
    }

    function name() public view returns (string memory) {
        return "TOKEN_NAME";
    }

    function symbol() public view returns (string memory) {
        return "SYMBOL";
    }

}