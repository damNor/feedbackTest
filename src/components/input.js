import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {animated} from "react-spring";

const Container = styled(animated.div)`
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width??(p.stretch?'stretch':'')};
    max-width       : ${p=>p.maxwidth};
    height          : ${p=>p.height};
    background      : ${p=>p.background};
    display         : flex;
    flex            : ${p=>p.flex};
    flex-direction  : ${p=>p.direction??'column'};
    flex-shrink     : 0;
    flex-wrap       : ${p=>p.wrap};
    align-items     : ${p=>p.align??(p.center?'center':'flex-start')};
    justify-content : ${p=>p.justify??(p.center?'center':'flex-start')};
    align-self      : ${p=>p.alignself};
    border          : ${p=>p.border};
    border-radius   : ${p=>p.borderradius};
    opacity         : ${p=>p.opacity};
    overflow        : ${p=>p.overflow};
    overflow-x      : ${p=>p.overflowx};
    overflow-y      : ${p=>p.overflowy};
    position        : ${p=>p.position};
    top             : ${p=>p.top};
    color           : ${p=>p.color};
    cursor          : ${p=>p.cursor};
`;

const Input = styled.input`
    border  : 1px solid rgba(0,0,0,0.2);
    width   : 100%;
    padding : 8px 16px;
`

const Component = ({type='text',label,value,onChange,margin,width}) => {
    return <Container margin={margin}>
        <div style={{marginBottom:4}}>{label}</div>
        <Input type={type} onChange={e=>onChange(e.target.value)} value={value} style={{width:width}}/>
    </Container>
}
export default Component;
