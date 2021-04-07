import React from 'react'
import styled,{keyframes} from 'styled-components'
import {animated,useSpring} from 'react-spring'

const rotate = keyframes`
    0% { transform : rotate(0deg)}
    100% { transform : rotate(360deg)}
`
const Loading = styled(animated.div)`
    animation       : ${rotate} 1.2s linear infinite;
    border          : ${p=>p.thickness} solid ${p=>p.color};
    border-color    : ${p=>p.color} transparent ${p=>p.color} transparent;
    margin          : ${p=>p.margin};
    width           : ${p=>p.size};
    height          : ${p=>p.size};
    display         : block;
    border-radius   : 50%;
    content         : "";
    position        : ${p=>p.position};
    top             : ${p=>p.top};
    left            : ${p=>p.left};
    right           : ${p=>p.right};
    bottom          : ${p=>p.bottom};

`

const Component = ({margin,color='#ccc',size='20px',thickness='3px',show=true,position,top,left,right,bottom}) => {
    const animate = useSpring({
        opacity: show? 1:0,
        display: show? 'block':'none'
    })
    return <Loading margin={margin} color={color} size={size} thickness={thickness} style={animate}
    position={position} top={top} left={left} right={right} bottom={bottom}/>
}
export default Component;
