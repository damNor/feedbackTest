import React,{useState,useEffect} from 'react'
import {animated,useSpring} from 'react-spring'
import styled from 'styled-components'

const Container = styled(animated.div)`
    box-sizing      : ${p=>p.boxsizing??'border-box'};
    position        : ${p=>p.position??'relative'};
    flex-direction  : ${p=>p.direction??'column'};
    display         : ${p=>p.display??'flex'};
    border-radius   : ${p=>p.borderradius};
    border-width    : ${p=>p.borderwidth};
    background      : ${p=>p.background};
    align-self      : ${p=>p.alignself};
    overflow-x      : ${p=>p.overflowx};
    overflow-y      : ${p=>p.overflowy};
    max-width       : ${p=>p.maxwidth};
    overflow        : ${p=>p.overflow};
    padding         : ${p=>p.padding};
    justify-content : ${p=>p.justify};
    opacity         : ${p=>p.opacity};
    height          : ${p=>p.height};
    margin          : ${p=>p.margin};
    border          : ${p=>p.border};
    cursor          : ${p=>p.cursor};
    z-index         : ${p=>p.zindex};
    box-shadow      : ${p=>p.shadow};
    width           : ${p=>p.width};
    align-items     : ${p=>p.align};
    color           : ${p=>p.color};
    flex            : ${p=>p.flex};
    flex-wrap       : ${p=>p.wrap};
    bottom          : ${p=>p.bottom};
    right           : ${p=>p.right};
    left            : ${p=>p.left};
    top             : ${p=>p.top};
    flex-shrink     : 0;
`

export const Content = styled(animated.div)`
    position        : relative;
    flex-direction  : column;
    align-items     : center;
    overflow-y      : auto;
    display         : flex;
    flex            : 1;
`
export const Card = styled(animated.div)`
    border          : ${p=>p.border??'1px solid rgba(0,0,0,0.2)'};
    margin          : ${p=>p.margin??'0 16px 6px'};
    color           : ${p=>p.mcolor??'black'};
    align-items     : ${p=>p.align??'center'};
    width           : ${p=>p.width??'320px'};
    border-radius   : ${p=>p.radius??'5px'};
    background      : ${p=>p.bg??'white'};
    min-height      : ${p=>p.minheight};
    flex-direction  : ${p=>p.direction};
    opacity         : ${p=>p.opacity};
    padding         : ${p=>p.padding};
    justify-content : ${p=>p.justify};
    font-weight     : ${p=>p.weight};
    height          : ${p=>p.height};
    overflow        : hidden;
    display         : ${p=>p.display??'flex'};
    flex-shrink     : 0;
    box-shadow      : ${p=>p.shadow};
    border-width    : ${p=>p.borderwidth};
`

export const BlackOut = styled(animated.div)`
    display         : ${p=>p.display??'flex'};
    background      : rgba(0,0,0,0.5);
    align-items     : center;
    justify-content : center;
    position        : fixed;
    top             : 0;
    left            : 0;
    right           : 0;
    bottom          : 0;
    z-index         : 2;
`

export default Container;
