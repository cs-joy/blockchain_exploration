// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CRUD_APP {
    struct Data {
        string content;
        bool exists;
    }

    address public owner;
    mapping(bytes32 => Data) private database;
    mapping(address => bool) public hasCreatePermission;
    mapping(address => bool) public hasReadPermission;

    event DataCreated(bytes32 indexed key, string content);
    event DataUpdated(bytes32 indexed key, string content);
    event DataDeleted(bytes32 indexed key);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier canCreate() {
        require(msg.sender == owner || hasCreatePermission[msg.sender], "No create permission");
        _;
    }

    modifier canRead() {
        require(msg.sender == owner || hasReadPermission[msg.sender], "No read permission");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function create(bytes32 key, string memory content) public canCreate {
        require(!database[key].exists, "Key already exists");
        database[key] = Data(content, true);
        emit DataCreated(key, content);
    }

    function read(bytes32 key) public view canRead returns (string memory) {
        require(database[key].exists, "Key does not exist");
        return database[key].content;
    }

    function update(bytes32 key, string memory content) public onlyOwner {
        require(database[key].exists, "Key does not exist");
        database[key].content = content;
        emit DataUpdated(key, content);
    }

    function remove(bytes32 key) public onlyOwner {
        require(database[key].exists, "Key does not exist");
        delete database[key];
        emit DataDeleted(key);
    }

    function grantCreatePermission(address user) public onlyOwner {
        hasCreatePermission[user] = true;
    }

    function grantReadPermission(address user) public onlyOwner {
        hasReadPermission[user] = true;
    }

    function revokeCreatePermission(address user) public onlyOwner {
        hasCreatePermission[user] = false;
    }

    function revokeReadPermission(address user) public onlyOwner {
        hasReadPermission[user] = false;
    }
}