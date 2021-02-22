import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setConfig,selectLanguage} from './../../data/actions'
import { useTransition, animated, config } from 'react-spring'
import {HashRouter as Router, Switch, Route, Redirect,useLocation} from 'react-router-dom'
import Container from './../../components/container'

import Welcome  from './welcome'
import Feedback from './feedback';

const Component = () => {
    const dispatch          = useDispatch()
    const [loading,toggle]  = useState(true);

    useEffect(()=>{
        const readconfig    = async ()=>{
            const response  = await fetch('config/config.json')
            const config    = await response.json()
            dispatch(setConfig(config))
            dispatch(selectLanguage(config.languageSelection[0]))
            toggle(false)
        }
        readconfig();
    },[])

    const Animated = () =>{
        const location    = useLocation();
        const theme       = useSelector(state=>state.config.theme);
        const transitions = useTransition(location, location => location.pathname, {
            from    : { opacity: 0, transform: 'translateX(20%)' },
            enter   : { opacity: 1, transform: 'translateX(0%)' },
            leave   : { opacity: 0, transform: 'translateX(-20%)' },
        })

        return transitions.map(({ item: location, props, key }) => (
            <Container key={key} style={props} position='fixed' top={0} width='100%' height="100%" align='stretch' background='#EAFBFF'>
                <Switch location={location}>

                    <Route path='/' exact component={Welcome} />
                    <Route path="/feedback/:id" exact component={Feedback} />
                    <Redirect to="/" />

                </Switch>
            </Container>
        ))
    }

    return loading?'':<Router><Animated/></Router>
}

export default Component;
