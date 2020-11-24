import {React, useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';


const Auth = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (   
    <Modal isOpen={true}>
    <ModalHeader></ModalHeader>
       <ModalBody>          
           <form > 
             <label htmlFor="email">Email:</label>    
             <input 
                 type="text" 
                 id="email" 
                 value={email} 
                 placeholder="email@email.com" 
                 onChange={(event) => {                 
                 setEmail(event.target.value);  
                 }} 
             /> 
             <label htmlFor="password">Password</label>    
             <input 
                 type="password" 
                 id="password" 
                 value={password} 
                 onChange={(event) => {
                 setPassword(event.target.value);
                 }} 
             /> 
             <Button onClick={props.authOff}>close button for now lol</Button>
             <Button type="submit">Submit User Data</Button>
           </form>
       </ModalBody>
    </Modal>
  )
}


export default Auth;