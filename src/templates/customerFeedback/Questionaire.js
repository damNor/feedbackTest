import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import Cookies from 'universal-cookie'

import Container,{Content} from './../../componentsv2/container'
import Button,{BackButton} from './../../componentsv2/button'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Language from './../../components/language'

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
    const [error,setError]  = useState()
    const [forms,setForms]  = useState([])
    useEffect(()=>
    {
        if(config==undefined ||  (Object.keys(config).length == 0) )
        {
            // navigate.push(`/${id}/`); 
            return;
        }
         
    },[])
    return <>
        <Loader>
        <Content style={{backgroundColor:'#DDEEFE'}}>
            <Language alignself='flex-end'/>
            <Container style={{backgroundColor:'#FFF',position:'absolute',top:0}} width='100%'>
                <Logo alignself='center' margin='5% 0 2% 0'/>
            </Container>
            <BackButton />
            <Container flex={2} />
            <Container flex={3}/>
        </Content>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
