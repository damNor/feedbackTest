import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchBranches,fetchDepartments} from './../../data/api'
import {setConfig,selectLanguage,setBranches,selectBranch,setDepartments} from './../../data/actions'
import {VERSION} from './'


////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Language from './../../components/language'
import Loading from './../../components/loading'
import Button from './../../components/button'
import Error from './../../components/error'
import Image from './../../components/image'
import Text from './../../components/text'
import Logo from './../../components/logo'



////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const navigate           = useHistory()
    const dispatch           = useDispatch()
    const {id}               = useParams()
    const config             = useSelector(state=>state.config)
    const theme              = useSelector(state=>state.config.theme)
    const languages          = useSelector(state=>state.config.languages)
    const lang               = useSelector(state=>state.select.language?state.select.language.id:0)

    const [isLoaded,loadCfg] = useState(false)
    const [isValid,setValid] = useState(false)
    const [isLoading,toggle] = useState(false)
    const [error,setError]   = useState('')


    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        const favicon = document.getElementById("favicon");
        favicon.href = `config/${id}/images/favicon.ico`;
        if(Object.keys(config).length === 0){
            loadCfg(true);
            fetch(`/config/${id}/config.json`)
            .then(res=>{loadCfg(false); return res.json(); })
            .then(res=>{
                setValid(true)
                dispatch(setConfig(res))
                dispatch(selectLanguage(res.languageSelection[0]))
            })
            .catch(err=>console.log(err))
        }else{
            setValid(true);
        }
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
        }else{
            /*IN PROGRESS*/
            const branches = await fetchBranches(config.server,lang)
            toggle(false);
            console.log('branches',branches);
            if(branches.error) setError(branches.error)
            else{
                dispatch(setBranches(branches));
                navigate.push(`/${id}/b`)
            }
        }
    }

    const readLang = (label) =>{
        if(languages === undefined) return "";
        try{ return languages[label][lang]}
        catch(e){ return ""}
    }


    //////////////////////////////////////////////////////////////////////////// define UI
    return isLoaded? <div>Loading...</div>:
    !isValid? <div>Invalid id!</div>:
    <Container flex={1} align='center'>
        <div style={{width:'100%',height:5,background:theme&&theme.primary}} />
        <Language alignself='flex-end' margin='8px'/>
        <Container flex={3}/>
        <Logo width='200px' />
        <Text margin='16px'>{languages&&languages.welcome[lang]}</Text>
        {
            config.features && config.features.queue && <>
                <Button isPrimary width='300px' label={readLang("wlc_getq")}    margin='0 0 8px 0' onClick={onClick} mloading={isLoading}/>
                <Button isPrimary width='300px' label={readLang("wlc_activeq")} margin='0 0 8px 0' /> </>
        }
        {
            /*IN PROGRESS*/
            config.features && config.features.appointment && <>
                <Button isPrimary width='300px' label='NEW APPOINTMENT' margin='0 0 8px 0'/>
                <Button isPrimary width='300px' label='ACTIVE APPOINTMENT' />
            </>
        }
        <Container flex={4}/>
        <div style={{width:'100%',height:5,background:theme&&theme.primary}} />
        <div style={{position:'fixed',bottom:0,right:0,fontSize:8,margin:6}}>{VERSION}</div>
        <div style={{position:'fixed',bottom:0,zIndex:-2,width:'100%'}}>
            <img src={`config/${id}/images/global_bg.png`} style={{width:'100%',opacity:0.5}}/>
            <Image src="global_bg.png" />
        </div>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>


    //////////////////////////////////////////////////////////////////////////// END
}
export default Component;
