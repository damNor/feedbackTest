import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices} from './../../data/api'
import {selectService} from './../../data/actions'
import {VERSION} from './'


////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Loading from './../../components/loading'
import Language from './../../components/language'
import Error from './../../components/error'

////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const navigate           = useHistory()
    const dispatch           = useDispatch()
    const {id}               = useParams()
    const config             = useSelector(state=>state.config)
    const theme              = useSelector(state=>state.config.theme)
    const lang               = useSelector(state=>state.select.language?state.select.language.id:0)
    const languages          = useSelector(state=>state.config.languages)
    const sBranch            = useSelector(state=>state.select.branch)
    const services           = useSelector(state=>state.data.services)

    const [isLoading,toggle] = useState(false)
    const [error,setError]   = useState('')
    const [clickOn,setClick] = useState({})


    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || services === undefined)
        navigate.push(`/${id}/`)
    },[config,services])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async (serv) => {
        setClick(serv)
        dispatch(selectService(serv))
        navigate.push(`/${id}/f`)
    }

    const Service = ({service}) => <Container
        width='300px'
        border='1px solid rgba(0,0,0,0.2)'
        borderradius='5px'
        padding='12px 16px'
        margin='0 16px 8px'
        direction='row'
        align='center'
        opacity={Object.keys(clickOn).length === 0? 1: clickOn.serv_id === service.serv_id? 1:0.4 }
        onClick={()=>onClick(service)}>
            <Text flex={1} textalign='left'>{service.serv_name}</Text>
            {clickOn.serv_id === service.serv_id && <Loading />}
        </Container>

    //////////////////////////////////////////////////////////////////////////// define UI
    return <Container flex={1} align='center' overflowx='auto'>
        <div style={{width:'100%',height:5,background:theme&&theme.primary}} />
        <img src={`config/${id}/images/logo.png`} style={{width:150,margin:16}} />
        <Container
            align='center'
            width='300px'
            borderradius='5px'
            padding='12px 16px'
            background={theme&&theme.primary}
            color={theme&&theme.btnprimarytext}>
            {services&&services.dept_name}
            </Container>
        <Text margin='16px'>Services</Text>
        {
            services &&
            services.dept_service_data.map((item,i)=><Service key={i} service={item}/>)
        }
        <Container flex={1}/>
        <div style={{width:'100%',height:5,background:theme&&theme.primary}} />
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>
    //////////////////////////////////////////////////////////////////////////// END
}

export default Component;
