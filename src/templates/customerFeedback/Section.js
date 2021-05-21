import React, { useEffect, useState, createRef } from "react";
import Collapse from "@kunukn/react-collapse";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import Icons from "./Icons";

import Container,{Content} from '../../componentsv2/container'
import Text from '../../componentsv2/text'
import 'typeface-roboto'
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
  { id: "1", score: "1", text: "Excellent"},
  { id: "2", score: "2", text: "Good"},
  { id: "3", score: "3", text: "Fair"},
  { id: "4", score: "4", text: "Poor"},
  { id: "5", score: "5", text: "Very Poor"},
];

// for Icon component
const onIconClicked= (number,section) =>
{
  console.log(`Icon ${number} ${section} was clicked`)
}

const Section = ({ section, title, template }) => 
{
  const[appState,changeState] = useState({
    activeObject : null,
    objects : choices
  })

  function toggleActive(index)
  {
    console.log('toggleActive', index);
    changeState({...appState, activeObject: appState.objects[index]})
  }

  function toggleActiveStyles(index){
      if(appState.objects[index] === appState.activeObject){
        return "active-smiley-state"
        // console.log("active")
      }
      else{
        return ""
        // console.log("inactive")
      }
        
  }
  return (
    <Container border='' borderradius='10px' background='white' padding='2% 3%' margin='1% 0.5%'>
        <Text style={{'font-family':'roboto'}} size='1.7rem' margin='4px 0 0' weight='800' mcolor='#0072BC'>{title}</Text>
        <Container align="space-between" direction="row" alignself="center">
          {choices.map(({ id }) => 
          (
              <>
                  <img
                      key={id}
                      style={{width:'16%',margin:'2% 2.5%','cursor':'pointer'}}
                      className={toggleActiveStyles(id)}
                      id={`icon-${section}${id}`} 
                      src={`config/feedback/images/icon-${id}.png`} 
                      onClick={() => {
                        toggleActive(id)
                      }}
                  />
                  {/* 
                      <Icons templateID={template} 
                        sectionID={section} 
                        imageID={id} 
                        iconNumber={id} 
                        openIcon={onIconClicked}
                        
                        onClick={() => {
                          toggleActive(id)
                        }} 
                        /> 
                  */}
              </>
          ))}
        </Container>
    </Container>
  );
};
export default Section;
