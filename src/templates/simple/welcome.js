import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchBranches,fetchDepartments} from './../../data/api'
import {setConfig,selectLanguage,setBranches,selectBranch,setDepartments} from './../../data/actions'
import {VERSION,CONFIG_PATH} from './'
import Helmet from "react-helmet";


////////////////////////////////////////////////////////////////////////////////
import InvalidID from './invalidID'
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Loading from './../../components/loading'
import Language from './../../components/language'


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const navigate           = useHistory()
    const dispatch           = useDispatch()
    const [loading,toggle]   = useState(true)
    const {id}               = useParams()
    const config             = useSelector(state=>state.config)
    const theme              = useSelector(state=>state.config.theme)
    const [cId,setCId]       = useState('');
    const [loadCfg,setLoad]  = useState(false);
    const [isValid,setValid] = useState(false);
    const [loadBranch,setLoadBranch]  = useState(false);
    const lang      = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages = useSelector(state=>state.config.languages)


    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        // if(cId === id) return; // call below function if id has changes
        // setCId(id)
        // if(config !== undefined) return;
        if(Object.keys(config) == 0){
            const readconfig = async() => {
                try{
                    setLoad(true)
                    const response = await fetch('config/' + id + '/config.json')
                    setLoad(false);
                    const mconfig  = await response.json()
                    setValid(true)
                    dispatch(setConfig(mconfig))
                    dispatch(selectLanguage(mconfig.languageSelection[0]))
                    console.log(mconfig);
                }catch(e){
                    setLoad(false);
                    console.log(e);
                }
            }
            readconfig();
        }else{
            setValid(true);
        }

    },[cId,id])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async() => {
        setLoadBranch(true)
        const response = await fetchBranches(config.server,lang)
        setLoadBranch(false)
        if(response.error){
            // todo
        }else {
            if(response.length === 1){
                setLoadBranch(true);
                const branch = response[0];
                const departments = await fetchDepartments(config.server,lang,branch.mid)
                setLoadBranch(false);
                if(response.error){
                    // todo
                }else{
                    dispatch(selectBranch(branch))
                    dispatch(setDepartments(departments))
                    navigate.push('/'+id+'/d')
                }
            }else{
                dispatch(setBranches(response))
                navigate.push('/'+id+'/b')
            }
        }
    }


    //////////////////////////////////////////////////////////////////////////// define UI
    return (
    loadCfg? <div>Loading...</div>:
    !isValid? <InvalidID />:
    <>
    
        <Helmet>
            <title>Welcome Page</title>
        </Helmet>
        <Container flex={1} align='center'>
            <Language alignself='flex-end' margin='8px'/>
            <Container flex={1}/>
            <img src={CONFIG_PATH + id + "/images/logo.png"} style={{width:200}}/>
            <Text margin='16px'>{languages?languages.welcome[lang]:''}</Text>
            <Button isPrimary
                width='300px'
                label='GET QUEUE'
                margin='0 0 8px 0'
                onClick={onClick}
                mloading={loadBranch}
            />
            <Button isPrimary
                width='300px'
                label='ACTIVE QUEUE'
                margin='0 0 8px 0'
            />
            <Button isPrimary
                width='300px'
                label='ACTIVE APPOINTMENT'
            />
            <Container flex={1}/>
            <div style={{position:'fixed',bottom:0,right:0,fontSize:8,margin:6}}>{VERSION}</div>
        </Container>
    </>
    )
//<Container width='100%' height='5px' background={theme?theme.primary:''} />

    //////////////////////////////////////////////////////////////////////////// END
}

export default Component;
