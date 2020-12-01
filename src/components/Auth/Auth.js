import {React, useState} from 'react';
import {Button, Form, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import '../Auth/Auth.css';
import APIURL from '../../helpers/environment'

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
    setMessage("");
  }
  
  const HandleSubmit = (event) => {
    event.preventDefault();
        
    const url = login ? `${APIURL}/user/login` : `${APIURL}/user/register`;  
    const bodyObj = login ? {user: {
      email: email,
      password: password
    }} : {user: {
      email: email,
      password: password
    }}
        
    async function postLogin() {
       
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(bodyObj)
      })
       
      response = await response.json()
      console.log("token:",response.sessionToken)
      props.updateToken(response.sessionToken)
            
      if (response.sessionToken !== undefined) {
          setMessage(response.message)  
          window.location.reload(true)            
      } else if (login) { 
          setMessage(response.error) 
      } else {
          console.log("error:",response.error) 
          setMessage(response.error.errors[0].message)  
          //setMessage("Signup failed")
          
      }
    } 
  
    postLogin()
  }   
    

  return (   
    <Modal isOpen={true}>
    <ModalHeader id="header"> {title()} 
    < Button id="close" onClick={props.authOff}>X</Button> </ModalHeader> 
        <ModalBody id="modal" >   
            <Form onSubmit={HandleSubmit}>    
              <Label htmlFor="email">Email:</Label>  
              <br/>  
              <Input required
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
              <Input required
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }} 
              /> 

              <div className="buttons">
              <p>{message}</p> 
              { login ? <Button id="Submit" type="submit">Login!</Button> : password.length < 5 ? <p>Password must be minimum 5 characters in length</p> : <Button type="submit" id="Submit">Sign Up!</Button> }
              <br/>
              <hr/>
              { login ? <p>Don't have an account?</p> : <p>Already have an account?</p>}
              <Button id="Login" onClick={loginToggle}>  { login ? "Switch to Sign Up" : "Switch to Login"}  </Button>
             </div>
            </Form>
        </ModalBody>
    </Modal>
  )
   
}

export default Auth;
