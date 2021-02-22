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
    align-items     : ${p=>p.align??(p.center?'center':'flex-start')};
    justify-content : ${p=>p.justify??(p.center?'center':'flex-start')};
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
    box-sizing      : ${p=>p.boxSizing};
`;

const Component = (props) => {
    return <Container {...props}>{props.children}</Container>
}
export default Component;
