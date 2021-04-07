import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {readConfig,getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import {setConfig,selectLanguage,setBranches,selectBranch,setDepartments,setTab} from './../../data/actions'
import styled from 'styled-components'
import QRCode from "react-qr-code"
import {VERSION} from './'
import {FaBars,FaWhatsapp,FaSms,FaDesktop,FaUserFriends,FaRegClock,FaUserTie,FaCheckCircle} from 'react-icons/fa';
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

const Transaction = styled.div`
    align-self      : center;
    min-width       : 300px;
    display         : flex;
`
const Timestamp = styled.div`
    color           : ${p=>p.mcolor};
    background      : ${p=>p.bg};
    text-align      : center;
    width           : 80px;
    border-radius   : 5px;
    padding         : 2px;
    box-sizing      : border-box;
    font-size       : 12px;
`
const Qstatus = styled.div`
    color           : ${p=>p.mcolor};
    background      : ${p=>p.bg};
    text-align      : left;
    width           : 80px;
    border-radius   : 5px;
    padding         : 2px;
    box-sizing      : border-box;
    font-size       : 12px;
    text-transform  : capitalize;
`
const DetailIcon = styled.div`
    font-size       : 8px;
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

const Deco = () =><div style={{display:'flex',flexDirection:'column',alignSelf:'stretch',alignItems:'center',margin:'0 8px'}}>
    <FaCheckCircle style={{color:'limegreen'}}/>
    <div style={{width:2,background:'limegreen',flex:1,marginTop:-2}}/>
</div>

////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const {id,qr}   = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const cookies   = new Cookies()
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

    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        const favicon = document.getElementById("favicon");
        favicon.href = `config/${id}/images/favicon.ico`;
        if(Object.keys(config).length === 0){
            loadCfg(true);
            fetch(`/config/${id}/config.json`)
            .then(res=>{loadCfg(false); return res.json();})
            .then(res=>{
                console.log("config",res);
                setValid(true)
                dispatch(setTab('journey'))
                dispatch(setConfig(res))
                dispatch(selectLanguage(res.languageSelection[0]))
            })
            .catch(err=>console.log(err))
        }else{
            setValid(true);
        }
    },[id])


    //////////////////////////////////////////////////////////////////////////// functions
    useEffect(async ()=>{
        if(qr === undefined) return;
        if(Object.keys(config) == 0) return;

        // console.log('qstatusqr',qr);
        // console.log(config);
        // setLoad('loading')
        // const response = await getQueueStatus(config.server,'','','','',qr);
        // console.log('qstatusqr',response);
        //
        // if(response.error) setLoad('failed')
        // else{
        //     //todo store in memory
        //     setLoad('success')
        //     setQueue(response);
        //     monitorQNumber(response)
        //     if(response.status === 2) return;
        //     const mtimer = setInterval(()=>{
        //         if(!window.location.hash.includes('/q/')) clearInterval(mtimer);
        //         else monitorQNumber(response)
        //     },10000)
        // }

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
                cookies.set('jtimer',mtimer)
            }
        }
        start();
        return ()=>{
            clearInterval(cookies.get('jtimer'))
            cookies.remove('jtimer')
        }

    },[qr,config])

    const monitorQNumber = async(response)=>{
        if(Object.keys(config) == 0) return;

        //const status = await getQueueStatus(config.server,response.mid,response.dept_id,response.cust_id,response.queue_number);
        const status = await getQueueStatus(config.server,'','','','',qr);
        console.log("qstatusqr",status);
        if(!response.error) setQueue(status)

        const transaction = await getQueueTransaction(config.server,response.mid,response.dept_id,response.queue_number);
        console.log("qtransaction",transaction)
        if(!transaction.error) setTrans(transaction)
    }


    //////////////////////////////////////////////////////////////////////////// define UI
    return isLoaded? <div>Loading...</div>:
    !isValid? <div>Invalid id!</div>:<>
    <div style={{flex:1,display:'flex',flexDirection:'column',overflowY:'auto',position:'relative',alignItems:'center'}}>
        <div style={{display:'flex',background:theme&&theme.primarylight,alignItems:'center',alignSelf:'stretch'}}>
            <Logo width='200px' margin='16px'/>
            <div style={{flex:1}}/>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:16}}>
                <Text size='40px' weight='bold' mcolor={theme&&theme.primary}>{queue.queue_number}</Text>
                <Text size='12px'>Attending {queue.serv_current_serving==''?'-':queue.serv_current_serving}</Text>
            </div>
        </div>
        <Text width='300px' mcolor={theme&&theme.primary} margin='16px'>Journey</Text>
        {
            [
                ...trans.filter(i=>i.state == 2).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                ...trans.filter(i=>i.state == 1).sort((i,j)=>i.stage>j.stage?1:-1 || i.time_msec_issue>j.time_msec_issue?1:-1),
                ...trans.filter(i=>!(i.state == 1 || i.state==2)).sort((i,j)=>i.stage>j.stage?1:-1  || i.time_msec_done>j.time_msec_done?1:-1).reverse()
            ]
            .map((item,i,arr)=><Transaction key={i} item={item} isLast={arr.length-1 == i} isWait={item.state==1||item.state==2}>
                <div style={{margin:'8px 0'}}>
                    <Timestamp bg={theme&&theme.btnprimary} mcolor={theme&&theme.btnprimarytext}>{moment(item.time_msec_issue).format('h:mm A')}</Timestamp>
                    <Qstatus>{item.state_text}</Qstatus>
                </div>
                <Deco/>
                <div style={{margin:'8px 0'}}>
                    <Text weight='bold' margin='0 0 4px'>{item.dept_name}</Text>
                    <Text size='12px' margin='0 0 16px' opacity={0.8}>{item.serv_name}</Text>
                    <div style={{display:'flex'}}>
                    <Text size='12px' margin='0 16px 4px 0' icon={<DetailIcon>CT</DetailIcon>} opacity={0.8}>{moment(item.time_msec_call).format('h:mm A')}</Text>
                    <Text size='12px' margin='0 16px 4px 0' icon={<DetailIcon>DT</DetailIcon>} opacity={0.8}>{moment(item.time_msec_done).format('h:mm A')}</Text>
                    </div>
                    {item.user_name && <Text size='12px' margin='0 0 4px' icon={<FaUserTie style={{width:18,height:18}}/>} opacity={0.8}>{item.user_name + " ("+ item.wstt_name+")"}</Text>}
                </div>
            </Transaction>)
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
