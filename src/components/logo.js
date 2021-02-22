import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

const Image = styled.img`
    background      : ${p=>p.background};
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width};
`;

const Component = (props) => {
    const {id} = useParams()
    return <Image {...props} src={`config/${id}/images/logo.png`} />
}
export default Component;
