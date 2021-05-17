import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchTimeslots} from './../../data/api/timeslots'
import {setConfig,selectLanguage,selectService,setTimeslots} from './../../data/actions'
import {readConfig,getQueueStatus,updateCustInfo} from './../../data/api'
import styled from 'styled-components'
import {VERSION,CONFIG_PATH} from './'
import ReCAPTCHA from "react-google-recaptcha";
import QRCode from "react-qr-code";
import Moment from 'react-moment';
import moment from 'moment'
import {GrayoutBg,TextIcon} from  './../../components/style'
import Dialog from './../../components/dialog'
import Helmet from "react-helmet";

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
const Component = () => 
{
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id,qr}    = useParams()
    const config     = useSelector(state=>state.config)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages  = useSelector(state=>state.config.languages)
    const [loadCfg,setLoad]     = useState(false);
    const [loadQ,setLoadQ]      = useState('load');  // load || success || failed
    const [isValid,setValid]    = useState(false);
    const [queue,setQueue]      = useState({})
    const [waUrl,setWaUrl]      = useState('')
    const [tab,setTab]          = useState(0)
    const [timer,setTimer]      = useState()
    const [calling,setCalling]  = useState('')
    const [dialog, showDialog]  = useState('false')
    const [submit,setSubmit]    = useState(false)
    const [phone,setPhone]      = useState('')
    const [error,setError]      = useState('')

    //////////////////////////////////////////////////////////////////////////// styles
    const Card = styled.div`
        width           : 350px;
        background      : white;
        padding         : 16px;
        border-radius   : 4px;
        box-shadow      : 0px 3px 3px 0px rgba(156,156,156,0.7);
    `
    const Divider = styled.div`
        width       :100%;
        height      :1px;
        background  :rgba(0,0,0,0.1);
    `


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>
    {
        let timer;
        
        // console.log('timer ', timer);
        
        if(Object.keys(config) == 0)
        {
            readConfig(id,()=> setLoad(true), async (res)=>
            {
                
                console.log('readConfig ',res);

                setLoad(false);
                if(Object.keys(res) == 0) 
                    return;
                    
                setValid(true)
                dispatch(setConfig(res));
                dispatch(selectLanguage(res.languageSelection[0]))

                /*    
                //Start
                const qrstatus = await getQueueStatus(res.server,'','','','',qr);
                console.log(qrstatus);
                if(qrstatus.error) setLoadQ('failed')
                else{
                    setLoadQ('success')
                    setQueue(qrstatus)
                    setWaUrl(qrstatus.wa_url)
                    const monitoring = async () =>{
                        const qstatus = await getQueueStatus(res.server,qrstatus.mid,qrstatus.dept_id,qrstatus.cust_id,qrstatus.queue_number);
                        console.log(qstatus);
                        if(!qstatus.error){
                            setQueue(qstatus)
                            setCalling(
                                qstatus.status === 0? languages.q_waiting[lang]:
                                qstatus.status === 1? qstatus.wstt_name+' '+languages.q_calling[lang]:
                                qstatus.status === 2? (languages && languages.q_done[lang]):''
                            )
                        }
                    }
                    monitoring();
                    if(qrstatus.status === 2) return;
                    timer = setInterval(()=>monitoring(),10000);
                } 
                */
            })
        }
        else 
            setValid(true);

        return ()=>clearInterval(timer)
    },[config])

    console.log('timer ', timer);

    useEffect(async () =>
    {
        if(qr === undefined) 
            return;
        
            if(Object.keys(config) == 0) 
            return;
        console.log('id ' + id);
        console.log('get q by qr => ' + qr);
        
        setLoadQ('load') // loading flag
        const response = await getQueueStatus(config.server,'','','','',qr);
        
        console.log('response ', response);
        
        let timerId;
        if(response.error)
        {
            setLoadQ('failed') // loading flag
        }
        else
        {
            setLoadQ('success') // loading flag
            setQueue(response);
            setWaUrl(response.wa_url);

            console.log('monitorQNumber 1 ');
            
            monitorQNumber(response)

            if(response.status === 2) 
                return;
            
            timerId = setInterval( () => monitorQNumber(response) ,20000 )// request every 20 second
            
            console.log('monitorQNumber 2 ');
            
            setTimer(timerId);

            console.log('timerId ',timerId);
        }
        return ()=> clearInterval(timerId)
    },[config,qr])

    

    useEffect(()=>
    {
        return () => clearInterval(timer)
    },[])


    //////////////////////////////////////////////////////////////////////////// functions
    const getQueueLocal = () => {
        try{
            let queue = localStorage.getItem('queue');
            setQueue(JSON.parse(queue))
        }catch(e){}
    }

    const monitorQNumber = async (response)=>
    {
        console.log('monitorQNumber');

        if(Object.keys(config) == 0) 
            return;
            
        const status = await getQueueStatus(config.server,response.mid,response.dept_id,response.cust_id,response.queue_number);
        
        if(response.error){
            console.log('response.error',response.error);
        }
        else
        {
            console.log('queue status ',status);
            setQueue(status)
                
            setCalling(
                status.status === 0 ? languages.q_waiting[lang]:
                status.status === 1 ? status.wstt_name+' '+languages.q_calling[lang]:
                status.status === 2 ? languages.q_done[lang]:''
                )
        }
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

    const CustomInput = styled.input`
        border  : 1px solid rgba(0,0,0,0.2);
        padding : 8px 16px;
        margin  : 8px 0px;
        width   : fill-available;
    `
    const onSubmitPhone = async() =>
    {
        setSubmit(true)
        const customer = { phone:phone, queue:queue.queue_number }
        const response = await updateCustInfo(  config.server,
                                                lang,queue.mid,
                                                queue.dept_id,
                                                queue.serv_id,
                                                customer
                                            );
        console.log("update",response);
        setSubmit(false)
        showDialog(false)
        setError(response.error? 'Failed to Update : ' + response.error : 'Updated!')
    }
    const Infos = ({label,value,children}) => <Container align='center' flex={1}>
        <Text size='12px' mColor='#4AC1E0'>{label}</Text>
        <Text size='18px' margin='8px 0 0'>{value}{children}</Text>
    </Container>

    console.log('isValid ',isValid);
    //////////////////////////////////////////////////////////////////////////// define UI
    return loadCfg? <div>Loading...</div>:
    
    !isValid? <InvalidID /> :
    <>
    <Helmet>
        <title>Queue Page</title>
    </Helmet>
    <Container flex={1} background='white'>

        {   dialog && <GrayoutBg>
                <Dialog
                    title={'Receive SMS Notification'}
                    body={
                            <>
                                <div>Phone</div>
                                <CustomInput 
                                    key={'myinput'} 
                                    type="number" 
                                    value={phone} 
                                    onChange={(e)=> setPhone(e.target.value)} 
                                    autoFocus />
                            </>
                        }
                    loading={submit}
                    onClick={onSubmitPhone}
                    onCancel={()=>showDialog(false)} />
                </GrayoutBg>
        }

        {
            loadQ === 'load' ? <div>Loading Ticket...</div>:
            loadQ === 'failed' ? <div>Invalid QR Code</div>:
            loadQ === 'success' ? <>
            <Container flex={1} width='100%' align='center' background='whitesmoke'>
                <Text margin='32px'>{calling}</Text>
                <Card >
                    <img src={CONFIG_PATH + id + "/images/logo.png"} style={{width:200,margin:16}}/>
                    <Text weight='bold' mColor='#474747' textalign>
                        {queue.serv_name ?? ''}
                    </Text>
                    <Text weight='bold' mColor='#474747' size='70px' textalign='center' >
                        {queue.queue_number ?? ''}
                    </Text>
                    <Container padding='16px' align='center'>
                        <QRCode width='134px' value={qr??''} size={134}/>
                    </Container>
                    <Divider />
                    <Container direction='row' padding='16px 0 0'>
                    {
                        queue.status !== 2 ? <>
                            <Infos label={'Serving Now'}    value={queue.serv_current_serving??''} />
                            <Infos label={'Position'}       value={queue.wait_position??'-'} />
                            <Infos label={'Est call time'}> 
                                <Moment date={moment().add(queue.serv_est_wait_time/60, 'm')} format="hh:mm a"/>
                            </Infos>
                        </> : <>
                            <Infos label={'Attended By'}    value={queue.wait_position??'-'} />
                            <Infos label={'Call Time'}>     <Moment date={queue.time_msec_call} format="hh:mm a" /></Infos>
                        </>
                    }
                    </Container>
                </Card>
                <Container width='350px' direction='row' wrap='wrap' justify='center' padding='32px 0'>
                    { 
                        ( waUrl !== '' && config.features && config.features.whatsapp) && 
                        <OtherChannel icon={Whatsapp} label={'Whatsapp Alert'} onClick={()=>window.open(waUrl, '_blank')}/>
                    }
                    {
                       config.features && config.features.sms &&
                       <OtherChannel icon={Sms} label={'SMS Alert'} onClick={()=>showDialog(true)}/> 
                        // <Card background='#00B2FF' display='flex' onClick={()=>showDialog(true)}>
                        //     <FaSms style={{width:20, height:20, color:'white'}} />
                        //     <div style={{margin:'0 16px',color:'white'}}>SMS UPDATE</div>
                        // </Card>
                    }
                </Container>
                <Container flex={1} />
                <Container background='red' width='100%' height='5px'/>
            </Container>
            </>:''
        }
    </Container>
    </>    

    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
