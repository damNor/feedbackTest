import React, { Component, createRef } from 'react'
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
    { id: "1", score: "1", text: "Excellent"},
    { id: "2", score: "2", text: "Good"},
    { id: "3", score: "3", text: "Fair"},
    { id: "4", score: "4", text: "Poor"},
    { id: "5", score: "5", text: "Very Poor"},
];

class Icons extends Component 
{
    // state = {
    //     // show : false,
    //     isActive : 'default',
    //     imageID:''
    // }

    constructor(props) 
    {
        super(props);
        this.template = props.templateID;
        this.section  = props.sectionID;
        this.imageID  = props.imageID;
        // this.iconNumber = props.iconNumber;
        // this.openIcon = props.openIcon;

        // this.isActive = { isIconActive : false}

        console.log('props',props);

        this.state = {isIconActive:false}
        this.handleClick = this.handleClick.bind(this)// don't forget
    }

    handleClick() {
        this.setState({
            isIconActive: !this.state.isIconActive,
        })
        this.props.openIcon(this.props.iconNumber, this.props.sectionID)
    }
    
    render() 
    {
        console.log('isActive',this.state.isIconActive);
        return (
            <img
                    style={{width:'16%',margin:'2% 2.5%','cursor':'pointer'}}
                    className={this.state.isIconActive ? 'active' : null} 
                    id={`icon-${this.section}${this.imageID}`} 
                    src={`config/feedback/images/icon-${this.imageID}.png`} 
                    onClick={this.handleClick} 
                />
        );
    }
}

export default Icons;
