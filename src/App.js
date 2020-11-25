import {Switch, Route} from 'react'
import Home from './components/Pages/Home'
import './App.css';
import {useState} from 'react';


function App() {
  const [search, setSearch] = useState('')

  return (
    <div className="App">

    <Home/>

    </div>
  );
}

export default App;
