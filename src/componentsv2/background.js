import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import Transparent from './../resources/transparent.png'

const Image     = styled.img` width : 100% `;
const Container = styled.div`
    width    : ${p=>p.width??'100%'};
    z-index  : ${p=>p.zIndex??-2};
    opacity  : ${p=>p.opacity};
    height   : ${p=>p.height};
    width    : ${p=>p.width};
    position : fixed;
    bottom   : 0px;
`;

const Component = props => {
    const {id} = useParams()
    return <Container {...props}>
        <Image src={`config/${id}/images/global_bg.png`} onError={e=>e.target.src = Transparent} />
    </Container>
}
export default Component;
