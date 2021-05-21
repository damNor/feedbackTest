import React, { useEffect, useState, createRef } from "react";
import Collapse from "@kunukn/react-collapse";
import Down from "./Down";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import Icons from "./Icons";
import Container,{Content} from './../../componentsv2/container'
/* 
const [checked, setChecked] = useState(true);
const handleChange = (event) => {
    setChecked(event.target.checked);
}; 
*/
import styled from 'styled-components'

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



const Block1 = ({ title }) => 
{
  const [isActive, setIsActive] = useState(true)
  const [imageID, setImageID] = useState()
  const[myRef, setMyRef] = useState()
  useEffect(() => {
    setMyRef(createRef())
  },[])
  
  const handleClick1 = (e) => {

    const currentState = isActive
    setIsActive(!currentState)
    setImageID(e.target.id)
  
    // this.myRef.current.src = "";
    console.log('e.target.id',e.target.id);
    console.log('this.myRef.current',myRef.current);
  
    // document.getElementById(e.target.id).setAttribute("style","border:1px solid");
  }

    
  return (
    <div className="block">
      <div className="btn toggle" onClick={onToggle}>
        <span style={{ width: "80%" }}>{title}</span>
        <Icons templateID={template} sectionID={section} />
        {/* {choices.map(({ id }) => 
        (
            <>
                <img
                    style={{width:'30px'}}
                    className={isActive ? 'acitve' : ''} 
                    id={`icon-${section}${id}`} 
                    src={`config/feedback/images/icon-${id}.png`} 
                    onClick={handleClick} 
                />
            </>
        ))} */}
        <img
            style={{width:'30px'}}
            className={isActive ? 'acitve' : ''} 
            id={`icon-${section}1`} 
            src={`config/feedback/images/icon-1.png`} 
            onClick={handleClick1} 
        />
        <img
            style={{width:'30px'}}
            className={isActive ? 'acitve' : ''} 
            id={`icon-${section}2`} 
            src={`config/feedback/images/icon-2.png`} 
            onClick={handleClick2} 
        />
        <img
            style={{width:'30px'}}
            className={isActive ? 'acitve' : ''} 
            id={`icon-${section}3`} 
            src={`config/feedback/images/icon-3.png`} 
            onClick={handleClick3} 
        />
        <Down isOpen={isOpen} />
      </div>

      <Collapse layoutEffect isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
};
export default Block1;
