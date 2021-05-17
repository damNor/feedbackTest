import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchTimeslots} from './../../data/api/timeslots'
import {selectService,setTimeslots} from './../../data/actions'
import Helmet from "react-helmet";

////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Loading from './../../components/loading'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id}       = useParams()
    const config     = useSelector(state=>state.config)
    const theme      = useSelector(state=>state.config.theme)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages  = useSelector(state=>state.config.languages)
    const services   = useSelector(state=>state.data.services)
    const [selected,setSelected] = useState({})
    const [loading,setLoading]   = useState(false);


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || services === undefined)
        navigate.push('/'+id+'/')
    },[config,services])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async(service) =>
    {
        console.log('click service');
        setSelected(service)
        dispatch(selectService(service))
        navigate.push('/'+id+'/f')

        // assume not booking but straight get q
        const response = await fetchTimeslots();
        console.log('onClick service response ',response);
        if(response.error)
        {
            //todo
            console.log('response.error');
        }else
        {
            console.log('response run');
            dispatch(selectService(service));
            console.log('response run 1');
            dispatch(setTimeslots(response));
            console.log('response run 2');
            navigate.push('/'+id+'/t');
        }
    }


    //////////////////////////////////////////////////////////////////////////// define components
    const Services = ({service}) => <Container
        border="1px solid rgba(0,0,0,0.2)"
        borderradius="5px"
        padding='16px'
        margin="4px 0"
        width='350px'
        background={service.serv_id === selected.serv_id?'ghostwhite':''}>
        <Text weight='bold'>{service.serv_name}</Text>
        <Text size='12px' margin='2px 0 0 0' mColor='rgba(0,0,0,0.5)'>In Queue: 0 {'\u00A0\u00A0'} Serving: -</Text>
        <div style={{display:'flex',alignSelf:'stretch'}}>
            <Container
                border='1px solid rgba(0,0,0,0.5)'
                borderradius='4px'
                padding='6px 16px'
                margin='16px 16px 0 0'
                cursor='pointer'
                onClick={()=>onClick(service)}
                ><Text size='12px'>GET QUEUE</Text>
            </Container>
            <Container
                border='1px solid rgba(0,0,0,0.5)'
                borderradius='4px'
                padding='6px 16px'
                margin='16px 16px 0 0'
                display='none'
                ><Text size='12px'>BOOK APPOINTMENT</Text>
            </Container>
        </div>
    </Container>


    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
    <Helmet>
        <title>Service Page</title>
    </Helmet>
    <Container flex={1} align='center'>
        <Text margin='16px 0 8px'>Services</Text>
        {
            services === undefined?'':
            services.map((item,i)=><Services key={i} service={item} />)
        }
        {loading?<Loading />:''}
    </Container>
    </>

    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
