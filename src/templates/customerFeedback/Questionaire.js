import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import Cookies from 'universal-cookie'

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

    const sserv     = useSelector(state=>state.select.service)
    const [forms,setForms]  = useState([])
    useEffect(()=>
    {
        if(config==undefined || sserv==undefined)
        {
            navigate.push(`/${id}/`); 
            return;
        }
        const formsetups = (config.formsv2[sserv.serv_id]??config.formsv2.default)??config.forms
        setForms(formsetups)
    },[sserv])
    return <>
   
    </>
}

export default Component;
