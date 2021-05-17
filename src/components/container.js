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
    display         : ${p=>p.display??'flex'};
    flex            : ${p=>p.flex};
    flex-direction  : ${p=>p.direction??'column'};
    flex-shrink     : 0;
    flex-wrap       : ${p=>p.wrap};
    align-items     : ${p=>p.align  ?? (p.center?'center':'flex-start') };
    justify-content : ${p=>p.justify ?? (p.center?'center':'flex-start') };
    align-self      : ${p=>p.alignself};
    border          : ${p=>p.border};
    border-radius   : ${p=>p.borderradius};
    opacity         : ${p=>p.opacity};
    overflow        : ${p=>p.overflow};
    overflow-x      : ${p=>p.overflowx};
    overflow-y      : ${p=>p.overflowy};
    position        : ${p=>p.position??'relative'};
    top             : ${p=>p.top};
    bottom          : ${p=>p.bottom};
    left            : ${p=>p.left};
    right           : ${p=>p.right};
    color           : ${p=>p.color};
    cursor          : ${p=>p.cursor};
    z-index         : ${p=>p.zindex};
    box-sizing      : ${p=>p.boxsizing};
    box-shadow      : ${p=>p.shadow};
`;

const Component = (props) => {
    return <Container {...props}>{props.children}</Container>
}

export const Content = styled.div`
    flex            : 1;
    overflow-y      : auto;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    position        : relative;
`
export const Card = styled.div`
    border          : ${p=>p.border??'1px solid rgba(0,0,0,0.2)'};
    color           : ${p=>p.mcolor??'black'};
    align-items     : ${p=>p.align??'center'};
    width           : ${p=>p.width??'320px'};
    border-radius   : ${p=>p.radius??'5px'};
    background      : ${p=>p.bg??'white'};
    flex-direction  : ${p=>p.direction};
    opacity         : ${p=>p.opacity};
    padding         : ${p=>p.padding};
    justify-content : ${p=>p.justify};
    font-weight     : ${p=>p.weight};
    margin          : 0 16px 6px;
    overflow        : hidden;
    display         : flex;
    border-width    : 1px;
    flex-shrink     : 0;
`

export const BlackOut = styled.div`
    background      : rgba(0,0,0,0.5);
    position        : fixed;
    top             : 0;
    left            : 0;
    right           : 0;
    bottom          : 0;
    display         : ${p=>p.display??'flex'};
    align-items     : center;
    justify-content : center;
    z-index         : 3;

`

export default Component;
