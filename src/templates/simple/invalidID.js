import React from 'react';
import Helmet from "react-helmet";

import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'

const Component = () => {

    return <>
     <Helmet>
            <title>Invalid ID Page</title>
        </Helmet>
    <Container flex={1} background='white' background='white' padding='16px' center='true'>
        Invalid ID
    </Container>
    </>
}

export default Component;
