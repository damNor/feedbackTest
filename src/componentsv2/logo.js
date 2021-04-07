import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import Transparent from './../resources/transparent.png'

const Image = styled.img`
    width           : ${p=>p.width??'200px'};
    border-radius   : ${p=>p.borderRadius};
    background      : ${p=>p.background};
    align-self      : ${p=>p.alignself};
    padding         : ${p=>p.padding};
    margin          : ${p=>p.margin};
    height          : ${p=>p.height};
    object-fit      : ${p=>p.fit};
`;

const Component = (props) => {
    const {id} = useParams()
    return <Image {...props} src={`config/${id}/images/logo.png`} onError={e=>e.target.src = Transparent}/>
}
export default Component;
