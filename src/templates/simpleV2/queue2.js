import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchTimeslots} from './../../data/api/timeslots'
import {setConfig,selectLanguage,selectService,setTimeslots} from './../../data/actions'
import {readConfig,getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import styled from 'styled-components'
import {VERSION} from './'
import ReCAPTCHA from "react-google-recaptcha";
import QRCode from "react-qr-code";
import Moment from 'react-moment';
import moment from 'moment'
import {FaBars,FaWhatsapp,FaSms,FaDesktop,FaUserFriends,FaRegClock,FaUserTie} from 'react-icons/fa';
import {GrayoutBg,TextIcon} from  './../../components/style'
import {colorShade} from './../../components/utils'
import TextField from '@material-ui/core/TextField'

////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
import Container,{BlackOut} from './../../components/container'
import Loading from './../../components/loading'
import Dialog from './../../components/dialog'
import Button from './../../components/button'
import Input from './../../components/input'
import Error from './../../components/error'
import Logo from './../../components/logo'
import Text from './../../components/text'

import Queuebee from './../../resources/queuebee.png'
import Whatsapp from './../../resources/whatsapp.png'
import Person from './../../resources/personal.png'
import Sms from './../../resources/sms.png'

////////////////////////////////////////////////////////////////////////////////
const Card = styled.div`
    border          : ${p=>p.border??'1px solid rgba(0, 0, 0, 0.2)'};
    background      : ${p=>p.background??'white'};
    margin          : ${p=>p.margin??'0 0 4px'};
    padding         : ${p=>p.padding??'16px'};
    display         : ${p=>p.display};
    color           : ${p=>p.color};
    box-sizing      : ${p=>p.sizing??'border-box'};
    justify-content : center;
    width           : 320px;
    border-radius   : 5px;
    z-index         : 1;
`

//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id,qr}    = useParams()
    const config     = useSelector(state=>state.config)
    const theme      = useSelector(state=>state.config.theme)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages  = useSelector(state=>state.config.languages)
    const [loadCfg,setLoad]     = useState(false)
    const [loadQ,setLoadQ]      = useState('load')
    const [isValid,setValid]    = useState(false)
    const [queue,setQueue]      = useState({})
    const [trans,setTrans]      = useState([])

    const [dialog,showDialog]   = useState(false)
    const [submit,setSubmit]    = useState(false)
    const [phone,setPhone]      = useState('')
    const [error,setError]      = useState()

    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config) == 0){
            readConfig(id,()=>setLoad(true),async (res)=>{
                console.log('config',res);
                setLoad(false);
                if(Object.keys(res) == 0) {setLoadQ('failed'); return;}
                setValid(true)
                dispatch(setConfig(res));
                dispatch(selectLanguage(res.languageSelection[0]))
            })
        }else setValid(true);
    },[config])


    useEffect(async ()=>{
        if(qr === undefined) return;
        if(Object.keys(config) == 0) return;

        console.log('qstatusqr',qr);
        setLoadQ('load')
        const response = await getQueueStatus(config.server,'','','','',qr);
        console.log('qstatusqr',response);
        if(response.error) setLoadQ('failed')
        else{
            setLoadQ('success')
            setQueue(response);
            monitorQNumber(response)
            if(response.status === 2) return;
            const mtimer = setInterval(()=>{
                if(!window.location.hash.includes('/q/')) clearInterval(mtimer);
                else monitorQNumber(response)
            },10000)
        }
    },[config,qr])


    //////////////////////////////////////////////////////////////////////////// functions
    const monitorQNumber = async(response)=>{
        if(Object.keys(config) == 0) return;
        const status = await getQueueStatus(config.server,response.mid,response.dept_id,response.cust_id,response.queue_number);
        console.log("qstatus",status);
        if(!response.error) setQueue(status)

        const transaction = await getQueueTransaction(config.server,response.mid,response.dept_id,response.queue_number);
        console.log("qtransaction",transaction)
        if(!transaction.error) setTrans(transaction)
    }

    const onSubmit = async () =>{
        setSubmit(true)
        const customer = {phone:phone,queue:queue.queue_number};
        const response = await updateCustInfo(config.server,lang,queue.mid,queue.dept_id,queue.serv_id,customer);
        setSubmit(false)
        showDialog(false)
        setError(response.error? 'Failed to update : '+response.error : 'Updated!')
    }

    //////////////////////////////////////////////////////////////////////////// common components

    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
        <Container background='whitesmoke' flex={1} overflowy='auto' align='center'>
            <Container height='150px' background={theme&&theme.btnprimary} position='absolute' left={0} right={0}/>
            <div style={{display:'flex',width:'100%',alignItems:'center',zIndex:0,color:theme&&theme.btnprimarytext}}>
                <FaBars style={{margin:16}}/>
                <div style={{fontWeight:'bold',margin:8}}>MY QUEUE</div>
            </div>
            <div style={{minHeight:40}}/>
            <Card>
                <Logo width='200px' margin='0 0 16px'/>
                <Text textalign='center' weight='bold'>{queue.serv_name??'-'}</Text>
                <Text textalign='center' weight='bold' size='48px' margin='0 0 16px'>{queue.queue_number??'----'}</Text>
                <QRCode width='134px' value={qr} size={120}/>
            </Card>
            <Card>
            {
                queue.status === 0? languages.q_waiting[lang]:
                queue.status === 1? queue.wstt_name+' '+languages.q_calling[lang]:
                queue.status === 2? languages.q_done[lang]:''
            }
            </Card>
            <Card>
            {
                queue.status !== 2 ? <>
                <Text margin="5px 0" size='13px' icon={<FaDesktop/>} >Attending {queue.serv_current_serving}</Text>
                <Text margin="5px 0" size='13px' icon={<FaUserFriends/>}>Current position {queue.wait_position}</Text>
                <Text margin="5px 0" size='13px' icon={<FaRegClock/>}>ETA {moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')}</Text> </>:<>
                <Text margin="5px 0" size='13px' icon={<FaUserTie/>}  opacity={0.8}>Attended by {queue.user_name}</Text>
                <Text margin="5px 0" size='13px' icon={<FaRegClock/>} opacity={0.8}>Call Time {moment(queue.time_msec_call).format('hh:mm A')}</Text> </>
            }
            </Card>
            {
                config.features && config.features.whatsapp && queue.wa_url !== undefined && queue.wa_url !== '' &&
                <Card background='#25D366' border='1px solid #25D366' display='flex' onClick={()=>window.open(queue.wa_url, '_blank')}>
                    <FaWhatsapp style={{width:20, height:20,color:'white'}} /> <div style={{margin:'0 16px',color:'white'}}>WHATSAPP UPDATE</div>
                </Card>
            }
            {
                config.features && config.features.sms &&
                <Card background='#00B2FF' border='1px solid #00B2FF' display='flex' onClick={()=>showDialog(true)}>
                    <FaSms style={{width:20, height:20, color:'white'}} /> <div style={{margin:'0 16px',color:'white'}}>SMS UPDATE</div>
                </Card>
            }
            {
                trans.length > 0 &&
                <Card padding="0" sizing='content-box'>
                    <div style={{background:theme&&theme.btnprimary,color:theme.btnprimarytext,padding:16,borderRadius:'5px 5px 0 0',margin:'0 0 12px'}}>Transactions ({trans.length})</div>
                    {/*
                        [
                            ...trans.filter(i=>i.state == 2).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                            ...trans.filter(i=>i.state == 1).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                            ...trans.filter(i=>!(i.state == 1 || i.state==2)).sort((i,j)=>i.stage>j.stage?1:-1  || i.time_msec_done>j.time_msec_done?1:-1).reverse()
                        ]
                        .map((item,i,arr)=><Transaction key={i} item={item} isLast={arr.length-1 == i} isWait={item.state==1||item.state==2}/>)
                    */}
                    {
                        trans.map((item,i,arr)=><Transaction key={i} item={item} isLast={arr.length-1 == i} isWait={item.state==1||item.state==2}/>)
                    }
                </Card>
            }
            <div style={{minHeight:16}}/>
        </Container>

        {/*  SHOW PHONE DIALOG  */}
        <BlackOut display={dialog?'flex':'none'}>
            <Card width='300px' direction='column'>
                <Text weight='bold' alignself='flex-start' margin='16px 16px 12px'>Enter Details</Text>
                <div style={{alignSelf:'stretch',padding:'0  16px'}}>
                    <TextField fullWidth placeholder='Phone Number' value={phone} onChange={e=>setPhone(e.target.value)}/>
                </div>
                <div style={{alignSelf:'stretch',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                    <div style={{width:85,padding:16,color:'darkgray',fontWeight:'bold'}} onClick={()=>showDialog(false)}>CANCEL</div>
                    {
                        submit?
                        <div style={{width:85,display:'flex',justifyContent:'center'}}><Loading size='14px'/></div>:
                        <div style={{width:85,padding:16,color:'dodgerblue',fontWeight:'bold'}} onClick={onSubmit}>SUBMIT</div>
                    }
                </div>
            </Card>
        </BlackOut>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />


    </>
    //////////////////////////////////////////////////////////////////////////// End
}

const Label = styled.div`
    background      : ${p=>p.bg};
    color           : ${p=>p.mcolor};
    border-radius   : 5px;
    padding         : 4px;
    width           : 80px;
    text-align      : center;
    margin          : 0 0 4px;
    font-size       : 12px;
`
const DetailIcon = styled.div`
    font-size       : 10px;
    width           : 16px;
    height          : 16px;
    background      : rgba(0,0,0,0.5);
    color           : white;
    padding         : 1px;
    border-radius   : 50%;
    display         : flex;
    align-items     : center;
    justify-content : center;
`

const Transaction = ({item,isLast,isWait}) => {
    const theme = useSelector(state=>state.config.theme)
    return <Container direction='row' margin={isLast&&'0 0 16px'} opacity={isWait?1:0.3}>
        <div style={{padding:'16px 8px',textAlign:'left'}}>
            <Label bg={theme&&theme.btnprimary} mcolor={theme&&theme.btnprimarytext}>{moment(item.time_msec_issue).format('h:mm A')}</Label>
            <Text size='12px' margin='0 0 2px'>{item.stage!==0&&`Stage ${item.stage}`}</Text> 
            <div style={{fontSize:12,textTransform:'capitalize'}}>{item.state_text}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignSelf:'stretch',alignItems:'center'}}>
            <div style={{width:8,height:8,borderRadius:'50%',border:'1px solid black',borderWidth:4}}/>
            <div style={{width:4,background:'rgba(0,0,0,0.5)',flex:1}}/>
            <div style={{width:8,height:8,borderRadius:'50%',border:'1px solid black',borderWidth:4,display:isLast?'block':'none'}}/>
        </div>
        <div style={{padding:'16px 8px'}}>
            <Text weight='bold' margin='0 0 4px'>{item.dept_name}</Text>
            <Text size='12px' margin='0 0 16px' opacity={0.8}>{item.serv_name}</Text>

            {<Text size='12px' margin='0 0 4px' icon={<DetailIcon>CT</DetailIcon>} opacity={0.8}>{moment(item.time_msec_call).format('h:mm A')}</Text>}
            {<Text size='12px' margin='0 0 4px' icon={<DetailIcon>DT</DetailIcon>} opacity={0.8}>{moment(item.time_msec_done).format('h:mm A')}</Text>}
            {item.user_name && <Text size='12px' margin='0 0 4px' icon={<FaUserTie style={{width:18,height:18}}/>} opacity={0.8}>{item.user_name + " ("+ item.wstt_name+")"}</Text>}
        </div>
    </Container>
}

export default Component;
