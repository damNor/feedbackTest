import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchTimeslots} from './../../data/api/timeslots'
import {setConfig,selectLanguage,selectService,setTimeslots} from './../../data/actions'
import {readConfig,getQueueStatus,getQueueTransaction} from './../../data/api'
import styled from 'styled-components'
import {VERSION} from './'
import ReCAPTCHA from "react-google-recaptcha";
import QRCode from "react-qr-code";
import Moment from 'react-moment';
import moment from 'moment'


////////////////////////////////////////////////////////////////////////////////
import InvalidID from './invalidID'
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Input from './../../components/input'
import Loading from './../../components/loading'
import Whatsapp from './../../resources/whatsapp.png'
import Sms from './../../resources/sms.png'
import Queuebee from './../../resources/queuebee.png'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id,qr}    = useParams()
    const config     = useSelector(state=>state.config)
    const theme      = useSelector(state=>state.config.theme)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages  = useSelector(state=>state.config.languages)
    const [loadCfg,setLoad]     = useState(false);
    const [loadQ,setLoadQ]      = useState('load');  // load || success || failed
    const [isValid,setValid]    = useState(false);
    const [queue,setQueue]      = useState({})
    const [trans,setTrans]      = useState([]);
    const [waUrl,setWaUrl]      = useState('')
    const [tab,setTab]          = useState(0)
    const [timer,setTimer]      = useState()
    const [calling,setCalling]  = useState('')

    //////////////////////////////////////////////////////////////////////////// styles
    const Card = styled.div`
        width           : 350px;
        background      : white;
        padding         : 16px;
        border-radius   : 4px;
        box-shadow      : 0px 3px 3px 0px rgba(156,156,156,0.7);
    `
    const Divider = styled.div`
        width       : 100%;
        height      : 1px;
        background  : rgba(0,0,0,0.1);
    `
    const DoneIcon  = styled.div`
        width           : 20px;
        height          : 20px;
        background      : #A9A9A9;
        border-radius   : 50%;
        color           : white;
        font-size       : 12px;
        margin          : 0 8px 0 0;
        display         : flex;
        align-items     : center;
        justify-content : center;
    `


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        let timer;
        if(Object.keys(config) == 0){
            readConfig(id,()=>setLoad(true),async (res)=>{
                console.log(res);
                setLoad(false);
                if(Object.keys(res) == 0) return;
                setValid(true)
                dispatch(setConfig(res));
                dispatch(selectLanguage(res.languageSelection[0]))
            })
        }else setValid(true);
        return ()=>clearInterval(timer)
    },[config])


    useEffect(async ()=>{
        if(qr === undefined) return;
        if(Object.keys(config) == 0) return;

        console.log('getqbyqr => '+qr);
        setLoadQ('load')
        const response = await getQueueStatus(config.server,'','','','',qr);
        console.log(response);
        let timerId;
        if(response.error){
            setLoadQ('failed')
        }else{
            setLoadQ('success')
            setQueue(response);
            setWaUrl(response.wa_url);
            monitorQNumber(response)
            if(response.status === 2) return;
            timerId = setInterval(()=>monitorQNumber(response),10000)
            setTimer(timerId);
        }
        return ()=> clearInterval(timerId)
    },[config,qr])

    useEffect(()=>{
        return () => clearInterval(timer)
    },[])


    //////////////////////////////////////////////////////////////////////////// functions
    const getQueueLocal = () => {
        try{
            let queue = localStorage.getItem('queue');
            setQueue(JSON.parse(queue))
        }catch(e){}
    }

    const monitorQNumber = async(response)=>{
        if(Object.keys(config) == 0) return;
        const status = await getQueueStatus(config.server,response.mid,response.dept_id,response.cust_id,response.queue_number);
        console.log("qstatus",status);
        if(response.error){
        }else{
            setQueue(status)
            setCalling(
                status.status === 0? languages.q_waiting[lang]:
                status.status === 1? status.wstt_name+' '+languages.q_calling[lang]:
                status.status === 2? languages.q_done[lang]:'')
        }

        const transaction = await getQueueTransaction(config.server,response.mid,response.dept_id,response.queue_number);
        console.log("qtransaction",transaction);
        if(!transaction.error)setTrans(transaction)
    }


    //////////////////////////////////////////////////////////////////////////// common components
    const OtherChannel = ({icon,label,onClick=()=>{}}) =>{
        const DContainer = styled.div`
            background      : white;
            width           : 48%;
            padding         : 12px 16px;
            margin          : 0 0 16px;
            display         : flex;
            align-items     : center;
            border-radius   : 4px;
            box-shadow      : 0px 3px 3px 0px rgba(156,156,156,0.7);
            cursor          : pointer;
        `
        return <DContainer onClick={onClick}>
            <img src={icon} style={{width:37,height:37,margin:'0 16px 0 0'}}/>
            <Text size='13px' mColor='#9E9E9E' textalign='left'>{label}</Text>
        </DContainer>
    }

    const Infos = ({label,value,children}) => <Container align='center' flex={1}>
        <Text size='12px' mColor='#4AC1E0'>{label}</Text>
        <Text size='18px' margin='8px 0 0'>{value}{children}</Text>
    </Container>

    const Journey = () => <Container>
    journey
    </Container>


    //////////////////////////////////////////////////////////////////////////// define UI
    return loadCfg? <div>Loading...</div>:
    !isValid? <InvalidID />:
    <Container background='white' flex={1}>
        {
            loadQ === 'load' ? <div>Loading...</div>:
            loadQ === 'failed' ? <div>Invalid QR Code</div>:
            loadQ === 'success' ? <>
            <Container height='100vh' width='100%' align='center' background='whitesmoke'>
                <Container background={theme&&theme.primary} width='100%' direction='row'>
                    <Container flex={1} align='center' color={tab===0?'white':'rgba(255,255,255,0.5)'} padding='12px 16px' onClick={()=>setTab(0)}>QUEUE</Container>
                    <Container flex={1} align='center' color={tab===1?'white':'rgba(255,255,255,0.5)'} padding='12px 16px' onClick={()=>setTab(1)}>JOURNEY</Container>
                </Container>
                {
                    tab === 0?<>
                        <Text margin='32px'>{calling}</Text>
                        <Card >
                            <img src={`config/${id}/images/logo.png`} style={{width:200,margin:16}} />
                            <Text weight='bold' mColor='#474747'>{queue.serv_name??''}</Text>
                            <Text weight='bold' mColor='#474747' size='70px'>{queue.queue_number??''}</Text>
                            <Container padding='16px' align='center'>
                                <QRCode width='134px' value={qr??''} size={134}/>
                            </Container>
                            <Divider />
                            <Container direction='row' padding='16px 0 0'>
                            {
                                queue.status !== 2 ? <>
                                    <Infos label={'Serving Now'}    value={queue.serv_current_serving??''} />
                                    <Infos label={'Position'}       value={queue.wait_position??'-'} />
                                    <Infos label={'Est call time'}> <Moment date={moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m')} format="hh:mm a"/></Infos>
                                </> : <>
                                    <Infos label={'Attended By'}    value={queue.wait_position??'-'} />
                                    <Infos label={'Call Time'}>     <Moment date={queue.time_msec_call} format="hh:mm a" /></Infos>
                                </>
                            }
                            </Container>
                        </Card>
                        <Container width='350px' direction='row' wrap='wrap' justify='center' padding='32px 0'>
                            {(waUrl !== '' && config.features && config.features.whatsapp)&& <OtherChannel icon={Whatsapp} label={'Whatsapp Alert'} onClick={()=>window.open(waUrl, '_blank')}/>}
                        </Container>
                    </>:
                    tab === 1?<Container overflowy='auto' width='100%'>
                        <Container background='#F6EEEE' direction='row' width='100%' align='center' margin='0 0 16px'>
                            <img src={`config/${id}/images/logo.png`} style={{width:125,margin:16}} />
                            <div style={{flex:1}} />
                            <Container align='center' margin='16px'>
                                <Text weight='bold' mColor='#000000' size='35px'>{queue.queue_number??''}</Text>
                                <Text weight='bold' mColor='#000000' size='12px'>Attending:{queue.serv_current_serving??''}</Text>
                            </Container>
                        </Container>
                        {
                            trans.length===0?'':
                            trans.map((item,i)=><Container
                                key={i}
                                width='stretch'
                                maxwidth='600px'
                                direction='row'
                                opacity={
                                    item.state_text === 'done' ||
                                    item.state_text === 'missed' ||
                                    item.state_text === 'transferred' ? 0.5:1
                                }>
                                <Container padding='16px' width='120px'>
                                    <Text size='16px' margin='0 0 4px 0' bold>
                                        <Moment format='hh:mm A'>{item.time_msec_issue}</Moment>
                                    </Text>
                                    <Text>{item.state_text.charAt(0).toUpperCase() + item.state_text.slice(1)}</Text>
                                </Container>
                                <Container alignself='stretch' align='center'>
                                    <div style={{width:12,height:12,border:'3px solid black',borderRadius:'50%'}} />
                                    <div style={{width:4,flex:1,background:'#00AA44'}} />
                                </Container>
                                <Container alignself='stretch' padding='16px' flex={1}>
                                    <Text margin='0 0 4px 0'  bold>{item.dept_name}</Text>
                                    <Text >{item.serv_name}</Text>
                                    <Container margin='0px 0' align='center' wrap='wrap' direction='row'>
                                        <Container direction='row' center='true'>
                                            <DoneIcon>CT</DoneIcon>
                                            <Text size='16px' margin='8px 24px 8px 0' bold>
                                                <Moment format='hh:mm A'>{item.time_msec_call}</Moment>
                                            </Text>
                                        </Container>
                                        <Container direction='row' center='true'>
                                            <DoneIcon>DT</DoneIcon>
                                            <Text size='16px' margin='8px 24px 8px 0' bold>
                                                <Moment format='hh:mm A'>{item.time_msec_done}</Moment>
                                            </Text>
                                        </Container>
                                        {
                                            item.user_name === ''?'':<Container direction='row' center='monitorQNumber'>
                                                <img style={{width:16,height:16}} src='./icons/person.png' />
                                                <Text size='16px' margin='8px 16px'>{item.user_name + " ("+ item.wstt_name+")"}</Text>
                                            </Container>
                                        }
                                    </Container>
                                </Container>
                            </Container>)
                        }
                    </Container>:''
                }
                <Container flex={1} />
                <Container background='red' width='100%' height='5px'/>
            </Container>
            </>:''
        }
    </Container>


    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
