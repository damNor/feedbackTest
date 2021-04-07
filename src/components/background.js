import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import Transparent from './../resources/transparent.png'

const Container = styled.div`
    position    : fixed;
    bottom      : 0px;
    z-index     : ${p=>p.zIndex??-2};
    width       : ${p=>p.width??'100%'};
    opacity     : ${p=>p.opacity};
    width       : ${p=>p.width};
    height      : ${p=>p.height};
`;

const Image = styled.img`
    background      : ${p=>p.background};
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width};
    height          : ${p=>p.height};
    opacity         : ${p=>p.opacity};
`;

const onError = (e) =>{
    e.target.onerror = null;
    e.target.src = Transparent;
}

const Component = (props) => {
    const {id} = useParams()
    return <Container {...props}>
        <Image src={`config/${id}/images/global_bg.png`} width='100%' onError={onError} />
    </Container>
}
export default Component;
