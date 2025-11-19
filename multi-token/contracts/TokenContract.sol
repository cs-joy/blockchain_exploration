// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenContract is ERC1155, Ownable {
    uint256 private _tokenIdCounter;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}
    
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri); 
    }

    function createNewToken(uint256 amount, string memory tokenURI,bytes memory data) public onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _mint(msg.sender, newTokenId, amount, data);
        _setURI(tokenURI);
        
        return newTokenId;
    }
    function mint(address to, uint256 tokenId, uint256 amount, bytes memory data) public onlyOwner {
        _mint(to, tokenId, amount, data);
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

