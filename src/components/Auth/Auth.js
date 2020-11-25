import {React, useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
//import './Auth.css';

const Auth = (props) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const title = () => {
    return login ? 'Login' : 'Signup';         
  }
  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login) 
    setEmail("");
    setPassword("");
  }
  return (   
    <Modal isOpen={true}>
    <ModalHeader><Button onClick={props.authOff}>X</Button> {title()} </ModalHeader>
        <ModalBody>      
            <Form> 
              <Label htmlFor="email">Email:</Label>  
              <br/>  
              <Input 
                  type="text" 
                  id="email" 
                  value={email} 
                  placeholder="email@email.com" 
                  onChange={(event) => {                 
                  setEmail(event.target.value);  
                  }} 
              /> 
              <br/>
              <Label htmlFor="password">Password</Label> 
              <br/>   
              <Input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }} 
              /> 
              <br/>
              <Button type="submit">Submit User Data</Button>
              <br/>
              <Button onClick={loginToggle}>Login/Signup Toggle</Button>
            </Form>
        </ModalBody>
    </Modal>
  )
}

export default Auth;