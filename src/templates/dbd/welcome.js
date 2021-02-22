import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchBranches} from './../../data/api'
import {setConfig,selectLanguage,setBranches} from './../../data/actions'
import {VERSION,CONFIG_PATH} from './'

import InvalidID from './invalidID'
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'

////////////////////////////////////////////////////////////////////////////////

const configAddr = id => CONFIG_PATH + id + '/config.json'

////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const navigate           = useHistory()
    const dispatch           = useDispatch()
    const [loading,toggle]   = useState(true)
    const {id}               = useParams()
    const config             = useSelector(state=>state.config)
    const [cId,setCId]       = useState('');
    const [loadCfg,setLoad]  = useState(false);
    const [isValid,setValid] = useState(false);
    const lang      = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages = useSelector(state=>state.config.languages)


    useEffect(()=>{
        // call below function if id has changes
        if(cId === id) return;
        setCId(id)
        const readconfig = async ()=>{
            try{
                setLoad(true)
                const response = await fetch(configAddr(id))
                setLoad(false)
                const mconfig  = await response.json()
                setValid(true)
                dispatch(setConfig(mconfig))
                dispatch(selectLanguage(mconfig.languageSelection[0]))
                console.log(mconfig);
            }catch(e){
                // expected error when config.json not found
            }}
        readconfig();
    },[id,config])

    const onGetBranchClick = async () => {
        const response = await fetchBranches()
        console.log(response);
        if(response.error){
            // todo
        }else {
            dispatch(setBranches(response))
            navigate.push('/'+id+'/branches')
        }
    }

    const onActiveAppointmentClick = async () => {

    }


    return loadCfg? <div>Loading...</div>:
    !isValid? <InvalidID />:
    <Container flex={1} background='white' background='white' padding='16px' align='center'>
        <Container flex={1} />
        <img src={CONFIG_PATH + id + "/images/logo.png"} style={{width:200}}/>
        <Text margin='16px'>{languages?languages.welcome[lang]:''}</Text>
        <Button isPrimary
            width='250px'
            padding='4px 16px'
            borderradius='50px'
            label='NEW APPOINTMENT'
            onClick={onGetBranchClick} />
        <Button isPrimary
            width='250px'
            borderradius='50px'
            margin='12px'
            label='ACTIVE APPOINTMENT'
            onClick={onActiveAppointmentClick} />
        <Container flex={1} />
    </Container>
}

export default Component;
