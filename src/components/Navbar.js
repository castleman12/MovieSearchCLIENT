import {useState} from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Home from './Pages/Home';
import SearchResults from './Pages/SearchResults';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import Watchlist from './Pages/Watchlist'

const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return(
    <div>
      <Navbar color="dark" dark expand="md" className="sticky-top">
        <NavbarBrand href="/">MegaMovies</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/watchlist">Watchlist</NavLink>
            </NavItem>
            <NavItem>
              {/* <Button>Login/out</Button> */}
              <Button onClick={props.clickLogout}>Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="showContent">
        <Switch>
          <Route exact path="/"><Home updateToken={props.updateToken} setSearch={props.setSearch} search={props.search} token={props.token}/></Route>
          <Route exact path="/home"><Home updateToken={props.updateToken} setSearch={props.setSearch} search={props.search} Link={Link} token={props.token}/></Route>
          <Route exact path="/searchresults"><SearchResults search={props.search} token={props.token}/></Route>
          <Route exact path="/watchlist"><Watchlist/> </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Header;