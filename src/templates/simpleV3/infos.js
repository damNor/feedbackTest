import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import {selectService,setTimeslots,setTab} from './../../data/actions'
import TextField from '@material-ui/core/TextField'
import ReCAPTCHA from 'react-google-recaptcha'
import {FaGlobe,FaFacebookF,FaInstagram,FaTwitter} from 'react-icons/fa'
import Cookies from 'universal-cookie'
import styled from 'styled-components'
import Loader from './loader'
import moment from 'moment'

import Container,{Content,Card,BlackOut} from './../../components/container'
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
    const infos     = useSelector(state=>state.config.infos)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = lbl => languages&&languages[lbl]?languages[lbl][lang]:""

    useEffect(()=>{dispatch(setTab('infos'))},[])

    return <Loader>
    <Content>
    <div style={{display:'flex',background:theme&&theme.primarylight,alignItems:'center',justifyContent:'center',alignSelf:'stretch'}}>
        <Logo width='200px' margin='16px'/>
    </div>
    <div style={{alignSelf:'stretch',margin:'0 0 16px',height:5,background:theme&&theme.primary}}/>

    {
        infos && infos.about && <>
        <Text textalign='center' size='30px' margin='0 16px 16px' weight='bold' mcolor={theme&&theme.primary} >About Us</Text>
        <Text textalign='center' size='16px' margin='0 16px 16px' opacity={0.9}>{infos&&infos.about}</Text>
        <div style={{height:1,width:200,background:'rgba(0,0,0,0.1)',margin:'0 0 16px'}} />
        </>
    }

    {
        infos && infos.name && <>
        <Text textalign='center' size='30px' margin='0 16px 16px' weight='bold' mcolor={theme&&theme.primary}>Contact</Text>
        <Text textalign='center' size='18px' margin='0 16px 8px'  weight='bold' mcolor={theme&&theme.primary}>{infos&&infos.name}</Text>
        <Text textalign='center' size='16px' margin='0 16px 16px' opacity={0.9}>{infos&&infos.address}</Text>
        <Text textalign='center' size='18px' margin='0 16px 16px' weight='bold' opacity={0.9}>{infos&&infos.phone}</Text>
        <Text textalign='center' size='16px' margin='0 16px 16px' weight='bold' opacity={0.9}>
            <a href={infos&&infos.web} target="_blank">{infos&&infos.web}</a>
        </Text>
        <div style={{height:1,width:200,background:'rgba(0,0,0,0.1)',margin:'0 0 16px'}} />
        </>
    }


    {
        infos && !infos.web &&
        <>
        <Text textalign='center' size='30px' margin='0 16px 16px' weight='bold' mcolor={theme&&theme.primary} >Follow Us</Text>
        <div style={{display:'flex',justifyContent:'space-around',margin:'0 0 40px'}}>
            {
                infos&&infos.web&&
                <a style={{textDecoration:'none',margin:16,color:'dodgerblue'}} href={infos&&infos.web} target="_blank"><FaGlobe style={{width:30,height:30}}/></a>
            }
            {
                infos&&infos.facebook&&
                <a style={{textDecoration:'none',margin:16,color:'#3b5998'}} href={infos&&infos.facebook} target="_blank"><FaFacebookF style={{width:30,height:30}}/></a>
            }
            {
                infos&&infos.insta&&
                <a style={{textDecoration:'none',margin:16,color:'#3f729b'}} href={infos&&infos.insta} target="_blank"><FaInstagram style={{width:30,height:30}}/></a>
            }
            {
                infos&&infos.twitter&&
                <a style={{textDecoration:'none',margin:16,color:'#00acee'}} href={infos&&infos.twitter} target="_blank"><FaTwitter style={{width:30,height:30}}/></a>
            }
        </div>
        <div style={{height:1,width:200,background:'rgba(0,0,0,0.1)'}} />
        </>
    }
    </Content>
    <BottomBar/>
    </Loader>
}

export default Component;
