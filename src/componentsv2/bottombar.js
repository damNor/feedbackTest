import React,{useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components'
import {animated} from "react-spring"
import {setTab} from './../data/actions'
import Cookies from 'universal-cookie'
import moment from 'moment'

import { IoTicketOutline, IoTicketSharp, IoList } from "react-icons/io5";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";
import { TiHome } from "react-icons/ti";
import Error from './error'

const Container = styled(animated.div)`
    background      : ${p=>p.background??'white'};
    padding         : ${p=>p.padding??'0 16px'};
    color           : ${p=>p.mcolor};
    margin          : ${p=>p.margin};
    border          : ${p=>p.border};
    justify-content : space-around;
    width           : stretch;
    align-items     : center;
    display         : flex;
    height          : 50px;
    flex-direction  : row;
`;

const TabContainer = styled(animated.div)`
    padding     : 8px 12px;
    opacity     : ${p=>p.opacity};
    text-align  : center;
`;
const Label = styled(animated.div)`
    font-size   : 8px;
    font-weight : 500;
    color       : #494948;
`;

const Tab = ({select,label,active,inactive,onClick})=>{
    return <TabContainer onClick={onClick} opacity={select?1:0.3}>
        {select?active:inactive}
        <Label>{label}</Label>
    </TabContainer>
}

const Component = (props) => {
    const {id}       = useParams()
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const cookies    = new Cookies()
    const iconStyle  = {width:24,height:24,color:'#494948'}
    const currentTab = useSelector(state=>state.tab)
    const config     = useSelector(state=>state.config)
    const theme      = useSelector(state=>state.config.theme)
    const features   = useSelector(state=>state.config.features)
    const qr         = cookies.get('qr')
    const qrdate     = cookies.get('qrdate')
    const [error,setError] = useState('')

    return <Container
        mcolor={theme&&theme.primarydark}
        border='1px solid rgba(0,0,0,0.1)'
        borderwidth='1px 0 0 0'

    >
        {
            features && features.home &&
            <Tab
            label='HOME'
            select={currentTab==='home'}
            active={<TiHome style={iconStyle}/>}
            inactive={<VscHome style={iconStyle}/>}
            onClick={()=>{
                dispatch(setTab('home')); navigate.push(`/${id}/`);
            }}/>
        }

        {
            features && features.queue &&
            <Tab
            label='QUEUE'
            select={currentTab==='queue'}
            active={<IoTicketSharp style={iconStyle}/>}
            inactive={<IoTicketOutline style={iconStyle}/>}
            onClick={()=>{
                if(qr === undefined || qrdate !== moment().format('DD/MM/yyyy')){
                    cookies.remove('qr')
                    setError('You have no active queue')
                }else {
                    dispatch(setTab('queue'))
                    navigate.push(`/${id}/q/${qr}`)
                }
            }}/>
        }

        {
            features && features.journey &&
            <Tab
            label='JOURNEY'
            select={currentTab==='journey'}
            active={<IoList style={iconStyle}/>}
            inactive={<IoList style={iconStyle}/>}
            onClick={()=>{
                if(qr === undefined || qrdate !== moment().format('DD/MM/yyyy')){
                    cookies.remove('qr')
                    setError('You have no active queue')
                }else{
                    dispatch(setTab('journey'))
                    navigate.push(`/${id}/j/${qr}`)
                }
            }}/>
        }

        {
            features && features.appointment &&
            <Tab
            label='BOOKING'
            select={currentTab==='appointment'}
            active={<AiFillCalendar style={iconStyle}/>}
            inactive={<AiOutlineCalendar style={iconStyle}/>}
            onClick={()=>{
                dispatch(setTab('appointment'))
                navigate.push(`/${id}/a`)
            }}/>
        }

        {
            features && features.infos &&
            <Tab
            label='INFO'
            select={currentTab==='infos'}
            active={ <BsInfoCircleFill style={{width:18,height:18,margin:2}}/>}
            inactive={<BsInfoCircle style={{width:18,height:18,margin:2}}/>}
            onClick={()=>{
                dispatch(setTab('infos'))
                navigate.push(`/${id}/i`);
            }}/>
        }

        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>
}
export default Component;
