import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices} from './../../data/api'
import {selectDepartment,setServices} from './../../data/actions'
import styled from 'styled-components'
import {HiOutlineLocationMarker } from 'react-icons/hi';


////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
import Container from './../../components/container'
import BottomBar from './../../components/bottombar'
import Language from './../../components/language'
import Loading from './../../components/loading'
import Button from './../../components/button'
import Error from './../../components/error'
import Image from './../../components/image'
import Text from './../../components/text'
import Logo from './../../components/logo'


////////////////////////////////////////////////////////////////////////////////
const Card = styled.div`
    border          : 1px solid rgba(0,0,0,0.2);
    border-width    : 1px 1px 1px 1px ;
    opacity         : ${p=>p.opacity};
    margin          : 0 16px 6px;
    align-items     : center;
    overflow        : hidden;
    background      : white;
    width           : 300px;
    display         : flex;
    border-radius   : 5px;
    flex-shrink     : 0;
`

const Deco = styled.div`
    background      : ${p=>p.bg};
    align-self      : stretch;
    border-radius   : 6px;
    width           : 6px;
    margin          : 2px;
`


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const {id}          = useParams()
    const navigate      = useHistory()
    const dispatch      = useDispatch()
    const config        = useSelector(state=>state.config)
    const theme         = useSelector(state=>state.config.theme)
    const sBranch       = useSelector(state=>state.select.branch)
    const languages     = useSelector(state=>state.config.languages)
    const departments   = useSelector(state=>state.data.departments)
    const lang          = useSelector(state=>state.select.language.id)
    const getL          = label => languages&&languages[label]?languages[label][lang]:""

    const [isLoading,toggle]     = useState(false)
    const [error,setError]       = useState('')
    const [selected,setSelected] = useState({})


    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || departments === undefined)
        navigate.push(`/${id}/`)
    },[config,departments])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async (dept) => {
        toggle(true)
        setSelected(dept)
        const services = await fetchServices(config.server,lang,sBranch.mid,dept.dept_id);
        toggle(false)
        console.log('services',services);
        if(services.error) setError(services.error)
        else{
            dispatch(selectDepartment(dept))
            dispatch(setServices(services[0]))
            navigate.push(`/${id}/s`)
        }
    }

    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
    <div style={{width:'200%',height:5,background:theme&&theme.primary}} />
    <Logo width='150px' alignself='center' margin='16px' />
    <Text width='300px' alignself='center' margin='0 0 12px'>{getL('branches')}</Text>
    <Container flex={1} overflowy='auto' align='center'>
    {
        departments && departments.map((item,i)=>
        <Card key={i}
            opacity={Object.keys(selected).length===0?1:selected.dept_id === item.dept_id?1:0.4}
            onClick={()=>onClick(item)}>
            <Deco bg={theme&&theme.primary}/>
            <Container flex={1} margin='12px 0 12px 8px'>
                <Text textalign='left' weight='bold' margin='0 0 6px 0'>{item.dept_name}</Text>
                <Text
                    size='12px'
                    mcolor='rgba(0,0,0,0.5)'
                    icon={<HiOutlineLocationMarker style={{opacity:0.5}}/>}>
                    {getL('address')} {item.address}</Text>
            </Container>
            {selected.dept_id === item.dept_id && <Loading size='16px' margin='0 8px 0 0'/>}
        </Card>
    )}
    </Container>
    {/*<BottomBar />*/}
    <Background opacity={0.3}/>
    <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </>


    //////////////////////////////////////////////////////////////////////////// END
}
export default Component;
