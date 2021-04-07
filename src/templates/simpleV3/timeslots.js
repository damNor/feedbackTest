import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {selectTimeslot} from './../../data/actions'
import {animated,useSpring} from 'react-spring'
import {FaMapMarkerAlt} from 'react-icons/fa'
import styled from 'styled-components'
import moment from 'moment'

import Container,{Content,Card} from './../../componentsv2/container'
import Button,{BackButton} from './../../componentsv2/button'
import Background from './../../componentsv2/background'
import BottomBar from './../../componentsv2/bottombar'
import Loading from './../../componentsv2/loading'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = l => languages&&languages[l]?languages[l][lang]:""

    const services  = useSelector(state=>state.data.services)
    const timeslots = useSelector(state=>state.data.timeslots)
    const sserv     = useSelector(state=>state.select.service)
    const sdept     = useSelector(state=>state.select.department)

    const [date,setDate]    = useState({date:''})
    const [time,setTime]    = useState({time:''})
    const [loading,toggle]  = useState(false)
    const [error,setError]  = useState()

    useEffect(()=>{
        if(timeslots===undefined){ navigate.push(`/${id}/`); return; }
        setDate((timeslots.slot[0]))
    },[timeslots])

    useEffect(()=>{
        if(date.slotam && date.slotpm) setTime([...date.slotam,...date.slotpm].find(el=>el.enable===1 && el.slotbal>0))
    },[date])

    const Date = ({item,pos}) => {
        const selected = date.date === item.date
        const color0   = selected?'white':'#333333'
        const color1   = selected?'white':theme&&theme.primary
        const opacity  = selected?1:0.5
        return <>
        <Card width='70px' margin='0' padding='8px 0' align='center' direction='column'
            bg={selected?theme&&theme.primary:'white'}
            border={selected?('1px solid '+theme&&theme.primary):'1px solid rgba(0,0,0,0.2)'}
            onClick={()=>setDate(item)}>
            <Text size='12px' mcolor={color0} opacity={opacity}>{moment(item.date).format('MMM')}</Text>
            <Text size='32px' mcolor={color1} margin='4px' weight='bold'>{moment(item.date).format('D')}</Text>
            <Text size='12px' mcolor={color0} opacity={opacity}>{moment(item.date).format('ddd')}</Text>
        </Card>
        <Container width='10px'/>
        </>
    }

    const Time = ({item,pos})=>{
        const enable   = item.enable && item.slotbal>0
        const selected = time.time === item.time
        const color    = selected?'white':'rgba(0,0,0,0.8)'
        const toggle   = useSpring({
            opacity    : enable? 1:0.3,
            background : selected? theme&&theme.primary : 'white',
            border     : selected? ('1px solid '+theme&&theme.primary):'1px solid rgba(0,0,0,0.1)'
        })

        return <>
        <Card width='70px' margin='0 0 10px' justify='center' padding='8px 0' style={toggle}
            onClick={()=>{if(enable)setTime(item)}}>
            <Text mcolor={color} size='12px'>{to12h(item.time)}</Text>
        </Card>
        <Container width='10px'/>
        </>
    }

    const onClick = () => {
        console.log('click');
        dispatch(selectTimeslot({date:date.date,time:time.time}))
        navigate.push(`/${id}/f`)
    }

    return <Loader>
    <Content>
        <BackButton />
        <Logo margin='16px'/>
        {/*<Label bg={theme&&theme.primary}>{sdept&&sdept.dept_name}</Label>*/}
        <Text margin='0 16px 16px' opacity={0.7} width='320px' size='13px'>Timeslots</Text>

        <Text margin='0 0 8px' width='320px' size='12px'>Date</Text>
        <Container direction='row' width='320px' overflowx='auto' padding='0 0 16px'>
            { timeslots&&timeslots.slot.map((item,i)=><Date key={i} pos={i} item={item}/>) }
        </Container>

        <Text margin='0 0 8px' width='320px' size='12px'>Morning Slot</Text>
        <Container direction='row' width='320px' wrap='wrap' margin='0 0 8px'>
            { date && date.slotam && date.slotam.map((item,i)=><Time key={i} pos={i} item={item}/>) }
        </Container>

        <Text margin='0 0 8px'  width='320px' size='12px'>Evening Slot</Text>
        <Container direction='row' width='320px' wrap='wrap'>
            { date && date.slotpm && date.slotpm.map((item,i)=><Time key={i} pos={i} item={item}/>) }
        </Container>

        <Button width='320px' margin='16px' label={'NEXT'} mloading={loading} enable={time&&time.time} onClick={onClick} isPrimary/>
    </Content>
    <Background/>
    <BottomBar/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

const to12h = t =>{
    const h = t.split(':')[0]
    const m = t.split(':')[1]
    return h<12? `${h}:${m} AM`: `${h>12?h-12:12}:${m} PM`
}

const Label = styled.div`
    border          : 1px solid ${p=>p.bg};
    background      : ${p=>p.bg};
    padding         : 12px 16px;
    justify-content : center;
    align-items     : center;
    width           : 320px;
    color           : white;
    display         : flex;
    flex-direction  : column;
    font-weight     : bold;
    border-radius   : 5px;
`

export default Component;
