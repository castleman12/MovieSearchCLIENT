import {useState} from 'react';
import {Jumbotron, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap'
import Auth from '../Auth/Auth'
import Footer from '../Footer';
import {Link} from 'react-router-dom';
import './Home.css'
import logo from './MegaMovies@2x.png'


const Home = (props) => {

  const [authActive, setAuthActive] = useState(false);


  const authOn = () =>{
    setAuthActive(true);
  }

  const authOff = () => {
    setAuthActive(false);
  }


        return (
          <div id="jumbo">
            <Jumbotron id="jumbotron" fluid >
              <Container fluid>
                
                <img class="display-3 logo" id="logo2" src={logo} />
                <Form>
                <InputGroup  className="w-25 col-centered">
                    <Input  type="text" name="movieSearch"  placeholder="Search for a movie" onChange={(e) => {props.setSearch(e.target.value)}} id="searchBar" />
                    <InputGroupAddon addonType="append" color="secondary">
                      <Link to="/searchresults"><Button id="search">Search!</Button></Link>
                </InputGroupAddon>
             </InputGroup>
                </Form>
                <br />
             <div id="buttons">
        {localStorage.getItem('token') ?<Button onClick={props.clickLogout} id="logout2">Logout</Button>  : <Button id="button3" onClick={() => {authOn()}}>Login or Sign Up!</Button>} 
            {authActive ? <Auth  updateToken={props.updateToken} authOff={authOff} /> : null}
            {localStorage.getItem('token') ? <Link to="/watchlist"><Button id="button2">Watchlist</Button></Link> : null}
     </div>
              </Container> 
              <br/>
              
              
            </Jumbotron>
          </div>
        );
      };


export default Home;