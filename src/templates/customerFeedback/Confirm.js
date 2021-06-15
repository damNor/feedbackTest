import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams,Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Section from "./Section";
import {fetchHospitalDepartments} from './../../data/api'
import { setDepartments } from '../../data/actions';

import Container,{Content} from './../../componentsv2/container'
import Button from './../../componentsv2/button'
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

    const sratings = useSelector(state=>state.rating.departments)

    const [error,setError]  = useState()
    const [forms,setForms]  = useState([])
    const[filterState, setFilterState] = useState([])

    const departments                   = useSelector(state => state.data.departments)
    
    let state_of_departments                   = useSelector(state => state.rating.departments)
    
    console.log('state_of_departments ',state_of_departments)
    
    if(state_of_departments.length > 1)
    {
        state_of_departments   = [...new Map(state_of_departments.map(o => [o.departmentID,o])).values()]
        console.log('filter_state_of_departments ',state_of_departments)
    }
    
    if(state_of_departments.length == 0)
        navigate.push(`/${id}/`); 
    
    // setFilterState(state_of_departments);
    const highlight = Object.fromEntries(state_of_departments.map(item => [item.departmentID, item.rating]))
    console.log('highlight', highlight);

    const found = state_of_departments.some( elem => elem.departmentID === '2');
    console.log('found',found)

    const handleSubmit = async () => {
        navigate.push(`/${id}/info`);
    }

    useEffect(() => 
    {
        // console.log("selected ratings",sratings);
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
                {console.log('filterState',state_of_departments)}
                {departments && departments.map(  (data) => 
                (
                    <>
                        <Section 
                            title={data.title}
                            section={data.id} 
                            template='feedback'
                            selectedRating={highlight[data.id]} >
                            <div className="content"></div>
                        </Section>
                    </>
                ))}
            </Container>
           
            {/* <Container flex={3}/> */}
            <Container position='fixed' bottom='0vw' height='50px'>
                <Button 
                        width='320px' 
                        mColor='#3E474F' 
                        style={{background:'#3E474F'}}
                        label='Confirm' 
                        onClick={handleSubmit} 
                        // mloading={loading} 
                        // enable={valid} 
                        isPrimary
                        alignself="center" />
            </Container>
        </Content>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
