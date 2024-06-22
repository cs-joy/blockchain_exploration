import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const BlockchainContext = createContext();

const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "createData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "data",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "deleteData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "operation",
        "type": "string"
      }
    ],
    "name": "grantPermission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "idToIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "permissions",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "readData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "operation",
        "type": "string"
      }
    ],
    "name": "revokePermission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "newValue",
        "type": "string"
      }
    ],
    "name": "updateData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);

  const contractAddress = "0x599AFd2901651b2Fd1D588B01B5b3D53BA35cc48"; // Replace with deployed contract address

  useEffect(() => {
    const initializeBlockchain = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const [account] = await provider.send("eth_requestAccounts", []);
        setCurrentAccount(account);

        const signer = provider.getSigner();
        const dbContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(dbContract);
      }
    };

    initializeBlockchain();
  }, []);

  const createData = async (id, value) => {
    if (contract) {
      const tx = await contract.createData(id, value);
      await tx.wait();
    }
  };

  const readData = async (id) => {
    if (contract) {
      return await contract.readData(id);
    }
  };

  const updateData = async (id, value) => {
    if (contract) {
      const tx = await contract.updateData(id, value);
      await tx.wait();
    }
  };

  const deleteData = async (id) => {
    if (contract) {
      const tx = await contract.deleteData(id);
      await tx.wait();
    }
  };

  const grantPermission = async (user, operation) => {
    if (contract) {
      const tx = await contract.grantPermission(user, operation);
      await tx.wait();
    }
  };

  const revokePermission = async (user, operation) => {
    if (contract) {
      const tx = await contract.revokePermission(user, operation);
      await tx.wait();
    }
  };

  return (
    <BlockchainContext.Provider
      value={{ createData, readData, updateData, deleteData, grantPermission, revokePermission, currentAccount }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
