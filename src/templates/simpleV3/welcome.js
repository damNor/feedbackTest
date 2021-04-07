import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {fetchBranches,fetchDepartments} from './../../data/api'
import {setBranches,selectBranch,setDepartments} from './../../data/actions'

import Container,{Content} from './../../componentsv2/container'
import Background from './../../componentsv2/background'
import BottomBar from './../../componentsv2/bottombar'
import Button from './../../componentsv2/button'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

import Language from './../../components/language'

const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = l => languages&&languages[l]?languages[l][lang]:''

    const [loading,toggle]  = useState(false)
    const [error,setError]  = useState()

    const onStart = async () => {
        toggle(true)
        const branches = await fetchBranches(config.server,lang)
        console.log('branches',branches);
        toggle(false)

        if(branches.error){setError(branches.error); return;}
        if(branches.length>1){
            dispatch(setBranches(branches))
            navigate.push(`/${id}/b`)
        }else{
            toggle(true)
            const departments =  await fetchDepartments(config.server,lang,config.server.mid)
            console.log('departments',departments)
            toggle(false)

            if(departments.error){setError(departments.error); return;}
            dispatch(selectBranch(branches[0]))
            dispatch(setDepartments(departments))
            navigate.push(`/${id}/d`)
        }
    }

    return <>
        <Loader>
        <Content>
            <Language alignself='flex-end'/>
            <Logo/>
            <Container flex={2}/>
            <Text size='24px' textalign='center' margin='0 16px 8px' weight='bold'  isPrimary>{getL('wlc_main')}</Text>
            <Text size='16px' textalign='center' margin='0 16px 40px' weight='bold' isPrimary>{getL('wlc_sec')}</Text>
            <Button label={getL('wlc_getq')} onClick={onStart} mloading={loading} isPrimary/>
            <Container flex={3}/>
        </Content>
        <Background/>
        <BottomBar/>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
