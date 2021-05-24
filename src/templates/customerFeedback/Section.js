import React, { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {selectDepartment,selectRating,selectFilledDepartment} from './../../data/actions'

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

const Section = ({ section, title, template }) => 
{
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const[appState,changeState] = useState({
      activeObject : null,
      objects : choices
    })

    function toggleActive(index, section)
    {
      console.log('index', index)
      console.log('section ', section)
      changeState({...appState, activeObject: appState.objects[index]})

      console.log('index',index)
      console.log('section',section)
      
      dispatch(selectDepartment(section))  
      dispatch(selectRating(index))
      dispatch(selectFilledDepartment(section))

      navigate.push(`/${id}/qd`)
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
          <Text style={{fontFamily:'roboto'}} size='1.7rem' margin='4px 0 0' weight='800' mcolor='#0072BC'>{title}</Text>
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
                          toggleActive(id,section)
                        }}
                    />
                </>
            ))}
          </Container>
      </Container>
    );
};
export default Section;
