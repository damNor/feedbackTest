import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {setConfigState,setConfig,selectLanguage} from './../../data/actions'

const Loader = ({children}) =>{
    const {id}      = useParams()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const state     = useSelector(state=>state.loadstate)
    const setState  = s => dispatch(setConfigState(s))

    useEffect(()=>{
        //////////////////////////////////////////////////////////////////////// set favicon
        const favicon = document.getElementById("favicon")
        favicon.href  = `config/${id}/images/favicon.ico`

        //////////////////////////////////////////////////////////////////////// load config
        if(Object.keys(config).length === 0){
            setState('loading')
            fetch(`/config/${id}/config.json`)
            .then(res=>res.json())
            .then(res=>{
                console.log("config",res)
                setState('valid')
                dispatch(setConfig(res))
                dispatch(selectLanguage(res.languageSelection[0]))
            })
            .catch(err=>setState('invalid'))
        }
    },[])


    //////////////////////////////////////////////////////////////////////////// render according to current load state
    const render = c =>{
        switch (state) {
            case 'loading'  : return <>Loading...</>
            case 'invalid'  : return <>Invalid ID</>
            case 'valid'    : return c
            default: return ''
        }
    }
    return render(children)
}

export default Loader;
