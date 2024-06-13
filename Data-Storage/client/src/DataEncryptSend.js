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

const DataEncryptSend = () => {
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

            // Generate AES-GCM key on component mount
            const generateKey = async () => {
                const generatedKey = await crypto.subtle.generateKey(
                    {
                        name: "AES-GCM",
                        length: 256,
                    },
                    true,
                    ["encrypt", "decrypt"]
                );
                setKey(generatedKey);
            };
            generateKey();
  }, []);

  const handleEncrypt = async () => {
    const ivArray = crypto.getRandomValues(new Uint8Array(12));
    setIv(ivArray);

    const encoded = new TextEncoder().encode(plaintext);
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: ivArray,
        },
        key,
        encoded
    );

    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
    setCiphertext(encryptedBase64);
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

    const handleDecrypt = async (cipher, iv_code) => {
        try {
            const ciphertextArray = Uint8Array.from(atob(cipher), c => c.charCodeAt(0));
            console.log(ciphertextArray);
            const decryptedBuffer = await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv_code,
                },
                key,
                ciphertextArray
            );
            console.log(decryptedBuffer);

            const decryptedText = new TextDecoder().decode(decryptedBuffer);
            setDecryptedText(decryptedText);
            console.log(decryptedText);
        } catch (e) {
            console.error("Decryption failed", e);
        }
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
        <button onClick={() => handleSetData(ciphertext)}>Send this encrypted data to the blockchain</button>

        <br />
        <br />
        <button onClick={() => handleDecrypt(storedData, iv)}>Decrypt</button>

    </div>
  );
};

export default DataEncryptSend;