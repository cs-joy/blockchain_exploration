// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedDatabase {
    address public owner;
    mapping(address => mapping(string => bool)) public permissions;

    struct Data {
        uint id;
        string value;
    }

    Data[] public data;
    mapping(uint => uint) public idToIndex;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier hasPermission(string memory operation) {
        require(msg.sender == owner || permissions[msg.sender][operation], "No permission");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function grantPermission(address user, string memory operation) public onlyOwner {
        permissions[user][operation] = true;
    }

    function revokePermission(address user, string memory operation) public onlyOwner {
        permissions[user][operation] = false;
    }

    function createData(uint id, string memory value) public hasPermission("create") {
        require(idToIndex[id] == 0, "Data with this id already exists");
        data.push(Data(id, value));
        idToIndex[id] = data.length;
    }

    function readData(uint id) public view returns (string memory) {
        uint index = idToIndex[id];
        require(index != 0, "Data does not exist");
        return data[index - 1].value;
    }

    function updateData(uint id, string memory newValue) public hasPermission("update") {
        uint index = idToIndex[id];
        require(index != 0, "Data does not exist");
        data[index - 1].value = newValue;
    }

    function deleteData(uint id) public hasPermission("delete") {
        uint index = idToIndex[id];
        require(index != 0, "Data does not exist");

        // Move the last element to the place of the one to delete
        data[index - 1] = data[data.length - 1];
        idToIndex[data[index - 1].id] = index;

        // Remove the last element
        data.pop();
        delete idToIndex[id];
    }
}
