import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux';

const Container = styled.div`
    align-self      : ${p=>p.alignself};
    padding         : ${p=>p.padding};
    opacity         : ${p=>p.opacity};
    margin          : ${p=>p.margin};
    width           : ${p=>p.width};
    flex            : ${p=>p.flex};
    align-items     : center;
    display         : flex;
`;
const Text = styled.div`
    text-align      : ${p=>p.textalign??'left'};
    border-radius   : ${p=>p.borderradius};
    background      : ${p=>p.background};
    font-weight     : ${p=>p.weight};
    color           : ${p=>p.mcolor};
    z-index         : ${p=>p.zIndex};
    width           : ${p=>p.width};
    font-size       : ${p=>p.size};
    line-height     : ${p=>p.size};
    flex            : 1;
`;
const Spacer = styled.div` width : 6px; `

const Component = (props) => {
    const theme  = useSelector(state=>state.config.theme);
    const [color,setColor] = useState('');

    // useEffect(()=>{
    //     if(theme !== undefined) setColor(props.isPrimary?theme.primary:theme.textdefault)
    //     if(props.mcolor) setColor(props.mcolor)
    // },[theme])

    return <Container {...props}>
        {props.icon&&<>{props.icon}<Spacer/></>}
        <Text {...props} mcolor={
            props.mcolor??
            (theme===undefined?'':
            (props.isPrimary?theme.primary:
            (props.isSecondary?theme.secondary:
            '#494948')))
        }>{props.children}</Text>
    </Container>
    // return <Container {...props} color={color}>
    //     {props.icon&&<>{props.icon}<Spacer/></>}
    //     {props.children}
    // </Container>
}
export default Component;
