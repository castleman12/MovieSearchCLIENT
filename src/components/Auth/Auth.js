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
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = login ? 'http://localhost:6969/user/login' : 'http://localhost:6969/user/register';  
    const bodyObj = login ? {
      user:{
      email: email,
      password: password
    }
    } : {
      user: {
      email: email,
      password: password
    }}
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(bodyObj)
    })
    .then(res => res.json())
    .then(data => console.log(data.sessionToken))
    .then(data => login ? props.updateToken(data) : undefined)
  }
  
  return (   
    <Modal isOpen={true}>
    <ModalHeader> {title()} 
    < Button onClick={props.authOff} >X</Button> </ModalHeader> 
        <ModalBody>      
            <Form onSubmit={handleSubmit}> 
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