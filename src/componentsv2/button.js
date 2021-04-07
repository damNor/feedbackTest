import React,{useState,useEffect} from 'react'
import {colorShade} from './utils'
import {useSelector} from 'react-redux';
import {animated,useSpring} from 'react-spring'
import styled,{keyframes} from 'styled-components'
import { IoArrowBackOutline } from "react-icons/io5"

const Container = styled.div`
    flex-direction  : ${p=>p.vertical?'column':'row'};
    padding         : ${p=>p.padding??'0px 24px'};
    border-radius   : ${p=>p.borderradius??'4px'};
    justify-content : ${p=>p.justify??'center'};
    outline         : ${p=>p.outline??'none'};
    align-items     : ${p=>p.align??'center'};
    width           : ${p=>p.width??'200px'};
    border          : ${p=>p.border??'none'};
    background      : ${p=>p.background};
    align-self      : ${p=>p.alignself};
    max-width       : ${p=>p.maxwidth};
    margin          : ${p=>p.margin};
    height          : ${p=>p.height};
    color           : ${p=>p.mcolor};
    flex            : ${p=>p.flex};
    cursor          : pointer;
    min-height      : 40px;
    display         : flex;
    flex-shrink     : 0;
    &:hover{ background  : ${p=>colorShade(p.background,-10)} }
`;

const rotate = keyframes`
    0%   { transform : rotate(0deg)}
    100% { transform : rotate(360deg)}
`
const Loading = styled(animated.div)`
    border          : 3px solid #fff;
    border-color    : #fff transparent #fff transparent;
    animation       : ${rotate} 1.2s linear infinite;
    display         : block;
    width           : 20px;
    height          : 20px;
    margin          : 0px;
    border-radius   : 50%;
    content         : "";
`

const Component = (props) => {
    const enable = props.enable === undefined || props.enable;
    const theme  = useSelector(state=>state.config.theme);
    const show   = useSpring({ opacity: props.mloading? 1:0 })
    return <Container {...props}
        onClick={enable?props.onClick:()=>{}}
        background={
            props.background??
            (theme===undefined?'#ebebeb':
            (props.isPrimary?theme.btnprimary:
            (props.isSecondary?theme.btnsecondary:'#ebebeb')))
        }
        mcolor={
            !enable?'rgba(255,255,255,0.5)':
            (props.mcolor??
            (theme===undefined?'':
            (props.isPrimary?theme.btnprimarytext:
            (props.isSecondary?theme.btnsecondarytext:''))))
        }>
        {props.mloading?<Loading style={show}/>:props.label}
    </Container>
}

export const BackButton = () =>{
    return <IoArrowBackOutline style={{width:18,height:18,position:'absolute',top:16,left:16}} onClick={()=>window.history.back()} />
}

export default Component;
