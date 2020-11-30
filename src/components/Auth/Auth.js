import {React, useState} from 'react';
import {Button, Form, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
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
    setMessage("");
  }
  
  const HandleSubmit = (event) => {
    event.preventDefault();
        
    const url = login ? 'http://localhost:3000/user/login' : 'http://localhost:3000/user/register';  
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
    <ModalHeader> {title()} 
    < Button className="Close" onClick={props.authOff} >X</Button> </ModalHeader> 
        <ModalBody>   
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
              <Label htmlFor="password">Password</Label> 
              <br/>   
              <Input required
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }} 
              /> 
              {/* Commented out line below, could not center "Submit" button, ternary was forcing it on the left side */}
              {/* { login ? <Button type="submit">Submit User Data</Button> : password.length < 5 ? <p>Password must be minimum 5 characters in length</p> : <Button type="submit">Submit User Data</Button> } */}
              {password.length < 5 ? <p>Password must be minimum 5 characters in length</p> : null}
              <Button className="Submit" type="submit">Submit User Data</Button>
              <br/>
              <Button className="Login" onClick={loginToggle}>Login/Signup Toggle</Button>
              {/* <br/>               */}

              <p>{message}</p> 
              <br/>
            </Form>
        </ModalBody>
    </Modal>
  )
   
}

export default Auth;
