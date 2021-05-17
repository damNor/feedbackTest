import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices} from './../../data/api'
import {setTab} from './../../data/actions'
import styled from 'styled-components'
import {FaMapMarkerAlt} from 'react-icons/fa'
import { IoMdClose } from "react-icons/io"
import QRCode from 'react-qr-code'
import moment from 'moment'

import Container,{Content,Card,BlackOut} from './../../componentsv2/container'
import Background from './../../componentsv2/background'
import BottomBar from './../../componentsv2/bottombar'
import Loading from './../../componentsv2/loading'
import Loader from './../../componentsv2/loader'
import Button from './../../componentsv2/button'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = l => languages&&languages[l]?languages[l][lang]:""

    const history   = localStorage.getItem('booking')

    const [selected,setSelected] = useState({})
    const [apmts,setApmts]       = useState([])
    const [loading,toggle]       = useState(false)
    const [error,setError]       = useState()

    useEffect(()=>{
        try{
            dispatch(setTab('appointment'))
            const appointments = JSON.parse(history)
            setApmts(appointments)
            console.log(appointments);
        }catch(e){

        }
    },[history])

    const Appointment = ({item}) => <Card
        padding='8px 16px' margin='0 0 8px 0'
        onClick={()=>setSelected(item)}
        >
        <Container flex={1}>
            <Text size='36px' opacity={0.8} weight='bold' margin='0 0 4px' isPrimary>{item.apmt_code}</Text>
            <Text size='13px' opacity={0.6}>{item.branch_name}</Text>
            <Text size='12px' opacity={0.5}>-</Text>
            <Container direction='row' opacity={0.5} margin='4px 0 0'>
                <Text size='12px' margin='0 16px 0 0'>{moment(item.apmt_date).format('d/MM/yyyy')}</Text>
                <Text size='12px'>{item.apmt_time}</Text>
            </Container>
        </Container>
        <div style={{width:1,height:70,background:'rgba(0,0,0,0.2)',margin:'0 16px'}}/>
        <QRCode value={item.apmt_code} size={70}/>
    </Card>


    return <Loader>
    <Content>
        <Logo margin='16px'/>
        <Text margin='0 0 16px' opacity={0.7} size='13px' width='320px'>Appointments</Text>
        {
            apmts && apmts.length > 0?
            apmts.map((item,i)=><Appointment key={i} item={item} />) :
            'You have no appointment!'
        }

        <BlackOut display={Object.keys(selected).length === 0?'none':'flex'} onClick={()=>setSelected({})}>
            <Card width='320px' align='center' justify='center' padding='18px 16px' direction='column'>
                <IoMdClose style={{alignSelf:'flex-end'}}/>
                <QRCode value={selected.apmt_code??'invalid'} size={180}/>
                <Text size='8px' opacity={0.5} margin='12px 0 0'>Scan QR at terminal to check in</Text>
                <Text size='36px' opacity={0.8} weight='bold' margin='16px' isPrimary>{selected.apmt_code}</Text>
                <Text size='14px' opacity={0.8} weight='bold' margin='0 0 4px'>{selected.branch_name}</Text>
                <Text size='13px' opacity={0.8}>Service</Text>
                <Container direction='row' opacity={0.5} margin='4px 0 12px'>
                    <Text size='13px' margin='0 16px 0 0'>{moment(selected.apmt_date).format('d/MM/yyyy')}</Text>
                    <Text size='13px'>{selected.apmt_time}</Text>
                </Container>
                {/*<Button label='CANCEL APPOINTMENT' width='250px' isPrimary/>*/}


            </Card>
        </BlackOut>

    </Content>
    <Background/>
    <BottomBar/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

export default Component;
