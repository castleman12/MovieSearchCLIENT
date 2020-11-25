import {Switch, Route} from 'react'
import Home from './components/Pages/Home'
import Header from './components/Navbar'
import './App.css';
import {useState} from 'react';
import SearchResults from './components/Pages/SearchResults';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {
  const [search, setSearch] = useState('')
  const [token, setToken] = useState('')

  const updateToken = (newToken) => {
    setToken(newToken);
  }

  return (
    <div className="App">

      <Router>
        <Header updateToken={updateToken} setSearch={setSearch} search={search}/>
      </Router>
      {/* <Home setSearch={setSearch} search={search}/>
      <SearchResults search={search}/> */}
    </div>
  );
}

export default App;
