import React from 'react'
import {useSelector} from 'react-redux';
import styled,{keyframes} from 'styled-components'

const rotate = keyframes`
    0% { transform : rotate(0deg)}
    100% { transform : rotate(360deg)}
`
const Loading = styled.div`
    margin          : ${p=>p.margin};
    content         : "";
    display         : block;
    width           : ${p=>p.size};
    height          : ${p=>p.size};
    border-radius   : 50%;
    border          : ${p=>p.thickness} solid ${p=>p.color};
    border-color    : ${p=>p.color} transparent ${p=>p.color} transparent;
    animation       : ${rotate} 1.2s linear infinite;
`

const Component = ({margin,color='#ccc',size='20px',thickness='3px'}) => {
    const config = useSelector(state=>state.config);
    return <Loading margin={margin} color={color} size={size} thickness={thickness}/>
}
export default Component;
