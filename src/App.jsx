import React from 'react';
import './App.css';
import FinanceCalculator from './FinanceCalculator';

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <header className="App-header">
          <FinanceCalculator />
        </header>
      </div>
    </React.StrictMode>
  );
}

export default App;
