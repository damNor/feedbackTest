import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices} from './../../data/api'
import {selectDepartment,setServices} from './../../data/actions'
import styled from 'styled-components'
import { HiOutlineLocationMarker } from 'react-icons/hi';


////////////////////////////////////////////////////////////////////////////////
import Background from './../../components/background'
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
    const navigate          = useHistory()
    const dispatch          = useDispatch()
    const {id}              = useParams()
    const config            = useSelector(state=>state.config)
    const theme             = useSelector(state=>state.config.theme)
    const sBranch           = useSelector(state=>state.select.branch)
    const languages         = useSelector(state=>state.config.languages)
    //const departments        = useSelector(state=>state.data.departments)
    const timeslots         = useSelector(state=>state.data.timeslots);
    const lang              = useSelector(state=>state.select.language?state.select.language.id:0)

    const [isLoading,toggle]     = useState(false)
    const [error,setError]       = useState('')
    const [sDate,setDate]        = useState()
    const [sTime,setTime]        = useState({time:0})


    //////////////////////////////////////////////////////////////////////////// loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || timeslots === undefined) navigate.push(`/${id}/`)

        if (timeslots!== undefined && sDate === undefined) {
            setDate(timeslots.slot[0])
        }

    },[config,timeslots])

    useEffect(()=>{
        if (sDate === undefined) return;
        const times = [...sDate.slotam,...sDate.slotpm].filter(i=>i.enable === 1)
        setTime(times[0])
    },[sDate])


    //////////////////////////////////////////////////////////////////////////// functions
    // const onClick = async (dept) => {
    //     toggle(true)
    //     setSelected(dept)
    //     const services = await fetchServices(config.server,lang,sBranch.mid,dept.dept_id);
    //     toggle(false)
    //     console.log('services',services);
    //     if(services.error) setError(services.error)
    //     else{
    //         dispatch(selectDepartment(dept))
    //         dispatch(setServices(services[0]))
    //         navigate.push(`/${id}/s`)
    //     }
    // }

    const Card = styled.div`
        width           : 300px;
        border          : 1px solid ${theme?theme.primarylight:'rgba(0,0,0,0.2)'};
        border-width    : 1px 1px 1px 6px ;
        border-radius   : 5px;
        margin          : 0 16px 8px;
        display         : flex;
        align-items     : center;
        background      : white;
        overflow        : hidden;
        opacity         : ${p=>p.opacity};
    `

    const Select = styled.select`
        padding     : 8px 16px;
        width       : 300px;
        border      : 1px solid rgba(0,0,0,0.2);
        background  : white;
    `
    const Option = styled.option`
        padding     : 8px 16px;
        width       : 300px;
        color       : black;
        background  : white;
        display     : flex;
        white-space : pre;
        min-height  : 20px;
        padding     : 0px 2px 1px;
        text-align  : center;
    `
    const Date = styled.div`
        padding         : 6px 16px;
        margin          : 4px 0;
        background      : ${p=>p.selected?'#AC8C5E':'white'};
        color           : ${p=>p.selected?'white':'black'};
        border-radius   : 6px;
        box-shadow      : 0px 0px 2px 2px rgba(217, 228, 233, 0.5);
        opacity         : ${p=>p.enable?1:0.3};
    `

    //.slotam.map((item,i)=><div>{item.time}</div>)

    //////////////////////////////////////////////////////////////////////////// define UI
    return <Container flex={1} align='center' overflowy='auto' overflowx='hidden'>
        <div style={{width:'200%',height:5,background:theme&&theme.primary}} />
        <Logo width='150px' margin='16px'/>
        <Text margin='0 0 16px'>Timeslots</Text>
        <Select onChange={e=>setDate(timeslots.slot.find(i=>i.date === e.target.value))} value={sDate&&sDate.date}>
            { timeslots && timeslots.slot.map((item,i)=><Option key={i} value={item.date}>{item.date}</Option>) }
        </Select>
        <div style={{display:'flex',width:300,flexWrap:'wrap',justifyContent:'space-between',margin:'16px 0'}}>
        <div style={{width:'100%',textAlign:'left'}}>Morning</div>
        {
            sDate && [...sDate.slotam,...sDate.slotpm].map((item,i)=>
            <Date key={i} enable={item.enable==1} selected={item.time === sTime.time} onClick={()=>setTime(item)}>{item.time}</Date>)
        }
        </div>
        <div style={{width:'300px',background:'dodgerblue',margin:16,padding:'8px 16px',color:'white',borderRadius:5}}>NEXT</div>
        <Container flex={1}/>
        <div style={{width:'200%',height:5,background:theme&&theme.primary}} />
        <Background opacity={0.4}/>
        <Error message={error} show={error!=''} onClose={()=>setError('')} />
    </Container>


    //////////////////////////////////////////////////////////////////////////// END
}
export default Component;
