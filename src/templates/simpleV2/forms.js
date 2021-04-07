import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {getQueueNumber} from './../../data/api'
import {selectService,setTimeslots} from './../../data/actions'
import ReCAPTCHA from "react-google-recaptcha";
import styled from 'styled-components'

////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
import BottomBar from './../../components/bottombar'
import Container from './../../components/container'
import Button from './../../components/button'
import Input from './../../components/input'
import Error from './../../components/error'
import Text from './../../components/text'
import Logo from './../../components/logo'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id}       = useParams()
    const config     = useSelector(state=>state.config)
    const theme      = useSelector(state=>state.config.theme)
    const cfgForms   = useSelector(state=>state.config.forms)
    const selBranch  = useSelector(state=>state.select.branch)
    const selService = useSelector(state=>state.select.service)
    const languages  = useSelector(state=>state.config.languages)
    const selDept    = useSelector(state=>state.select.department)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0)

    const [isLoading,setLoading]   = useState(false);
    const [forms,setForms]         = useState();
    const [enable,toggle]          = useState(false);
    const [error,setError]         = useState('')


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || selService === undefined)
        navigate.push('/'+id+'/')
    },[config,selService])

    useEffect(()=>{
        if(cfgForms === undefined) return;
        setForms(cfgForms)
    },[cfgForms])

    //////////////////////////////////////////////////////////////////////////// functions
    const onSubmit = async() => {
        setLoading(true)
        const customer = {
            'sysid' : '',
            'id'    : forms.find(e=> e.keyword === 'email').value,
            'name'  : forms.find(e=> e.keyword === 'name').value,
            'phone' : ''
        }
        const response = await getQueueNumber(config.server,selBranch.mid,selDept.dept_id,selService.serv_id,customer);
        console.log("queue",response);
        setLoading(false)
        if(response.error){
            setError(response.error)
        }else{
            localStorage.setItem('queue',JSON.stringify(response))
            navigate.push(`/${id}/q/${response.qr_info}`)
        }
    }

    //////////////////////////////////////////////////////////////////////////// define UI
    return <Container flex={1} align='center'>
        <div style={{width:'200%',height:5,background:theme&&theme.primary}} />
        <Logo width='150px' margin='16px'/>
        <Text margin='8px 0'>Forms</Text>
        <Container center='true' background='white' padding='16px' shadow='0px 0px 4px rgba(0, 0, 0, 0.25)' width='320px'>
            {
                forms &&
                forms.map((item,i)=><Input key={i}
                    type={item.type}
                    label={item.label}
                    value={item.val}
                    margin='8px 0px'
                    width='270px'
                    onChange={e=>{ setForms(forms.map(jitem=>jitem.id === item.id?{...jitem,...{value:e}}: jitem))}} />)
            }
            <ReCAPTCHA
                style={{selfAlign:'center',margin:16}}
                sitekey={"6LdwSMQZAAAAANPSKk0dCnxLEOBCXpTJfp6Qk9cq"}
                onChange={(val)=>{
                    console.log(val)
                    toggle(val!==undefined)
                }}
            />
            <Button isPrimary
                width='220px'
                label='SUBMIT'
                margin='8px'
                onClick={onSubmit}
                mloading={isLoading}
                enable={enable}/>
        </Container>
        <div style={{flex:1}} />
        {/*<BottomBar/>*/}
        <Background opacity={0.4} height='300px'/>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>


    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
