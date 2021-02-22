import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux';

const Container = styled.div`
    background      : ${p=>p.background};
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.mwidth};
    font-size       : ${p=>p.size};
    line-height     : ${p=>p.size};
    font-weight     : ${p=>p.weight??p.bold?'bold':''};
    flex            : ${p=>p.flex};
    text-align      : ${p=>p.textalign};
    align-self      : ${p=>p.alignself};
    color           : ${p=>p.color};
    z-index         : ${p=>p.zIndex};
`;

const Component = (props) => {
    const theme  = useSelector(state=>state.config.theme);
    const [color,setColor] = useState('');

    useEffect(()=>{
        if(theme !== undefined){
            if(props.isPrimary) setColor(theme.primary)
            else setColor(theme.textdefault)
        }
        if(props.mColor) setColor(props.mColor)
    },[theme])



    return <Container
        {...props}
        color={color}
        >{props.children}</Container>
}
export default Component;
