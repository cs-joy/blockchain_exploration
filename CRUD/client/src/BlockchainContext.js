import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DecentralizedDatabase from './artifacts/contracts/CRUD_APP.sol/CRUD_APP.json';

const contractAddress = '0x2D024540B74887F16956F7c12810Fb0a13886950';

function BlockchainContext() {
  const [contract, setContract] = useState(null);
  const [key, setKey] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');

  const [userAddress, setUserAddress] = useState('');
  const [permissionType, setPermissionType] = useState('create');

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer.getAddress());
        const contract = new ethers.Contract(contractAddress, DecentralizedDatabase.abi, signer);
        setContract(contract);
      }
    };
    init();
  }, []);

  const create = async () => {
    try {
      const tx = await contract.create(ethers.utils.id(key), content);
      await tx.wait();
      setResult('Data created successfully');
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  const read = async () => {
    try {
      const data = await contract.read(ethers.utils.id(key));
      setResult('Data: ' + data);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  const update = async () => {
    try {
      const tx = await contract.update(ethers.utils.id(key), content);
      await tx.wait();
      setResult('Data updated successfully');
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  const remove = async () => {
    try {
      const tx = await contract.remove(ethers.utils.id(key));
      await tx.wait();
      setResult('Data deleted successfully');
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  const setPermission = async () => {
    try {
      let tx;
      if (permissionType === 'create') {
        tx = await contract.grantCreatePermission(userAddress);
      } else if (permissionType === 'read') {
        tx = await contract.grantReadPermission(userAddress);
      }
      await tx.wait();
      setResult(`${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)} permission granted to ${userAddress}`);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  const revokePermission = async () => {
    try {
      let tx;
      if (permissionType === 'create') {
        tx = await contract.revokeCreatePermission(userAddress);
      } else if (permissionType === 'read') {
        tx = await contract.revokeReadPermission(userAddress);
      }
      await tx.wait();
      setResult(`${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)} permission revoked from ${userAddress}`);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Decentralized Database</h1>
      <div>
        <h2>CRUD Operations</h2>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={create}>Create</button>
        <button onClick={read}>Read</button>
        <button onClick={update}>Update</button>
        <button onClick={remove}>Delete</button>
      </div>
      <div>
        <h2>Set Permissions</h2>
        <input
          type="text"
          placeholder="User Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <select value={permissionType} onChange={(e) => setPermissionType(e.target.value)}>
          <option value="create">Create</option>
          <option value="read">Read</option>
        </select>
        <button onClick={setPermission}>Grant Permission</button>
        <button onClick={revokePermission}>Revoke Permission</button>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default BlockchainContext;