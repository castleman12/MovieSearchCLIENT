import {useState} from 'react';
import {Jumbotron, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap'
import Auth from '../Auth/Auth'
import Footer from '../Footer';
import {Link} from 'react-router-dom';


const Home = (props) => {

  const [authActive, setAuthActive] = useState(false);


  const authOn = () =>{
    setAuthActive(true);
  }

  const authOff = () => {
    setAuthActive(false);
  }


        return (
          <div>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className="display-3">MegaMovies</h1>
                <Form>
                <InputGroup>
                    <Input type="text"  name="movieSearch" placeholder="Search for a movie" onChange={(e) => {props.setSearch(e.target.value)}}/>
                    <InputGroupAddon addonType="append" color="secondary">
                      <Link to="/searchresults"><Button>Search!</Button></Link>
                </InputGroupAddon>
             </InputGroup>
                </Form>
                <br />
            <Button onClick={() => {authOn()}}>Login or Sign Up!</Button>
            {authActive ? <Auth  updateToken={props.updateToken} authOff={authOff} /> : null}
            <Link to="/watchlist"><Button>Watchlist</Button></Link>
              </Container> 
              <br/>
              <Footer/>
            </Jumbotron>
          </div>
        );
      };


export default Home;