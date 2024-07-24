import React, { useState } from 'react';
import './App.css';
function App() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className={clicked ? 'clicked' : ''} onClick={handleClick}>
          Axlımızı geri qaytar gülay xanım
        </p>
      </header>
    </div>
  );
}

export default App;
