import {useState} from 'react';
import SearchResults from './SearchResults'
import {Jumbotron, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap'
const Home = (props) => {


    

        return (
          <div>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className="display-3">MegaMovies</h1>
                <Form>
                <InputGroup>
                    <Input type="text"  name="movieSearch" placeholder="Search for a movie" />
                    <InputGroupAddon addonType="append" color="secondary">
                      <Button type="submit">Search!</Button>
                </InputGroupAddon>
             </InputGroup>
                </Form>
                <br />
            <Button>Login</Button>
            <Button>Sign Up</Button>
            <Button>Watchlist</Button>
              </Container>
            </Jumbotron>
          </div>
        );
      };


export default Home;