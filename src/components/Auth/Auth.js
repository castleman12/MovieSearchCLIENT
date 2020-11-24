import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

return (   
    <Modal isOpen={true}>
    <ModalHeader>{title()}</ModalHeader>
       <ModalBody>          
           <form onSubmit={handleSubmit}> 
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
                 //placeholder="password" 
                 onChange={(event) => {
                 //console.log(event) 
                 setPassword(event.target.value);
                 }} 
             /> 
             <button onClick={loginToggle}>Login/Signup Toggle</button>
             <button type="submit">Submit User Data</button>
           </form>  
       </ModalBody>
    </Modal>
  )