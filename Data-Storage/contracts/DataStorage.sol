// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract DataStorage {
    string public storedData;

    function setData(string memory _data) public {
        storedData = _data;
    }

    function getData() public view returns (string memory) {
        return storedData;
    }
}