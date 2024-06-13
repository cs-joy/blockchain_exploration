import logo from './logo.svg';
import './App.css';

import DataStorage from './DataStorage';
import AESComponent from './AESComponent';
//import DataEncryptSend from './DataEncryptSend';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DataStorage />
      </header>
    </div>
  );
}

export default App;
