import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

const Image = styled.img`
    background      : ${p=>p.background};
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width};
`;

const onError = (e) =>{
    e.target.onerror = null;
    e.target.src = "";
}

const Component = (props) => {
    const {id} = useParams()
    return <Image {...props} src={`config/${id}/images/${props.src}`} onError={onError} />
}
export default Component;
