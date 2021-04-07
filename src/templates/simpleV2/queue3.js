import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {readConfig,getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import {setConfig,selectLanguage,setBranches,selectBranch,setDepartments,setTab} from './../../data/actions'
import styled from 'styled-components'
import QRCode from "react-qr-code"
import {VERSION} from './'
import {FaBars,FaWhatsapp,FaSms,FaDesktop,FaUserFriends,FaRegClock,FaUserTie} from 'react-icons/fa';
import moment from 'moment'
import Cookies from 'universal-cookie'


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

const TicketOuter = styled.div`
    align-self      : center;
    mask-image      : ${p=>`radial-gradient(circle 10px at 100% ${p.yaxis}, transparent 0, transparent 10px, black 11px)`};
`
const TicketInner = styled.div`
    background      : ${p=>p.bg??'dodgerblue'};
    color           : ${p=>p.color??'white'};
    height          : ${p=>p.height};
    box-sizing      : border-box;
    background-size : 100% 100%;
    width           : 300px;
    padding         : 16px;
    border-radius   : 10px;
    display         : flex;
    flex-direction  : column;
    align-content   : center;
    mask-image      : ${p=>`radial-gradient(circle 10px at 0 ${p.yaxis}, transparent 0, transparent 10px, black 11px)`};
`
const Card = styled.div`
    border          : ${p=>p.border??'1px solid rgba(0, 0, 0, 0.2)'};
    background      : ${p=>p.background??'white'};
    margin          : ${p=>p.margin??'12px 0 0'};
    padding         : ${p=>p.padding??'12px 16px'};
    display         : ${p=>p.display};
    color           : ${p=>p.color};
    box-sizing      : border-box;
    align-self      : center;
    justify-content : center;
    width           : 300px;
    border-radius   : 10px;
`
const Ticket = (props) => <TicketOuter {...props}>
    <TicketInner {...props}>{props.children}</TicketInner>
</TicketOuter>
const Info   = ({label,value}) => <div style={{width:89}}>
    <Text textalign='center' size='12px'>{label}</Text>
    <Text textalign='center' margin='4px 0 0'>{value}</Text>
</div>


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const {id,qr}   = useParams()
    const cookies   = new Cookies();
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = label => languages&&languages[label]?languages[label][lang]:""

    const [isLoaded,loadCfg]    = useState(false)
    const [isValid,setValid]    = useState(false)
    const [isLoading,setLoad]   = useState('')      //loading||failed||success
    const [error,setError]      = useState('')
    const [queue,setQueue]      = useState({})
    const [trans,setTrans]      = useState([])
    const [timer,settimer]      = useState()

    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        const favicon = document.getElementById("favicon");
        favicon.href = `config/${id}/images/favicon.ico`;
        if(Object.keys(config).length !== 0){setValid(true); return;}
        loadCfg(true);
        fetch(`/config/${id}/config.json`)
        .then(res=>{loadCfg(false); return res.json();})
        .then(res=>{
            console.log("config",res);
            setValid(true)
            dispatch(setTab('queue'))
            dispatch(setConfig(res))
            dispatch(selectLanguage(res.languageSelection[0]))
        })
        .catch(err=>console.log(err))
    },[id])


    //////////////////////////////////////////////////////////////////////////// functions
    useEffect(()=>{
        if(qr === undefined) return;
        if(Object.keys(config) == 0) return;

        const start = async () => {
            console.log('qstatusqr',qr)
            setLoad('loading')
            const response = await getQueueStatus(config.server,'','','','',qr)
            if(response.error) setLoad('failed')
            else{
                setLoad('success')
                cookies.set('qr',qr,{path:"/",expires:moment().add(1,'days').toDate()})
                setQueue(response)
                monitorQNumber(response)
                if (response.status === 2) return;
                const mtimer = setInterval(()=>monitorQNumber(response),10000)
                cookies.set('qtimer',mtimer)
            }
        }
        start();
        return ()=>{
            clearInterval(cookies.get('qtimer'))
            cookies.remove('qtimer')
        }
    },[qr,config])

    const monitorQNumber = async(response)=>{
        if(Object.keys(config) == 0) return;

        //const status = await getQueueStatus(config.server,response.mid,response.dept_id,response.cust_id,response.queue_number);
        const status = await getQueueStatus(config.server,'','','','',qr);
        console.log("qstatusqr",status);
        if(!response.error) setQueue(status)

        // Queue dosent need transaction
        // const transaction = await getQueueTransaction(config.server,response.mid,response.dept_id,response.queue_number);
        // console.log("qtransaction",transaction)
        // if(!transaction.error) setTrans(transaction)
    }


    //////////////////////////////////////////////////////////////////////////// define UI
    return isLoaded? <div>Loading...</div>:
    !isValid? <div>Invalid id!</div>:<>
    <div style={{flex:1,display:'flex',flexDirection:'column',overflowY:'auto',position:'relative'}}>
        <Language alignself='flex-end'/>
        <Text textalign='center' margin='16px'>Please be seated, we will attend you shortly</Text>
        <Ticket bg={`url(config/${id}/images/ticket_top.png)`} height='120px' yaxis='100%'>
            <Text textalign='center'>Your Queue Number</Text>
            <Text textalign='center' size='70px' >{queue.queue_number}</Text>
        </Ticket>
        <Ticket bg={`url(config/${id}/images/ticket_bot.png)`} yaxis='0%'>
            <Text textalign='center'>{queue.serv_name}</Text>
            <div style={{padding:'4px 4px 1px',background:'white',alignSelf:'center',margin:16}}>
                <QRCode width='134px' value={qr} size={120}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-around'}}>
            {
                queue.status !== 2?<>
                <Info label={"Serving Now"} value={queue.serv_current_serving} />
                <Info label={"Position"} value={queue.wait_position} />
                <Info label={"ETA"} value={moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')} /></>:<>
                <Info label={"Attended By"} value={"-"} />
                <Info label={"Call Time"} value={"-"} />
                </>
            }
            </div>
        </Ticket>
        {
            config.features && config.features.whatsapp && queue.wa_url !== undefined && queue.wa_url !== '' &&
            <Card background='#25D366' border='1px solid #25D366' display='flex' onClick={()=>window.open(queue.wa_url, '_blank')}>
                <FaWhatsapp style={{width:20, height:20,color:'white'}} /> <div style={{margin:'0 16px',color:'white'}}>WHATSAPP UPDATE</div>
            </Card>
        }
        {
            config.features && config.features.sms &&
            <Card background='#00B2FF' border='1px solid #00B2FF' display='flex'>
                <FaSms style={{width:20, height:20, color:'white'}} /> <div style={{margin:'0 16px',color:'white'}}>SMS UPDATE</div>
            </Card>
        }
        <Container height='20px'/>

        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:isLoading==='failed'?'flex':'none',alignItems:'center',justifyContent:'center'}} >
            <div style={{width:300,background:'white',textAlign:'center',borderRadius:10,padding:16}}>
                This Qr Code dosent exist in the system
            </div>
        </div>

    </div>
    <BottomBar />
    <Background opacity={0.3}/>
    <Error message={error} show={error!=''} onClose={()=>setError('')} />

    <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:isLoading==='loading'?'flex':'none',alignItems:'center',justifyContent:'center'}} >
        <div style={{width:300,background:'white',textAlign:'center',borderRadius:10,padding:16}}>
            Loading...
        </div>
    </div>

    </>


    //////////////////////////////////////////////////////////////////////////// END
}
export default Component;
