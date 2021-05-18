import React, { Component } from 'react'
import styled from 'styled-components'

import { Modal, Button, Form, ModalBody} from "react-bootstrap"
import LoginForm from "./LoginForm";
import "bootstrap/dist/css/bootstrap.css"

const Image = styled.img`
    background      : ${p=>p.background};
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width};
    height          : ${p=>p.height};
    opacity         : ${p=>p.opacity};
`;

const choices = [
    { id: 1, score: "1", text: "Excellent"},
    { id: 2, score: "2", text: "Good"},
    { id: 3, score: "3", text: "Fair"},
    { id: 4, score: "4", text: "Poor"},
    { id: 5, score: "5", text: "Very Poor"},
];

class Icons extends Component 
{
    state = {
        show : false
    }

    handleShow = () => {
        this.setState( {show:true} )
    }
    
    handleClose = () => {
        this.setState( {show:false} )
    }
    constructor(props) 
    {
        super(props);
        // const [textRating, setTextRating] = useState("");
        // this.state = { textRating: "", show : false };
        this.template = props.templateID;
        console.log('template',props.templateID);
        
    }
    
  render() 
  {
    // const [show,setShow] = this.setState({show :false})
    // this.state = { show : false}
    // const handleClose = () => setShow(false)
    console.log('show',this.state.show)

    const onLoginFormSubmit = (e) => {
        e.prevenDefault();
        this.handleClose();
    }
    return (
      <>
        <div style={{display:'flex',width:'100%'}}>
            {choices.map(({ id }) => 
            (
                <>
                    <Image src={`config/${this.template}/images/icon-${id}.png`} />
                </>
            ))}
        </div>
 
        <Button style={{background:'#007bff'}} variant="primary" onClick={   this.handleShow} >Launch</Button>
         
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center" style={{width:'100%'}}>Please Select</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm onSubmit={this.onLoginFormSubmit} />
            </Modal.Body> 
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>        
      </>
    );
  }
}

export default Icons;
