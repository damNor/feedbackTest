import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux';

const Container = styled.div`
    display         : flex;
    align-items     : center;
    flex            : ${p=>p.flex};
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width};
    align-self      : ${p=>p.alignself};
    opacity         : ${p=>p.opacity};
`;
const Text = styled.div`
    background      : ${p=>p.background};
    width           : ${p=>p.width};
    font-size       : ${p=>p.size};
    line-height     : ${p=>p.size};
    font-weight     : ${p=>p.weight??p.bold?'bold':''};
    flex            : 1;
    text-align      : ${p=>p.textalign??'left'};
    color           : ${p=>p.mcolor};
    z-index         : ${p=>p.zIndex};
    border-radius   : ${p=>p.borderradius};
`;
const Spacer = styled.div` width : 8px; `

const Component = (props) => {
    const theme  = useSelector(state=>state.config.theme);
    const [color,setColor] = useState('');

    useEffect(()=>{
        if(theme !== undefined) setColor(props.isPrimary?theme.primary:theme.textdefault)
        if(props.mcolor) setColor(props.mcolor)
    },[theme])

    return <Container {...props}>
        {props.icon&&props.icon}
        {props.icon&&<Spacer/>}
        <Text {...props} mcolor={color}>{props.children}</Text>
    </Container>
    // return <Container {...props} color={color}>
    //     {props.icon&&<>{props.icon}<Spacer/></>}
    //     {props.children}
    // </Container>
}
export default Component;
