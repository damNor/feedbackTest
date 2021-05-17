import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {selectService,selectType,setTimeslots} from './../../data/actions'
import {fetchTimeslot} from './../../data/api'
import {FaMapMarkerAlt} from 'react-icons/fa'
import styled from 'styled-components'
import Loader from './loader'

import {colorShade} from './../../componentsv2/utils'
import Container,{Content,Card} from './../../componentsv2/container'
import Button,{BackButton} from './../../componentsv2/button'
import Background from './../../componentsv2/background'
import BottomBar from './../../componentsv2/bottombar'
import Loading from './../../componentsv2/loading'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

import Language from './../../components/language'

const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const features  = useSelector(state=>state.config.features)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = l => languages&&languages[l]?languages[l][lang]:''

    const sdept     = useSelector(state=>state.select.department)
    const sbranch   = useSelector(state=>state.select.branch)
    const services  = useSelector(state=>state.data.services)

    const [selected,setSelected]    = useState({})
    const [loading,toggle]          = useState(false)
    const [error,setError]          = useState()

    useEffect(()=>{
        if(services===undefined) navigate.push(`/${id}/`)
    },[services])

    const onQueueNow = (serv) => {
        // toggle(true)
        setSelected(serv)
        const navigateTo = () => {
            dispatch(selectService(serv))
            dispatch(selectType('queue'))
            navigate.push(`/${id}/f`)
        }

        if(config.features.geolocation){
            navigator.geolocation.getCurrentPosition(
                location=>{
                    //todo compare current location with serv location
                    const minimumradius = features.minimumradius??10
                    const distance = calculateDistance(location.coords.latitude, location.coords.longitude,sbranch.latitude, sbranch.longitude)
                    console.log('distance',distance,'<',minimumradius);
                    if(distance<=minimumradius) navigateTo()
                    else { setSelected({}); setError('Sorry you must be within '+minimumradius+'km to get in queue'); }
                },
                err=>{setSelected({}); setError('Please enable Geo Location to proceed');}
            )
            return;
        }
        navigateTo()
    }

    const onBooking = async (serv) => {
        toggle(true)
        setSelected(serv)
        // const response = await fetchTimeslot(config.server,lang,sbranch.mid,sdept.dept_id,serv.serv_id);
        const response = await fetchTimeslot(config.server,lang,2,sdept.dept_id,serv.serv_id);
        console.log('timeslot',response);
        toggle(false);
        if(response.error){setError(response.error); return;}

        dispatch(setTimeslots(response))
        dispatch(selectService(serv))
        dispatch(selectType('booking'))
        navigate.push(`/${id}/t`)
    }

    const Service0 = ({item}) => {
        const isSelected = selected.serv_id === item.serv_id
        return <Card direction='column' align='stretch'
            opacity={Object.keys(selected).length === 0 || isSelected?1:0.4}
            bg={isSelected?colorShade(theme&&theme.primary,150):'white'}
            border={`1px solid ${theme&&theme.primary}`}>
            <Container direction='row' align='flex-start' margin='10px 16px'>
                <Container flex={1}>
                    <Text size='16px' weight='bold' margin='0 0 6px'>{item.serv_name}</Text>
                    <Text size='12px' opacity={0.7} margin='0 0 4px'>{`In Queue : ${item.serv_total_wait??'-'} | Serving : ${item.serv_current_serving??'-'}`}</Text>
                    <Text size='12px' opacity={0.7}>{`ETA in ${item.serv_avg_wait_time??'0'} min`}</Text>
                </Container>
                <Loading show={isSelected && loading} />
            </Container>
            <Container direction='row' justify='flex-end' margin='4px 16px 12px' >
                {item.enable_apmt === 1 && <SButton mcolor='limegreen'   onClick={()=>onBooking(item)}>BOOK LATER</SButton>}
                {item.enable_getq === 1 && <SButton mcolor='deepskyblue' onClick={()=>onQueueNow(item)}>QUEUE NOW</SButton>}
                {item.enable_getq === -1&& <SButton mcolor='lightgrey' >QUEUE NOW</SButton>}
            </Container>
        </Card>
    }

    const Service1 = ({item}) => {
        const isSelected = selected.serv_id === item.serv_id
        return <Card direction='column' align='stretch'
            opacity={Object.keys(selected).length === 0 || isSelected?1:0.4}
            >
            <Container direction='row' align='flex-start' margin='10px 16px'>
                <Container flex={1}>
                    <Text size='16px' weight='bold' margin='0 0 6px' isPrimary>{item.serv_name}</Text>
                    <Text size='12px' opacity={0.7} margin='0 0 4px'>{`In Queue : ${item.serv_total_wait??'-'} | Serving : ${item.serv_current_serving??'-'}`}</Text>
                    <Text size='11px' opacity={0.7}>{`ETA in ${item.serv_avg_wait_time??'0'} min`}</Text>
                </Container>
                <Loading show={isSelected && loading} />
            </Container>
            <Container direction='row' justify='flex-end' margin='4px 16px 12px' >
                {item.enable_apmt === 1 && <SButton mcolor='limegreen'   onClick={()=>onBooking(item)}>BOOK LATER</SButton>}
                {item.enable_getq === 1 && <SButton mcolor='deepskyblue' onClick={()=>onQueueNow(item)}>QUEUE NOW</SButton>}
                {item.enable_getq === -1&& <SButton mcolor='lightgrey' >QUEUE NOW</SButton>}
            </Container>
        </Card>
    }

    return <Loader>
    <Content>
        <BackButton />
        <Logo margin='16px'/>
        {/*<Label bg={theme&&theme.primary}>{sdept&&sdept.dept_name}</Label>*/}
        <Text width='320px' margin='0 0 16px' size='13px' opacity={0.7}>Services</Text>
        { services && services.map((item,i)=><Service0 key={i} item={item}/>) }
    </Content>
    <Background/>
    <BottomBar/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
const calculateDistance = (lat,lng,lat2,lng2) => {
    const toRad  = i => i*Math.PI/180
    const rlad   = toRad(lat)
    const rlad2  = toRad(lat2)
    const rtheta = toRad(lng2 - lng)
    let dist     = Math.sin(rlad) * Math.sin(rlad2) + Math.cos(rlad) * Math.cos(rlad2) * Math.cos(rtheta)
    if(dist>1) dist = 1
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    return dist * 1.609344 //convert to km
}

const SButton = styled.div`
    color       : ${p=>p.mcolor};
    padding     : 0 0 0 16px;
    cursor      : pointer;
    font-weight : bold;
`
const Label = styled.div`
    border          : 1px solid ${p=>p.bg};
    background      : ${p=>p.bg};
    padding         : 12px 16px;
    justify-content : center;
    width           : 320px;
    color           : white;
    display         : flex;
    font-weight     : bold;
    border-radius   : 5px;
`
const Deco = styled.div`
    background      : ${p=>p.bg};
    align-self      : stretch;
    border-radius   : 6px;
    width           : 5px;
    margin          : 2px;
`

export default Component;
