// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract DecentralizedDatabase {
    address public owner;
    mapping(string => string) private data;

    // Define roles
    mapping(address => bool) private canWrite; // Permissions for setting data
    mapping(address => bool) private canDelete; // Permissions for deleting data

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyWriter() {
        require(canWrite[msg.sender] || msg.sender == owner, "Not authorized to write data");
        _;
    }

    modifier onlyDeleter() {
        require(canDelete[msg.sender] || msg.sender == owner, "Not authorized to delete data");
        _;
    }

    event DataCreated(string key, string value);
    event DataUpdated(string key, string value);
    event DataDeleted(string key);
    event WriterAdded(address indexed account);
    event WriterRemoved(address indexed account);
    event DeleterAdded(address indexed account);
    event DeleterRemoved(address indexed account);

    constructor() {
        owner = msg.sender;
    }

    // Owner functions to set permissions
    function addWriter(address account) external onlyOwner {
        canWrite[account] = true;
        emit WriterAdded(account);
    }

    function removeWriter(address account) external onlyOwner {
        canWrite[account] = false;
        emit WriterRemoved(account);
    }

    function addDeleter(address account) external onlyOwner {
        canDelete[account] = true;
        emit DeleterAdded(account);
    }

    function removeDeleter(address account) external onlyOwner {
        canDelete[account] = false;
        emit DeleterRemoved(account);
    }

    // Create or Update data
    function setData(string calldata key, string calldata value) external onlyWriter {
        require(bytes(key).length > 0, "Key cannot be empty");
        require(bytes(value).length > 0, "Value cannot be empty");

        bool isUpdate = bytes(data[key]).length > 0;

        data[key] = value;

        if (isUpdate) {
            emit DataUpdated(key, value);
        } else {
            emit DataCreated(key, value);
        }
    }

    // Read data
    function getData(string calldata key) external view returns (string memory) {
        require(bytes(data[key]).length > 0, "Key does not exist");
        return data[key];
    }

    // Delete data
    function deleteData(string calldata key) external onlyDeleter {
        require(bytes(data[key]).length > 0, "Key does not exist");

        delete data[key];
        emit DataDeleted(key);
    }

    // Check if key exists
    function keyExists(string calldata key) external view returns (bool) {
        return bytes(data[key]).length > 0;
    }
}
