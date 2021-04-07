import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {readConfig,getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import {setConfig,selectLanguage,setBranches,selectBranch,setDepartments,setTab} from './../../data/actions'
import styled from 'styled-components'
import QRCode from "react-qr-code"
import {VERSION} from './'
import {FaRegAddressBook,FaPhoneAlt,FaGlobe} from 'react-icons/fa';
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
    const infos     = useSelector(state=>state.config.infos)
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
                dispatch(setTab('infos'))
                dispatch(setConfig(res))
                dispatch(selectLanguage(res.languageSelection[0]))
            })
            .catch(err=>console.log(err))
        }else{
            setValid(true);
        }
    },[id])
    //////////////////////////////////////////////////////////////////////////// functions


    //////////////////////////////////////////////////////////////////////////// define UI
    return isLoaded? <div>Loading...</div>:
    !isValid? <div>Invalid id!</div>:<>
    <div style={{flex:1,display:'flex',flexDirection:'column',overflowY:'auto',position:'relative',alignItems:'center'}}>
    <div style={{display:'flex',background:theme&&theme.primarylight,alignItems:'center',alignSelf:'stretch',margin:'0 0 16px'}}>
        <Logo width='200px' margin='16px'/>
        <div style={{flex:1}}/>
    </div>
    {
        infos.about && <>
        <Text size='25px' mcolor={theme&&theme.primary}>About Us</Text>
        <Text margin='16px'>{infos.about}</Text>
        <div style={{width:200,height:1,background:theme&&theme.primary,opacity:0.5}} />
        </>
    }
    {
        infos.address && <div style={{width:300,display:'flex',alignItems:'center',marginTop:16}}>
            <FaRegAddressBook style={{margin:'4px 16px'}}/> {infos.address}
        </div>
    }
    {
        infos.phone && <div style={{width:300,display:'flex',alignItems:'center',marginTop:16}}>
            <FaPhoneAlt style={{margin:'4px 16px'}}/> {infos.phone}
        </div>
    }
    {
        infos.web && <div style={{width:300,display:'flex',alignItems:'center',marginTop:16}}>
            <FaGlobe style={{margin:'4px 16px'}}/> {infos.web}
        </div>
    }
    </div>
    <BottomBar />
    <Background opacity={0.3}/>
    </>


    //////////////////////////////////////////////////////////////////////////// END
}
export default Component;
