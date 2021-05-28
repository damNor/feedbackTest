import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import Loader from './loader'

import Cookies from 'universal-cookie'
import Container,{Content,Card} from './../../componentsv2/container'
import Background from './../../componentsv2/background'
import Loading from './../../componentsv2/loading'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'


const recaptchaVer = 'v3'

const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const cookies   = new Cookies()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = lbl => languages&&languages[lbl]?languages[lbl][lang]:""

    const sbranch   = useSelector(state=>state.select.branch)
    const sdept     = useSelector(state=>state.select.department)
    const stimes    = useSelector(state=>state.select.timeslot)
    const sserv     = useSelector(state=>state.select.service)
    const stype     = useSelector(state=>state.select.type)

    const [forms,setForms]  = useState([])
    const [loading,toggle]  = useState(false)
    const [valid,setValid]  = useState(false)
    const [error,setError]  = useState()

    useEffect(()=>{
        if(config == undefined || (Object.keys(config).length == 0) )
        {
            navigate.push(`/${id}/`); 
            return;
        }
    },[])

    return <Loader>
    <Content style={{backgroundColor:'#DDEEFE'}}  position='absolute'>
        <Container background='#FFF'  align='center' top='0' width='100%' wrap='wrap'>
            <Logo alignself='center' margin='5% 0 5% 0'/>
        </Container>
         
        <Container margin='5% 0 0 0' width='100%'>
            <Container alignself='center' width='50%'>
                <img src={`config/feedback/images/thank-you-icon.png`} width='100vw' style={{margin:'10vw auto 5vw auto'}}  />
                <Text size='3vw' mcolor='#0072BC' margin='5vw 2vw' lineHeight='' textalign='center'>
                    Thank you for your feedback and we look forward to seeing you again.
                </Text> 
            </Container>
            
        </Container>
    </Content>
    <Background/>
    </Loader>
}

export default Component;
