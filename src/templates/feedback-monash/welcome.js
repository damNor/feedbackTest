import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {fetchFeedback,submitFeedback} from './../../data/api/feedback'

import Container from './../../components/container'

const Component = () => {
    const dispatch          = useDispatch()
    const [loading,toggle]  = useState(true);

    return <Container flex={1} background='white' align='stretch'>
        department id not set
    </Container>
}

export default Component;
