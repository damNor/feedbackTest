import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices} from './../../data/api'
import {selectDepartment,setServices} from './../../data/actions'


////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Loading from './../../components/loading'
import Language from './../../components/language'
import Error from './../../components/error'
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
    const sBranch            = useSelector(state=>state.select.branch)
    const departments        = useSelector(state=>state.data.departments)

    const [isLoading,toggle] = useState(false)
    const [error,setError]   = useState('')
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

    const Department = ({department}) => <Container
        width='300px'
        border='1px solid rgba(0,0,0,0.2)'
        borderradius='5px'
        padding='12px 16px'
        margin='0 16px 8px'
        direction='row'
        align='center'
        background='white'
        opacity={Object.keys(selected).length === 0? 1: selected.dept_id === department.dept_id? 1:0.4 }
        onClick={()=>onClick(department)}>
            <div style={{width:40,height:40,background:'rgba(0,0,0,0.12)',borderRadius:'50%',margin:'0 16px 0 0'}} />
            <Text flex={1} textalign='left'>{department.dept_name}</Text>
            {selected.dept_id === department.dept_id && <Loading />}
        </Container>

    //////////////////////////////////////////////////////////////////////////// define UI
    return <Container flex={1} align='center' overflowx='auto'>
        <div style={{width:'100%',height:5,background:theme&&theme.primary}} />
        <Logo width='150px' margin='16px'/>
        <Text margin='0 0 16px'>Branches</Text>
        {
            departments &&
            departments.map((item,i)=><Department key={i} department={item}/>)
        }
        <Container flex={1}/>
        <div style={{width:'100%',height:5,background:theme&&theme.primary}} />
        <div style={{position:'fixed',bottom:0,zIndex:-2,width:'100%'}}>
            <img src={`config/${id}/images/global_bg.png`} style={{width:'100%',opacity:0.5}}/>
        </div>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>
    //////////////////////////////////////////////////////////////////////////// END
}

export default Component;
