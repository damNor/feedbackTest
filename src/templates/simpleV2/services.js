import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices,fetchTimeslot} from './../../data/api'
import {selectService,setTimeslots} from './../../data/actions'
import styled from 'styled-components'
import {FaTicketAlt,FaRegCalendarAlt} from 'react-icons/fa';
import { IoCalendarOutline,IoTicketOutline } from "react-icons/io5";
import { HiOfficeBuilding} from 'react-icons/hi';


////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
import Container from './../../components/container'
import BottomBar from './../../components/bottombar'
import Language from './../../components/language'
import Loading from './../../components/loading'
import Button from './../../components/button'
import Error from './../../components/error'
import Image from './../../components/image'
import Text from './../../components/text'
import Logo from './../../components/logo'


const Card = styled.div`
    width           : 300px;
    border          : 1px solid rgba(0,0,0,0.2);
    border-radius   : 5px;
    margin          : 0 16px 8px;
    display         : flex;
    flex-direction  : column;
    background      : white;
    overflow        : hidden;
    opacity         : ${p=>p.opacity};
    box-sizing      : border-box;
    flex-shrink     : 0;
`

const Action = styled.div`
    padding : 8px;
    color   : ${p=>p.mcolor};
    cursor  : pointer;
`


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const sBranch   = useSelector(state=>state.select.branch)
    const sDept     = useSelector(state=>state.select.department)
    const services  = useSelector(state=>state.data.services)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = label => languages&&languages[label]?languages[label][lang]:""

    const [isQLoading,toggleQ]  = useState(false)
    const [isALoading,toggleA]  = useState(false)
    const [error,setError]      = useState('')
    const [clickOn,setClick]    = useState({})

    const singleOperation   = config.features&&!(config.features.queue && config.features.appointment)
    const noSelection       = Object.keys(clickOn).length === 0

    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || services === undefined)
        navigate.push(`/${id}/`)
    },[config,services])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClickQ = async (serv) => {
        toggleQ(true)
        setClick(serv)
        dispatch(selectService(serv))
        navigate.push(`/${id}/f`)
    }

    const onClickA = async (serv) => {
        toggleA(true)
        setClick(serv)
        const response = await fetchTimeslot(config.server,lang,sBranch.mid,sDept.dept_id,serv.serv_id);
        console.log('timeslots',response);
        if (response.error) setError(response.error)
        else{
            dispatch(selectService(serv))
            dispatch(setTimeslots(response))
            navigate.push(`/${id}/t`)
        }

    }

    const Service = ({service}) => <Card
            opacity={Object.keys(clickOn).length === 0? 1: clickOn.serv_id === service.serv_id? 1:0.4 }>
            <Text>{service.serv_name}</Text>
            {   config.features && config.features.queue &&
                <IoTicketOutline  style={{width:24,height:24,margin:'8px 0 8px 16px'}} onClick={()=>{if(!isALoading)onClickQ(service)}} />
            }
            {
                config.features && config.features.appointment && (
                clickOn.serv_id === service.serv_id && isALoading? <Loading size='16px' margin='0 0 0 16px'/>:
                <IoCalendarOutline style={{width:24,height:24,margin:'8px 0 8px 16px'}} onClick={()=>{if(!isQLoading)onClickA(service)}}/>)
            }
        </Card>

    //////////////////////////////////////////////////////////////////////////// define UI
    //Container flex={1} align='center' overflowy='auto' overflowx='hidden'
    return <>
        <div style={{width:'200%',height:5,background:theme&&theme.primary}} />
        <Logo alignself='center' width='150px' margin='16px'/>
        <Container
            alignself='center'
            align='center'
            width='300px'
            borderradius='5px'
            padding='12px 16px'
            boxsizing='border-box'
            background={theme&&theme.btnprimary}
            color={theme&&theme.btnprimarytext}>
            {services&&services.dept_name}
            </Container>
        {/*<Text alignself='center' width='300px' margin='16px 0 12px'>Services</Text>*/}
        <Container flex={1} overflowy='auto' align='center' margin='12px 0'>
        {
            services && services.dept_service_data.map((item,i)=>
            <Card key={i}
            opacity={noSelection? 1: clickOn.serv_id === item.serv_id? 1:0.4}
            onClick={()=>{
                if (!singleOperation) return;
                if(config.features.queue){if(!isALoading)onClickQ(item)}
                if(config.features.appointment){if(!isQLoading)onClickA(item)}
            }}>
                <Container padding='0 0 12px'>
                    <Text margin='8px 16px 0' weight='bold' mcolor={theme&&theme.primary}>{item.serv_name}</Text>
                    <Text margin='4px 16px 0' size='10px' opacity={0.8}>In Queue : {item.serv_total_wait} | Serving : {item.serv_current_serving!==''?item.serv_current_serving:'-'}</Text>
                </Container>
                <Container direction='row' justify='flex-end' padding='0 8px'>
                {
                    !singleOperation&&<>
                    <Action mcolor='limegreen' onClick={()=>{if(!isQLoading)onClickA(item)}}>BOOKING</Action>
                    <Action mcolor='dodgerblue' onClick={()=>{if(!isALoading)onClickQ(item)}}>GET QUEUE</Action>

                    </>
                }
                </Container>
            </Card>
            )
        }
        </Container>
        {/*<BottomBar />*/}
        <Background opacity={0.3}/>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </>
    //////////////////////////////////////////////////////////////////////////// END
}

export default Component;
