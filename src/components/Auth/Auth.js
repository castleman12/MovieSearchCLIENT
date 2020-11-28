import {React, useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import '../Auth/Auth.css';

const Auth = (props) => {
   
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
     
  const title = () => {
    return login ? 'Login' : 'Signup';    
  }

  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login) 
    setEmail("");
    setPassword("");
  }

  
  const HandleSubmit = (event) => {
    event.preventDefault();
        
    const url = login ? 'http://localhost:6969/user/login' : 'http://localhost:6969/user/register';  
    const bodyObj = login ? {user: {
      email: email,
      password: password
    }} : {user: {
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
    .then(data => console.log(data.message))
    .then(data => props.updateToken(data.sessionToken))
    .then(data => setMessage(data.message))
    .catch(error => setMessage(error.name))

  }
  
  return (   
    <Modal isOpen={true}>
    <ModalHeader> {title()} 

    < Button className="Close" onClick={props.authOff} >X</Button> </ModalHeader> 
        <ModalBody>   
            <Form onSubmit={HandleSubmit}>    

              <Label htmlFor="email">Email:</Label>  
              <br/>  
              <Input 
                  type="email" 
                  id="email" 
                  value={email} 
                  placeholder="email@email.com" 
                  onChange={(event) => {                 
                  setEmail(event.target.value);  
                  }} 
              /> 
              <br/>
              <Label htmlFor="password">Password:</Label> 
              <br/>   
              <Input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }} 
              /> 
              { login ? <Button type="submit">Submit User Data</Button> : password.length < 5 ? <p>Password must be minimum 5 characters in length</p> : <Button type="submit">Submit User Data</Button> }
              <br/>
              <br/>
              <Button onClick={loginToggle}>Login/Signup Toggle</Button>
              <br/>
              <p>{message}</p>
            </Form>
        </ModalBody>
    </Modal>
  )
}

export default Auth;

