import React,{useState,useEffect,useContext} from 'react';
import {fetchBranches,fetchDepartments} from './../../data/api'
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {setConfig,selectLanguage,setBranches,selectBranch,setDepartments} from './../../data/actions'
import styled from 'styled-components'


////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
import Container from './../../components/container'
import BottomBar from './../../components/bottombar'
import Language from './../../components/language'
import Button from './../../components/button'
import Error from './../../components/error'
import Text from './../../components/text'
import Logo from './../../components/logo'


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = label => languages&&languages[label]?languages[label][lang]:""

    const [isLoaded,loadCfg] = useState(false)
    const [isValid,setValid] = useState(false)
    const [isLoading,toggle] = useState(false)
    const [error,setError]   = useState('')

    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        const favicon = document.getElementById("favicon")
        favicon.href  = `config/${id}/images/favicon.ico`
        if(Object.keys(config).length !== 0){setValid(true); return;}

        loadCfg(true)
        fetch(`/config/${id}/config.json`)
        .then(res=>{loadCfg(false); return res.json();})
        .then(res=>{
            console.log("config",res);
            setValid(true)
            dispatch(setConfig(res))
            dispatch(selectLanguage(res.languageSelection[0]))
        })
        .catch(err=>console.log(err))
    },[id])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async() => {
        toggle(true);
        if(config.server && config.server.mid.length>0){
            const departments = await fetchDepartments(config.server,lang,config.server.mid)
            toggle(false);
            console.log('departments',departments);
            if(departments.error) setError(departments.error)
            else{
                dispatch(selectBranch({mid:config.server.mid}));
                dispatch(setDepartments(departments))
                navigate.push(`/${id}/d`);
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////// define UI
    return <>{
    isLoaded? <div>Loading...</div>:
    !isValid? <div>Invalid id!</div>:
    <>
        <div style={{width:'200%',height:5,background:theme&&theme.primary}} />
        <Language alignself='flex-end'/>
        <Logo alignself='center' width='200px' margin='16px' />
        <Container flex={3}/>
        <Text textalign='center' margin='16px' size='24px' mcolor={theme&&theme.primary}>{getL('wlc_main')}</Text>
        <Text textalign='center' margin='16px' size='14px'>{getL('wlc_sec')}</Text>
        <Button isPrimary width='200px' label={getL('wlc_getq')} margin='0 0 8px 0' alignself='center' onClick={onClick} mloading={isLoading}/>
        <Container flex={5}/>
        {/*<BottomBar />*/}
        <Background opacity={0.3}/>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </>
    }</>



    //////////////////////////////////////////////////////////////////////////// END
}
export default Component;
