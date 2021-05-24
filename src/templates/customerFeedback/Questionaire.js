import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Section from "./Section";
import {fetchHospitalDepartments} from './../../data/api'
import { setDepartments } from '../../data/actions';


import Container,{Content} from './../../componentsv2/container'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'


const Component = () => 
{
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const cookies   = new Cookies()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = lbl => languages&&languages[lbl]?languages[lbl][lang]:""
    const [error,setError]  = useState()
    const [forms,setForms]  = useState([])

    const departments  = useSelector(state => state.data.departments)

    useEffect(() => 
    {
        // if(config==undefined ||  (Object.keys(config).length == 0) )
        // {
        //     console.log('config undefined',config.server)
        //     navigate.push(`/${id}/`); 
        //     return;
        // }  

        const fetchData = async () =>  
        {
            const departments = await fetchHospitalDepartments(config.server,lang)
            dispatch(setDepartments(departments))
            console.log('departments',departments)
        };

        fetchData()
    },[]);

     

    return <>
        <Loader>
        <Content style={{backgroundColor:'#DDEEFE'}}>
            <Container background='#FFF' position='absolute' top='0' width='100%'>
                <Logo alignself='center' margin='5% 0 2% 0'/>
            </Container>
            <Container background='#0072BC' width='100%' height='13%' align='center' margin='17% 0 0 0'  >
                <Text size='1.2rem' mcolor='white' margin='4% 0 0'>
                    Good day, please select the serviceyou would like to rate.
                </Text>
            </Container>
            {/* <BackButton /> */}
            <Container flex={2} />
            <Container className="container" margin="5% 0 0 0">
                {departments && departments.map(  (data) => 
                (
                    <>
                        <Section 
                        title={data.title}
                        section={data.id} 
                        template='feedback'
                        >
                        <div className="content"></div>
                        </Section>
                    </>
                ))}
            </Container>

            <Container flex={3}/>
        </Content>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
