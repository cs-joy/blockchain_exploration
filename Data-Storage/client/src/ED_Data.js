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

const ED_Data = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [storedData, setStoredData] = useState('');
  const [newData, setNewData] = useState('');

  const [key, setKey] = useState(null);
  const [iv, setIv] = useState(null);
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

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

    const generateKey = async () => {
        const key = await crypto.subtle.generateKey(
          {
            name: "AES-GCM",
            length: 256,
          },
          true, // Extractable
          ["encrypt", "decrypt"]
        );
        const exportedKey = await crypto.subtle.exportKey("jwk", key);
        localStorage.setItem('encryptionKey', JSON.stringify(exportedKey));
        return key;
      };

      generateKey();
      
  }, []);



  const handleEncrypt = async () => {
    // Generate a new IV
    const ivArray = crypto.getRandomValues(new Uint8Array(12));
    setIv(ivArray);
  
    // Encode the plaintext
    const encoded = new TextEncoder().encode(plaintext);
  
    // Retrieve the key from local storage and import it
    const keyData = JSON.parse(localStorage.getItem('encryptionKey'));
    const key = await crypto.subtle.importKey(
      "jwk",
      keyData,
      {
        name: "AES-GCM",
      },
      true,
      ["encrypt", "decrypt"]
    );
  console.log("key: ", key);
    // Encrypt the plaintext
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: ivArray,
      },
      key,
      encoded
    );
    console.log(ivArray);
  
    // Convert the encrypted buffer to base64
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
    setCiphertext(encryptedBase64);
  
    // Store the IV and ciphertext in localStorage (or any other secure storage)
    localStorage.setItem('encryptedData', JSON.stringify({
      iv: Array.from(ivArray),
      ciphertext: encryptedBase64
    }));
  };
  const handleSetData = async (encryptedText) => {
    try {
      await contract.methods.setData(encryptedText).send({ from: accounts[0] });
      const updatedData = await contract.methods.getData().call();
      setStoredData(updatedData);
      setNewData(encryptedText);
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };  

  const handleDecrypt = async () => {
    // Retrieve the IV and ciphertext from localStorage
    const storedData = JSON.parse(localStorage.getItem('encryptedData'));
    const ivArray = new Uint8Array(storedData.iv);
    console.log("iv: ", iv);
    const encryptedBase64 = storedData.ciphertext;
  
    // Convert the base64 ciphertext to a buffer
    const encryptedBuffer = new Uint8Array(atob(encryptedBase64).split('').map(char => char.charCodeAt(0)));
  
    // Retrieve and import the key
    const keyData = JSON.parse(localStorage.getItem('encryptionKey'));
    const key = await crypto.subtle.importKey(
      "jwk",
      keyData,
      {
        name: "AES-GCM",
      },
      true,
      ["encrypt", "decrypt"]
    );
  
    // Decrypt the ciphertext
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivArray,
      },
      key,
      encryptedBuffer
    );
  
    // Decode the decrypted buffer to plaintext
    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    setDecryptedText(decryptedText);
  };
  

  return (
    <div>
      <h1>Data Storage</h1>
      <p>Contract Address: {contractAddress}</p>
      <p>Stored Data: {storedData}</p>

       <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            placeholder="Enter text to encrypt"
            rows="4"
            cols="50"
        ></textarea><br />
        <button onClick={handleEncrypt}>Encrypt</button><br />

        <p>{ciphertext}</p>
        <button onClick={() => handleSetData(ciphertext, iv)}>Send this encrypted data to the blockchain</button>

        <br />
        <br />
        <button onClick={handleDecrypt}>Decrypt</button>
        <p>{decryptedText}</p>

    </div>
  );
};

export default ED_Data;