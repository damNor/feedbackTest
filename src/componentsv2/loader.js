import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {setConfigState,setConfig,selectLanguage} from './../data/actions'
import WebFont from 'webfontloader';

const Loader = ({children}) =>{
    const {id}      = useParams()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const state     = useSelector(state=>state.loadstate)
    const setState  = s => dispatch(setConfigState(s))

    useEffect(()=>
    {
        const favicon = document.getElementById("favicon")
        favicon.href  = `config/${id}/images/favicon.ico`

        if(Object.keys(config).length !== 0) return;

        console.log('config is loaded');
        console.log('id', id );

        setState('loading')
        fetch(`/config/${id}/config.json`)
        .then(res=>res.json())
        .then(res=>{
            setState('valid')
            dispatch(setConfig(res))
            dispatch(selectLanguage(res.languageSelection[0]))

            WebFont.load({
                custom:{
                    families:['NunitoSans'],
                    urls:[`config/${id}/fonts/fonts.css`]
                },
                fontactive: function(familyName,fvd){
                    console.log('is called' + familyName);
                    document.getElementById('root').style.fontFamily = familyName
                },
               });
        })
        .catch(e=>setState('invalid'))
    },[id])

    console.log('loader state :', state);
    switch (state) 
    {
        case 'loading'  : return <>Loading...</>
        case 'invalid'  : return <>Please scan the QR on ticket to proceed</>
        case 'valid'    : return children
        default         : return ''
    }
}
export default Loader;
