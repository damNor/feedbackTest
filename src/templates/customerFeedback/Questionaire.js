import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams,Link} from 'react-router-dom'
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

    const ratings = useSelector(state=>state.rating.departments)

    const [error,setError]  = useState()
    const [forms,setForms]  = useState([])

    const departments  = useSelector(state => state.data.departments)

    useEffect(() => 
    {
        // console.log("ratings",ratings);

        const fetchData = async () =>  
        {
            const departments = await fetchHospitalDepartments(config.server,lang)
            dispatch(setDepartments(departments))
            // console.log('departments',departments)
        };

        fetchData()
    },[]);

     

    return <>
        <Loader>
        <Content style={{backgroundColor:'#DDEEFE'}} position='absolute'>
            <Container background='#FFF'  align='center' top='0' width='100%' wrap='wrap'>
                <Link to='/feedback'>
                    <Logo alignself='center' margin='5vh 0 5vh 0' width='40vw'/>
                </Link>
            </Container>
            <Container background='#0072BC' width='100%' display='box' align='center' wrap='wrap' margin='0 0 0 0'  >
                <Text size='3vw' mcolor='white' margin='2vw 2vw' lineHeight='' textalign='center'>
                    Good day, please select the service you would like to rate.
                </Text>
            </Container>
            {/* <BackButton /> */}
            <Container flex={2} />
            <Container className="" width="96%"  margin="2vw 2vw">
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
