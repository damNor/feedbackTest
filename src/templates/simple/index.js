import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setConfig,selectLanguage} from './../../data/actions'
import { useTransition, animated, config } from 'react-spring'
import {HashRouter as Router, Switch, Route, Redirect,useLocation,useParams} from 'react-router-dom'
import Container from './../../components/container'

import InvalidID    from './invalidID'
import Welcome      from './welcome'
import Branches     from './branches'
import Departments  from './departments'
import Services     from './services'
import Timeslots    from './timeslots'
import Forms        from './forms'
import Queue        from './queue'

//////////////////////////////////////////////////////////////////////////////// Constant
export const VERSION     = "v1.0"
//export const CONFIG_PATH = "/c/"
export const CONFIG_PATH = "/config/"


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const dispatch          = useDispatch()
    const [loading,toggle]  = useState(true);

    const RouteBack = () => {
        const {id} = useParams();
        return <Redirect to={"/"+id} />
    }

    const Animated = () =>{
        const location      = useLocation();
        const theme         = useSelector(state=>state.config.theme);
        const [init,toggle] = useState(false)
        const transitions   = useTransition(location, location => location.pathname, {
            from    : { opacity: 0, transform: init?'translateX(10%)':'translateX(0%)' },
            enter   : { opacity: 1, transform: 'translateX(0%)' },
            leave   : { opacity: 0, transform: 'translateX(-50%)' },
        })
        useEffect(()=>{toggle(true)},[])

        return <>
        <Container width='100%' height='100%' >
            {/*Background misc
            <Container width='100%' height='5px' background={theme?theme.primary:''} />
            <Container flex={1} />
            <Container width='100%' height='5px' background={theme?theme.primary:''} />
            */}
        </Container>
        {
            transitions.map(({ item: location, props, key }) => (
                <Container key={key} style={props} position='fixed' width='100%' height='100%' align='stretch'>
                    <Switch location={location}>
                        <Route path='/'             exact component={InvalidID} />
                        <Route path='/:id'          exact component={Welcome} />
                        <Route path='/:id/b'        exact component={Branches} />
                        <Route path='/:id/d'        exact component={Departments} />
                        <Route path='/:id/s'        exact component={Services} />
                        <Route path='/:id/t'        exact component={Timeslots} />
                        <Route path='/:id/f'        exact component={Forms} />
                        <Route path='/:id/q'        exact component={Queue} />
                        <Route path='/:id/q/:qr'    exact component={Queue} />
                        <Route path='/:id/:unknown' exact component={RouteBack} />
                        <Redirect to='/' />
                    </Switch>
                </Container>
            ))
        }
        </>
    }

    return <Router>
        <Animated/>
    </Router>
}

export default Component;
