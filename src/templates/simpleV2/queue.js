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

////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
import Container from './../../components/container'
import Loading from './../../components/loading'
import Dialog from './../../components/dialog'
import Button from './../../components/button'
import Input from './../../components/input'
import Error from './../../components/error'
import Logo from './../../components/logo'
import Text from './../../components/text'
import InvalidID from './invalidID'



import Queuebee from './../../resources/queuebee.png'
import Whatsapp from './../../resources/whatsapp.png'
import Person from './../../resources/personal.png'
import Sms from './../../resources/sms.png'


////////////////////////////////////////////////////////////////////////////////
const CustomInput = styled.input`
    border  : 1px solid rgba(0,0,0,0.2);
    padding : 8px 16px;
    margin  : 8px 0px;
    width   : fill-available;
`
const CenterFlex1 = styled.div` flex :1; text-align :center; `
const Card = styled.div`
    background      : ${p=>p.background??'white'};
    border-radius   : 5px;
    width           : 320px;
    padding         : ${p=>p.padding??'16px'};
    box-sizing      : border-box;
    color           : theme&&theme.textdefault;
    margin          : ${p=>p.margin??'0 0 4px'};
    display         : ${p=>p.display};
    justify-content : center;
    z-index         : 1;
    box-shadow      : 0px 0px 2px rgba(0, 0, 0, 0.25);
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
    const [loadCfg,setLoad]     = useState(false);
    const [loadQ,setLoadQ]      = useState('load');  // load || success || failed
    const [isValid,setValid]    = useState(false);
    const [queue,setQueue]      = useState({})
    const [trans,setTrans]      = useState([]);
    const [waUrl,setWaUrl]      = useState('')
    const [tab,setTab]          = useState(0)
    const [calling,setCalling]  = useState('')

    const [dialog,showDialog]   = useState(false)
    const [submit,setSubmit]    = useState(false)
    const [phone,setPhone]      = useState('')
    const [error,setError]      = useState('')


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
            setWaUrl(response.wa_url);
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
        if(!response.error){
            setQueue(status)
            setCalling(
                status.status === 0? languages.q_waiting[lang]:
                status.status === 1? status.wstt_name+' '+languages.q_calling[lang]:
                status.status === 2? languages.q_done[lang]:'')
        }
        const transaction = await getQueueTransaction(config.server,response.mid,response.dept_id,response.queue_number);
        console.log("qtransaction",transaction);
        if(!transaction.error && JSON.stringify(trans) != JSON.stringify(transaction))setTrans(transaction)
    }

    const onSubmitPhone = async() =>{
        setSubmit(true)
        const customer = {phone:phone,queue:queue.queue_number}
        const response = await updateCustInfo(config.server,lang,queue.mid,queue.dept_id,queue.serv_id,customer);
        console.log("update",response);
        setSubmit(false)
        showDialog(false)
        setError(response.error? 'Failed to Update : '+response.error : 'Updated!')
    }


    //////////////////////////////////////////////////////////////////////////// common components


    const TransactionInfo = ({label,value}) => <div style={{display:'flex',alignItems:'center',margin:'0 8px 8px 0'}}>
        <TextIcon>{label}</TextIcon>
        <Moment format='hh:mm A' style={{whiteSpace:'nowrap',fontSize:12,opacity:0.9}}>{value}</Moment>
    </div>

    const Transaction = ({transaction,opacity,lastone}) => <div style={{display:'flex',borderRadius:5,margin:'0 16px',opacity:opacity}}>
        <div style={{width:70,textAlign:'left',margin:'8px 8px 0px 0px',flexShrink: 0}}>
            <Text size='12px' background={theme&&theme.btnprimary} mcolor={theme&&theme.btnprimarytext} padding='4px' textalign='center' borderradius='5px'>
                {moment(transaction.time_msec_issue).format('hh:mm A')}
            </Text>
            <div style={{fontSize:12,margin:'4px 0 4px 8px',textTransform:'capitalize'}}>{transaction.state_text}</div>
            {transaction.stage !=0 && <div style={{fontSize:12,margin:'4px 0 4px 8px',textTransform:'capitalize'}}>Stage {transaction.stage}</div>}
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{width:4,height:4,border:'4px solid rgba(0,0,0,1)',borderRadius:'50%',background:'white'}} />
            <div style={{flex:1,width:3,background:'#00AA44'}} />
            {lastone && <div style={{width:4,height:4,border:'4px solid rgba(0,0,0,1)',borderRadius:'50%',background:'white'}} />}
        </div>
        <div style={{textAlign:'left',margin:'8px 8px'}}>
            <div style={{fontWeight:'bold'}}>{transaction.dept_name}</div>
            <div style={{fontSize:12}}>{transaction.serv_name}</div>
            <div style={{display:'flex',margin:'8px 0 0',flexWrap:'wrap',alignItems:'flex-start'}}>
                <TransactionInfo label={'CT'} value={transaction.time_msec_call} />
                <TransactionInfo label={'DT'} value={transaction.time_msec_done} />
                {
                    transaction.user_name !== '' && <div style={{display:'flex',alignItems:'center'}}>
                        <img style={{width:12,margin:'0 8px 0 0'}} src={Person} />
                        <div style={{fontSize:12,opacity:0.9}}>{transaction.user_name + " ("+ transaction.wstt_name+")"}</div>
                    </div>
                }
            </div>
        </div>
    </div>


    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
        {   loadCfg || loadQ === 'load' && <GrayoutBg>Loading...</GrayoutBg> }
        {   loadQ === 'failed' && <GrayoutBg><Dialog title={'Invalid QR Code'} body={'This Qr code dosent exist is our system'} /></GrayoutBg> }
        {   dialog && <GrayoutBg><Dialog
                title={'Receive SMS Notification'}
                body={<><div>Phone</div><CustomInput key={'myinput'} type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} autoFocus /></>}
                loading={submit}
                onClick={onSubmitPhone}
                onCancel={()=>showDialog(false)} /></GrayoutBg>
        }
        <Container background='whitesmoke' flex={1} overflowy='auto' align='center'>
            <div style={{position:'absolute',width:'100%',height:150,background:theme&&theme.btnprimary,zIndex:0}}/>
            <div style={{display:'flex',width:'100%',alignItems:'center',zIndex:0,color:theme&&theme.btnprimarytext}}>
                <FaBars style={{margin:16}}/>
                {
                    ["MY QUEUE"].map((item,i)=><div key={i}
                    style={{fontWeight:'',margin:8,opacity:tab===i?1:0.5}}
                    onClick={()=>setTab(i)}>
                    {item}</div>)
                }
            </div>
            <Background zIndex={0} height='300px' opacity={0.3}/>

            <Card padding='16px' margin='16px 0 4px' >
                <Logo key={'mylogo'} width='150px' margin='0 0 8px'/>
                <div style={{textAlign:'center',opacity:0.9,fontWeight:'bold'}}>{queue.serv_name??'-'}</div>
                <div style={{fontSize:70,textAlign:'center',margin:'0 0 16px',fontWeight:'500',lineHeight:'70px'}}>{queue.queue_number??'-'}</div>
                <QRCode width='134px' value={qr??''} size={120}/>
            </Card>
            <Card> {calling} </Card>
            <Card>
            {
                queue.status !== 2? <>
                <Text margin="2px 0" icon={<FaDesktop/>} >Attending {queue.serv_current_serving}</Text>
                <Text margin="2px 0" icon={<FaUserFriends/>}>Current position is {queue.wait_position}</Text>
                <Text margin="2px 0" icon={<FaRegClock/>}>ETA {moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')}</Text>
                </>:<>
                <Text margin="2px 0" icon={<FaUserTie/>}>Attended by {queue.user_name}</Text>
                <Text margin="2px 0" icon={<FaRegClock/>}>Call Time is {moment(queue.time_msec_call).format('hh:mm A')}</Text>
                </>
            }
            </Card>
            {
                config.features && config.features.whatsapp && waUrl!= undefined && waUrl!='' &&
                <Card background='#25D366' display='flex' onClick={()=>window.open(waUrl, '_blank')}>
                    <FaWhatsapp style={{width:20, height:20,color:'white'}} />
                    <div style={{margin:'0 16px',color:'white'}}>WHATSAPP UPDATE</div>
                </Card>
            }
            {
                config.features && config.features.sms &&
                <Card background='#00B2FF' display='flex' onClick={()=>showDialog(true)}>
                    <FaSms style={{width:20, height:20, color:'white'}} />
                    <div style={{margin:'0 16px',color:'white'}}>SMS UPDATE</div>
                </Card>
            }

            <Card padding='0px' margin='0 0 40px'>
                <div style={{background:theme&&theme.btnprimary,padding:8,color:theme&&theme.btnprimarytext,borderRadius:'5px 5px 0 0'}}>
                    Transaction
                </div>
                <div style={{height:16}} />
                {/*
                    trans.reverse().map((item,i,arr)=>
                    <Transaction key={i} transaction={item} opacity={i==0?1:0.3} lastone={arr.length-1===i}/>)
                */}
                {
                    [
                        ...trans.filter(i=>i.state == 2).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                        ...trans.filter(i=>i.state == 1).sort((i,j)=>i.stage>j.stage?1:-1),
                        ...trans.filter(i=>!(i.state == 1 || i.state==2)).sort((i,j)=>i.stage>j.stage?1:-1  || i.time_msec_done>j.time_msec_done?1:-1).reverse()
                    ]
                    .map((item,i,arr)=><Transaction
                        key={i}
                        transaction={item}
                        opacity={(item.state==1 || item.state==2)?1:0.3}
                        lastone={arr.length-1==i}
                    />)
                }

                <div style={{height:16}} />
            </Card>
            <div style={{height:40}}/>

        </Container>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </>
    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;


{/*<div style={{display:'flex',justifyContent:'space-between',margin:'0 -8px',alignItems:'center'}}>
    <div style={{width:20,height:20,background:'ghostwhite',borderRadius:'50%'}}/>
    { [...Array(24)].map((item,i)=><div key={i} style={{width:4,height:4,background:'ghostwhite',borderRadius:'50%'}}/>)}
    <div style={{width:20,height:20,background:'ghostwhite',borderRadius:'50%'}}/>
</div>*/}
