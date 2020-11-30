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
import './Navbar.css'
import logo from '../assets/MainLogo.png'

const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return(
    <div>
      <Navbar id="navbar"  dark expand="md" className="sticky-top">
        <NavbarBrand href="/" id="logo"><img src={logo} /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Search</NavLink>
            </NavItem>
            <NavItem>
            {localStorage.getItem('token') ?  <NavLink href="/watchlist">Watchlist</NavLink> : null}
            </NavItem>
            <NavItem>
            {localStorage.getItem('token') ?  <Button onClick={props.clickLogout} id="logout">Logout</Button> : null}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="showContent">
        <Switch>
          <Route exact path="/"><Home updateToken={props.updateToken} setSearch={props.setSearch} search={props.search} token={props.token}/></Route>
          <Route exact path="/home"><Home updateToken={props.updateToken} setSearch={props.setSearch} search={props.search} Link={Link} token={props.token}/></Route>
          <Route exact path="/searchresults"><SearchResults search={props.search} token={props.token}/></Route>
          <Route exact path="/watchlist"><Watchlist token={props.token}/> </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Header;