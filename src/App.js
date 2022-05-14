import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayItems from './components/DisplayItems';

function App() {
  return (
    <div className="App">
      <DisplayItems />
    </div>
  );
}

export default App;
