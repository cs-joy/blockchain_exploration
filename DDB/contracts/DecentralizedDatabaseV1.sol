// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract DecentralizedDatabaseV1 {
    address public owner;
    mapping(string => string) private data;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    event DataUpdated(string key, string value);

    constructor() {
        owner = msg.sender;
    }

    function setData(string calldata key, string calldata value) external onlyOwner {
        data[key] = value;
        emit DataUpdated(key, value);
    }

    function getData(string calldata key) external view returns (string memory) {
        return data[key];
    }

    function deleteData(string calldata key) external onlyOwner {
        delete data[key];
        emit DataUpdated(key, "");
    }
}
