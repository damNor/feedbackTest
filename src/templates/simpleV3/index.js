import React,{useState,useEffect,useContext} from 'react';
import {useTransition, animated, config } from 'react-spring'
import {HashRouter as Router, Switch, Route, Redirect,useLocation,useParams} from 'react-router-dom'
import Container from './../../components/container'

import Welcome      from './welcome'
import Branches     from './branches'
import Departments  from './departments'
import Services     from './services'
import Timeslots    from './timeslots'
import Forms        from './forms'
import Queue        from './queue'
import Journey      from './journey'
import Infos        from './infos'
import Appointments from './appointments'

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
                    <Route path='/:id'          exact component={Welcome} />
                    <Route path='/:id/b'        exact component={Branches} />
                    <Route path='/:id/d'        exact component={Departments} />
                    <Route path='/:id/s'        exact component={Services} />
                    <Route path='/:id/t'        exact component={Timeslots} />
                    <Route path='/:id/f'        exact component={Forms} />
                    <Route path='/:id/q/:qr'    exact component={Queue} />
                    <Route path='/:id/j/:qr'    exact component={Journey} />
                    <Route path='/:id/i'        exact component={Infos} />
                    <Route path='/:id/a'        exact component={Appointments} />
                    <Route path='/:id/:unknown' exact component={RouteBack} />
                    <Redirect to='/' />
                    {/*<Route path='/:id/b'        exact component={Branches} />*/}
                </Switch>
            </Container>
        ))
}
const Component = () => <Router><Animated/></Router>
export default Component;
