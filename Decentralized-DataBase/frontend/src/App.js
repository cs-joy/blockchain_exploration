import React, { useState } from 'react';
import { useBlockchain } from './contexts/BlockchainContext';

function App() {
  const { createData, readData, updateData, deleteData, grantPermission, revokePermission, currentAccount } = useBlockchain();
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [readValue, setReadValue] = useState('');
  const [user, setUser] = useState('');
  const [operation, setOperation] = useState('');

  const handleCreate = async () => {
    await createData(id, value);
  };

  const handleRead = async () => {
    const result = await readData(id);
    setReadValue(result);
  };

  const handleUpdate = async () => {
    await updateData(id, value);
  };

  const handleDelete = async () => {
    await deleteData(id);
  };

  const handleGrantPermission = async () => {
    await grantPermission(user, operation);
  };

  const handleRevokePermission = async () => {
    await revokePermission(user, operation);
  };

  return (
    <div>
      <h1>Decentralized Database</h1>
      <div>
        <h2>Create Data</h2>
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h2>Read Data</h2>
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={handleRead}>Read</button>
        <p>{readValue}</p>
      </div>
      <div>
        <h2>Update Data</h2>
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="New Value" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
        <h2>Delete Data</h2>
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <h2>Grant Permission</h2>
        <input placeholder="User Address" value={user} onChange={(e) => setUser(e.target.value)} />
        <input placeholder="Operation" value={operation} onChange={(e) => setOperation(e.target.value)} />
        <button onClick={handleGrantPermission}>Grant Permission</button>
      </div>
      <div>
        <h2>Revoke Permission</h2>
        <input placeholder="User Address" value={user} onChange={(e) => setUser(e.target.value)} />
        <input placeholder="Operation" value={operation} onChange={(e) => setOperation(e.target.value)} />
        <button onClick={handleRevokePermission}>Revoke Permission</button>
      </div>
      <div>
        <h2>Current Account</h2>
        <p>{currentAccount}</p>
      </div>
    </div>
  );
}

export default App;
