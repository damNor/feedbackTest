import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {animated} from "react-spring";
import Loading from './loading'

const Container = styled(animated.div)`
    background      : white;
    color           : black;
    width           : 316px;
    box-shadow      : 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius   : 5px;
`;

const Title = styled.div`
    font-weight : bold;
    margin      : 16px 16px 8px;
`
const Body = styled.div`
    display     : flex;
    flex-direction  : column;
    align-items : ${p=>p.align};
    margin      : 8px 16px 16px;
    color       : rgba(0,0,0,0.8);
    font-size   : 13px;
`
const Button = styled.div`
    width       : 60px;
    display     : flex;
    justify-content : flex-end;
    font-weight : bold;
    margin      : 16px;
    color       : ${p=>p.color??'dodgerblue'};
    font-size   : 13px;
`

const Component = ({title='Dialog',body='-',align,onClick,onCancel,loading}) => {
    return <Container>
        <Title>{title}</Title>
        <Body align={align}>{body}</Body>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            {onCancel && <Button color={'darkgrey'} onClick={onCancel}>CANCEL</Button>}
            {onClick && (<Button onClick={loading===undefined?onClick:loading?()=>{}:onClick}>{loading?<Loading size='12px'/>:"CONTINUE"}</Button>)}
        </div>
    </Container>
}
export default Component;
