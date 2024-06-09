import logo from './logo.svg';
import './App.css';

import DataStorage from './DataStorage';
import AESComponent from './AESComponent';
import DataEncryptSend from './DataEncryptSend';
import DataDecryptGet from './DataDecryptGet';
import ED_Data from './ED_Data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ED_Data />
      </header>
    </div>
  );
}

export default App;
