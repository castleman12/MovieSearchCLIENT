import {Switch, Route} from 'react'
import Home from './components/Pages/Home'
import Header from './components/Navbar'
import './App.css';
import {useState,useEffect} from 'react';
import SearchResults from './components/Pages/SearchResults';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {
  const [search, setSearch] = useState('')
  const [token, setToken] = useState('')
  
  useEffect(() => {
    if (localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    }
  }, [])
 
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setToken('');
  }
   
  return (
    <div className="App">

      <Router>

        <Header clickLogout={clearToken} updateToken={updateToken} token={token} setSearch={setSearch} search={search}/>

      </Router>

    </div>
  );
}

export default App;
