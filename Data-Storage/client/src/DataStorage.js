import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const contractABI = [
    {
      "inputs": [],
      "name": "getData",
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
          "internalType": "string",
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "setData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "storedData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];

const contractAddress = '0x7157Dd02EAeADc9B5694CC2520F8bb8FD8151BA7';

const DataStorage = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [storedData, setStoredData] = useState('');
  const [newData, setNewData] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.requestAccounts();
          setAccounts(accounts);

          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);

          const data = await contractInstance.methods.getData().call();
          setStoredData(data);
        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      } else {
        console.error('Please install MetaMask to use this application.');
      }
    };

    initWeb3();
  }, []);

  const handleSetData = async () => {
    try {
      await contract.methods.setData(newData).send({ from: accounts[0] });
      const updatedData = await contract.methods.getData().call();
      setStoredData(updatedData);
      setNewData('');
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  return (
    <div>
      <h1>Data Storage</h1>
      <p>Contract Address: {contractAddress}</p>
      <p>Stored Data: {storedData}</p>
      <input
        type="text"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
        placeholder="Enter new data"
      />
      <button onClick={handleSetData}>Set Data</button>
    </div>
  );
};

export default DataStorage;