import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import styled,{keyframes} from 'styled-components'
import {colorShade} from './utils'

const Container = styled.button`
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding??'0px 24px'};
    width           : ${p=>p.width??'200px'};
    max-width       : ${p=>p.maxwidth};
    min-height      : 40px;
    height          : ${p=>p.height};
    background      : ${p=>p.background};
    border          : ${p=>p.border??'none'};
    border-radius   : ${p=>p.borderradius??'5px'};
    outline         : ${p=>p.outline??'none'};
    color           : ${p=>p.color};
    flex            : ${p=>p.flex};
    flex-shrink     : 0;
    display         : flex;
    flex-direction  : ${p=>p.vertical?'column':'row'};
    align-items     : ${p=>p.align??'center'};
    justify-content : ${p=>p.justify??'center'};
    cursor          : pointer;
    align-self      : ${p=>p.alignself};

    &:hover{
        background  : ${p=>colorShade(p.background,-5)}
    }
`;

const rotate = keyframes`
    0% { transform : rotate(0deg)}
    100% { transform : rotate(360deg)}
`
const Loading = styled.div`
    content         : "";
    display         : block;
    width           : 20px;
    height          : 20px;
    margin          : 0px;
    border-radius   : 50%;
    border          : 3px solid #fff;
    border-color    : #fff transparent #fff transparent;
    animation       : ${rotate} 1.2s linear infinite;
`

const Component = (props) => {
    const theme  = useSelector(state=>state.config.theme);
    const enable = props.enable === undefined || props.enable;

    return <Container
        {...props}
        background={
            props.background??
            theme === undefined? '#ebebeb':
            props.isPrimary?theme.btnprimary:
            props.isSecondary?theme.btnsecondary:
            '#ebebeb'
        }
        color={
            !enable?'rgba(255,255,255,0.5)':
            props.color??
            theme === undefined? '':
            props.isPrimary?theme.btnprimarytext:
            props.isSecondary?theme.btnsecondarytext:
            ''
        }
        onClick={enable?props.onClick:()=>{}}
    >
    {props.mloading?<Loading />:props.label}
    </Container>
}
export default Component;
