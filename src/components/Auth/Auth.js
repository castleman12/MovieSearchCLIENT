import {React, useState, useEffect} from 'react';
import {Button, Form, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import '../Auth/Auth.css';

const Auth = (props) => {
   
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);
     
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
        
    const url = login ? 'http://localhost:4000/user/login' : 'http://localhost:4000/user/register';  
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
    .then(data => login ?
      //console.log('data.sessionToken:',data.sessionToken) : undefined)
      //console.log('error:',data.error) : undefined)
      //props.updateToken(data.sessionToken) : undefined) 
      console.log("data:",data) : undefined) 
    .then(data => setMessage(data.message))
    .catch(error => login ?
      setMessage(error.name) : setMessage(error.name))
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
              <br/>
              { password.length < 5 ? <p>Password must be minimum 5 characters in length</p> : null }
              <p>{message}</p>
            </Form>
        </ModalBody>
    </Modal>
  )
}

export default Auth;

