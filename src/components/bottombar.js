import React,{useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components'
import {animated} from "react-spring"
import {setTab} from './../data/actions'
import Cookies from 'universal-cookie'

import { IoTicketOutline, IoTicketSharp, IoList } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { VscHome } from "react-icons/vsc";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";

import Error from './error'

const Container = styled(animated.div)`
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : stretch;
    background      : ${p=>p.background};
    display         : flex;
    flex-direction  : row;
    align-items     : center;
    justify-content : space-around;
    border          : ${p=>p.border};
    color           : ${p=>p.mcolor};
    box-sizing      : ${p=>p.boxsizing};
`;

const Tab = ({icon,label,select,onClick})=><div
    onClick={onClick}
    style={{padding:'6px 12px',opacity:select?1:0.3,textAlign:'center'}}>
    {icon}
    <div style={{fontSize:10,fontWeight:'bold',color:'black'}}>{label}</div>
</div>

const Component = (props) => {

    const navigate      = useHistory()
    const dispatch      = useDispatch()
    const {id}          = useParams()
    const config        = useSelector(state=>state.config)
    const theme         = useSelector(state=>state.config.theme)
    const iconStyle     = {width:18,height:18}
    const currentTab    = useSelector(state=>state.tab)

    const cookies       = new Cookies()
    const qr            = cookies.get('qr')

    const [error,setError] = useState('')

    return <Container background={'white'} padding='0 16px' mcolor={theme&&theme.primarydark}>
        <Tab
        label='HOME'
        icon={currentTab === 'home'?<TiHome style={iconStyle}/> : <VscHome style={iconStyle}/>}
        select={currentTab==='home'}
        onClick={()=>{ dispatch(setTab('home')); navigate.push(`/${id}/`); }}/>

        <Tab
        label='QUEUE'
        icon={currentTab === 'queue'?<IoTicketSharp style={iconStyle}/> : <IoTicketOutline style={iconStyle}/>}
        select={currentTab==='queue'}
        onClick={()=>{
            if(qr === undefined) setError('You have no active queue')
            else {
                dispatch(setTab('queue'))
                navigate.push(`/${id}/q/${qr}`)
            }
        }}/>

        <Tab
        label='JOURNEY'
        icon={<IoList style={iconStyle}/>}
        select={currentTab==='journey'}
        onClick={()=>{
            if(qr === undefined) setError('You have no active queue')
            else{
                dispatch(setTab('journey'))
                navigate.push(`/${id}/j/${qr}`)
            }
        }}/>

        {/*<Tab
        label='INFO'
        icon={currentTab==='infos'? <BsInfoCircleFill/>:<BsInfoCircle/>}
        select={currentTab==='infos'} onClick={()=>{
            dispatch(setTab('infos'))
            navigate.push(`/${id}/i`);
        }}/>*/}

        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>
}
export default Component;
