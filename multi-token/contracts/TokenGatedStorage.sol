// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenGatedStorage is Ownable {
    IERC1155 public accessToken;
    uint256 public requiredTokenId;
    uint256 public queryFeeAmount;

    // Simple key-value storage
    mapping(bytes32 => bytes) private _storage;

    // Track user balances for query fees (in tokens, not ETH)
    mapping(address => uint256) public userBalances;

    event DataStored(bytes32 indexed key, address indexed by, uint256 timestamp);
    event DataRetrieved(bytes32 indexed key, address indexed by, uint256 timestamp);
    event QueryFeePaid(address indexed by, uint256 amount);
    event FeeWithdrawn(address indexed to, uint256 amount);

    constructor(
        address _accessToken,
        uint256 _requiredTokenId,
        uint256 _queryFeeAmount
    ) Ownable(msg.sender) {  // <-- Use msg.sender as owner
        accessToken = IERC1155(_accessToken);
        requiredTokenId = _requiredTokenId;
        queryFeeAmount = _queryFeeAmount;
    }

    function setRequiredToken(uint256 _tokenId) external onlyOwner {
        requiredTokenId = _tokenId;
    }

    function setQueryFee(uint256 _amount) external onlyOwner {
        queryFeeAmount = _amount;
    }

    function store(bytes32 key, bytes memory value) external {
        require(accessToken.balanceOf(msg.sender, requiredTokenId) > 0, "No access token");
        _storage[key] = value;
        emit DataStored(key, msg.sender, block.timestamp);
    }

    function retrieve(bytes32 key) external returns (bytes memory) {
        require(accessToken.balanceOf(msg.sender, requiredTokenId) > 0, "No access token");

        // Check and deduct query fee
        if (queryFeeAmount > 0) {
            require(userBalances[msg.sender] >= queryFeeAmount, "Insufficient balance");
            userBalances[msg.sender] -= queryFeeAmount;
        }
        emit DataRetrieved(key, msg.sender, block.timestamp);
        return _storage[key];
    }

    function payQueryFees(uint256 amount) external {
        require(accessToken.balanceOf(msg.sender, requiredTokenId) >= amount, "Insufficient tokens");

        // Transfer ERC1155 tokens from user to this contract
        accessToken.safeTransferFrom(
            msg.sender,
            address(this),
            requiredTokenId,
            amount,
            ""
        );

        userBalances[msg.sender] += amount;
        emit QueryFeePaid(msg.sender, amount);
    }

    function withdrawFees(address to, uint256 amount) external onlyOwner {
        require(accessToken.balanceOf(address(this), requiredTokenId) >= amount, "Insufficient contract balance");

        // Transfer ERC1155 tokens from this contract to the owner
        accessToken.safeTransferFrom(
            address(this),
            to,
            requiredTokenId,
            amount,
            ""
        );

        emit FeeWithdrawn(to, amount);
    }

    function getBalance() external view returns (uint256) {
        return userBalances[msg.sender];
    }
}