import {Button, Form, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const MoreInfo = (props) => {


  return (   
    <Modal isOpen={true}>
    <ModalHeader id="header"> <h3>movie info </h3>
    < Button id="close" onClick={props.infoOff}>X</Button> </ModalHeader> 
        <ModalBody id="modal" >   
          <div>
            infostuff
            <br/>
            {props.movieId}
          </div>
        </ModalBody>
    </Modal>
  )

}

export default MoreInfo;