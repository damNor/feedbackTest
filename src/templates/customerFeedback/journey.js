import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import {selectService,setTimeslots,setTab} from './../../data/actions'
import TextField from '@material-ui/core/TextField'
import ReCAPTCHA from 'react-google-recaptcha'
import {FaWhatsapp,FaSms,FaQrcode} from 'react-icons/fa'
import Cookies from 'universal-cookie'
import styled from 'styled-components'
import Loader from './loader'
import moment from 'moment'

import Container,{Content,Card,BlackOut} from './../../components/container'
import Transaction from './../../components/transaction'
import Background from './../../components/background'
import BottomBar from './../../componentsv2/bottombar'
import Language from './../../components/language'
import Loading from './../../components/loading'
import Button from './../../components/button'
import Ticket from './../../components/ticket'
import Error from './../../components/error'
import Logo from './../../components/logo'
import Text from './../../components/text'

const Component = () => {
    const {id,qr}   = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const cookies   = new Cookies()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = lbl => languages&&languages[lbl]?languages[lbl][lang]:""

    const [queue,setQueue]      = useState({})
    const [trans,setTrans]      = useState([])
    const [loading,toggle]      = useState(false)
    const [invalid,setInvalid]  = useState(false)
    const [show,setShow]        = useState(false)
    const [phone,setPhone]      = useState('')
    const [submit,setSubmit]    = useState(false)
    const [error,setError]      = useState()

    useEffect(()=>{
        if(qr === undefined) return;
        if(Object.keys(config) == 0) return;

        dispatch(setTab('journey'))
        start()
        return ()=>{
            console.log('stop journey');
            clearInterval(cookies.get('jtimer'))
            cookies.remove('jtimer')
        }
    },[qr,config])

    const conf = {path:"/",expires:moment().add(1,'days').toDate()}
    const start = async () =>{
        toggle(true)
        const response = await getQueueStatus(config.server,'','','','',qr)
        console.log('queue',response);
        toggle(false)

        if(response.error){ setInvalid(true); return;}
        cookies.set('qr',qr,conf)
        setQueue(response)
        monitorQNumber(response)

        if (response.status === 2) return;
        const mtimer = setInterval(()=>monitorQNumber(response),10000)
        cookies.set('jtimer',mtimer,conf)
    }

    const monitorQNumber = async (response) =>{
        if(Object.keys(config) == 0) return;

        const status = await getQueueStatus(config.server,'','','','',qr);
        console.log("queue",status);
        if(!response.error) setQueue(status)

        const transaction = await getQueueTransaction(config.server,response.mid,response.dept_id,response.queue_number);
        console.log("trans",transaction)
        if(!transaction.error) setTrans(transaction)
    }

    const onSubmit = async () =>{
        setSubmit(true)
        const customer = {phone:phone,queue:queue.queue_number};
        const response = await updateCustInfo(config.server,lang,queue.mid,queue.dept_id,queue.serv_id,customer);
        setShow(false)
        setError(response.error? 'Failed to update : '+response.error : 'Updated!')
    }


    return <Loader>
    <Content>
        <div style={{display:'flex',background:theme&&theme.primarylight,alignItems:'center',alignSelf:'stretch'}}>
            <Logo width='200px' margin='16px'/>
            <div style={{flex:1}}/>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:16}}>
                <Text size='40px' weight='bold' mcolor={theme&&theme.primary}>{queue.queue_number}</Text>
                <Text size='12px'>Attending {queue.serv_current_serving==''?'-':queue.serv_current_serving}</Text>
            </div>
        </div>
        <div style={{alignSelf:'stretch',margin:'0 0 16px',height:5,background:theme&&theme.primary}}/>
        {/*
            [
                ...trans.filter(i=>i.state == 2).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                ...trans.filter(i=>i.state == 1).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                ...trans.filter(i=>!(i.state == 1 || i.state==2)).sort((i,j)=>i.stage>j.stage?1:-1  || i.time_msec_done>j.time_msec_done?1:-1).reverse()
            ]
            .map((item,i)=><Transaction key={i} transaction={item}/>)
        */}
        {
            trans.map((item,i)=><Transaction key={i} transaction={item}/>)
        }
        <div style={{minHeight:40}}/>

        {/*  SHOW WHEN INVALID  */}
        <BlackOut display={invalid?'flex':'none'}>
            <Card width='200px' align='center' justify='center' padding='16px' direction='column'>
                <FaQrcode style={{width:24,height:24,margin:'0 0 12px'}}/>
                <Text size='14px' margin='0 16px'>Invalid QR Code</Text>
            </Card>
        </BlackOut>

        {/*  SHOW DURING LOADING  */}
        <BlackOut display={loading?'flex':'none'}>
            <Card width='200px' align='center' justify='center' padding='12px'>
                <Loading/>
                <Text size='14px' margin='0 16px'>Loading...</Text>
            </Card>
        </BlackOut>
    </Content>
    <BottomBar/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

export default Component;
