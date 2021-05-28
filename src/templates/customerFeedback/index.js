import React,{useState,useEffect,useContext} from 'react';
import {useTransition, animated, config } from 'react-spring'
import {HashRouter as Router, Switch, Route, Redirect,useLocation,useParams} from 'react-router-dom'
import Container from './../../components/container'

import Welcome      from './welcome'
import Forms        from './forms'
import Questionaire from './Questionaire'
import QuestionaireDetail from './QuestionaireDetail'
import ThankYou from './ThankYou'

//////////////////////////////////////////////////////////////////////////////// Constant
export const VERSION     = "v1.0"


////////////////////////////////////////////////////////////////////////////////
const InvalidID = () => <>Invalid Id</>
const RouteBack = () => {const {id} = useParams(); return <Redirect to={`/${id}/`}/> }
const Animated  = () => {
    const location      = useLocation();
    const transitions   = useTransition(location, location => location.pathname, {
        from    : {opacity: 0,transform: 'translateX(0%)'},
        enter   : {opacity: 1,transform: 'translateX(0%)'},
        leave   : {opacity: 0,transform: 'translateX(0%)'}
    })
    return transitions.map(({ item: location, props, key }) => (
            <Container key={key} style={props} position='fixed' width='100%' height='100%' align='stretch'>
                <Switch location={location}>
                    <Route path='/'             exact component={InvalidID} />
                    {/* <Route path='/:id'          exact component={Welcome} /> */}
                    <Route path='/:id'        exact component={Questionaire} />
                    <Route path='/:id/qd'       exact component={QuestionaireDetail} />
                    <Route path='/:id/f'        exact component={Forms} />
                    <Route path='/:id/end'        exact component={ThankYou} />
                    <Route path='/:id/:unknown' exact component={RouteBack} />
                    <Redirect to='/' />
                </Switch>
            </Container>
        ))
}
const Component = () => <Router><Animated/></Router>
export default Component;
