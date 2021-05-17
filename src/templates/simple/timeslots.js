import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchTimeslots} from './../../data/api/timeslots'
import {selectTimeslot} from './../../data/actions'
import {VERSION,CONFIG_PATH} from './'
import Helmet from "react-helmet";

////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => 
{
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id}       = useParams()
    const config     = useSelector(state=>state.config)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages  = useSelector(state=>state.config.languages)
    const timeslots  = useSelector(state=>state.data.timeslots)
    const [selectedDate,setSelectedDate] = useState(undefined)
    const [selectedTime,setSelectedTime] = useState({})
    const [loading,setLoading]   = useState(false);


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>
    {
        console.log('timeslots ' ,timeslots);
        if(Object.keys(config).length === 0 || timeslots === undefined)
            navigate.push('/'+id+'/')
        else if (timeslots.length>0)
            setSelectedDate(timeslots[0])
    },[config,timeslots])

    useEffect(()=>{
        if(selectedDate===undefined) return;
        setSelectedTime(selectedDate.time[0])
    },[selectedDate])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClickDate = date => setSelectedDate(date)

    const onClickTime = time => setSelectedTime(time)

    const onNextClick = () =>{
        dispatch(selectTimeslot({date:selectedDate.date,time:selectedTime.time}))
        navigate.push('/'+id+'/f')
    }


    //////////////////////////////////////////////////////////////////////////// define components
    const Date = ({date}) => <Container
        border="1px solid rgba(0,0,0,0.2)"
        borderradius="5px"
        padding='8px 16px'
        margin="6px"
        width='100px'
        align='center'
        background={selectedDate===undefined?'':selectedDate.date === date.date?'whitesmoke':''}
        cursor='pointer'
        onClick={()=>onClickDate(date)}>
        <Text>{date.date}</Text>
    </Container>

    const Time = ({time}) => <Container
        border="1px solid rgba(0,0,0,0.2)"
        borderradius="5px"
        padding='8px 16px'
        margin="6px"
        width='100px'
        align='center'
        cursor='pointer'
        background={selectedTime.time === time.time?'whitesmoke':''}
        onClick={()=>onClickTime(time)}>
        {time.time}
    </Container>


    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
        <Helmet>
            <title>Timeslot Page</title>
        </Helmet>
        <Container flex={1} padding='16px' align='center'>
        <img src={CONFIG_PATH + id + "/images/logo.png"} style={{width:200}}/>
        <Text margin='8px 0'>Timeslots</Text>
        <Text padding='8px 6px 0' mwidth='450px' textalign='left'>Choose Date</Text>
        <Container direction='row' width='450px' wrap='wrap'>
        {
            timeslots === undefined?'':
            timeslots.map(  (item,i)=>
                <Date key={i} date={item} />
            )
        }
        </Container>
        <Text padding='8px 6px 0' mwidth='450px' textalign='left'>Choose Time</Text>
        <Container direction='row' width='450px' wrap='wrap'>
        {
            selectedDate === undefined?'':
            selectedDate.time.map(  (item,i)=>
                <Time key={i} time={item} />
            )
        }
        </Container>
        <Button isPrimary
            width='220px'
            label='NEXT'
            margin="16px 0"
            onClick={onNextClick}
        />
    </Container>
    </>

    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
