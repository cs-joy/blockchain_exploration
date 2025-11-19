// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract SecureTransfer is ERC165 { 
    IERC1155 public tokenContract; 
    address public owner;
    
    // Transfer restrictions
    mapping(address => bool) public restrictedAccounts;
    mapping(uint256 => bool) public restrictedTokenIds;
    event TransferRestrictionSet(address indexed account, bool restricted);
    event TokenTransferRestrictionSet(uint256 indexed tokenId, bool restricted);


    constructor(address _tokenContract) {
        tokenContract = IERC1155(_tokenContract);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function safeTransfer(address from, address to, uint256 tokenId, uint256 amount, bytes memory data ) public {
        require(!restrictedAccounts[from], "Sender restricted");
        require(!restrictedAccounts[to], "Recipient restricted");
        require(!restrictedTokenIds[tokenId], "Token transfers restricted");
        tokenContract.safeTransferFrom(from, to, tokenId, amount, data);
    }

    function batchSafeTransfer(address from, address to, uint256[] memory tokenIds, uint256[] memory amounts, bytes memory data) public {
        require(!restrictedAccounts[from], "Sender restricted");
        require(!restrictedAccounts[to], "Recipient restricted");
        for (uint i = 0; i < tokenIds.length; i++) {
            require(!restrictedTokenIds[tokenIds[i]], "Token transfers restricted");
        }
        tokenContract.safeBatchTransferFrom(from, to, tokenIds, amounts, data);
    }

    function setAccountRestriction(address account, bool restricted) public onlyOwner {
        restrictedAccounts[account] = restricted;
        emit TransferRestrictionSet(account, restricted);
    }

    function setTokenTransferRestriction(uint256 tokenId, bool restricted) public onlyOwner {
        restrictedTokenIds[tokenId] = restricted;
        emit TokenTransferRestrictionSet(tokenId, restricted);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC1155).interfaceId || super.supportsInterface(interfaceId);
    }
}