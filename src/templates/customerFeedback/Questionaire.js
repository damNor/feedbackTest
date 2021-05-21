import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Section from "./Section";


import './../../block.css';
import Container,{Content} from './../../componentsv2/container'
import {BackButton} from './../../componentsv2/button'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Language from './../../components/language'
import Text from './../../componentsv2/text'

const Component = () => {
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

    const initialState = [false, false, false];

    function reducer(state, { type, index }) 
    {
        switch (type) 
        {
            case "expand-all":
                return [true, true, true];
            case "collapse-all":
                return [false, false, false];
            case "toggle":
                state[index] = !state[index];
                return [...state];
            case "toggleButton":
                state[index] = !state[index];
                return [...state];
            default:
                throw new Error();
        }
    }

    const ColoredLine = ({ color }) => (
        <hr
          style={{
            color: color,
            backgroundColor: color,
            height: 2,
          }}
        />
    );
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [state, setState] = React.useReducer(reducer, initialState);
    
    const onLoginFormSubmit = (e) => {
        e.prevenDefault();
        this.handleClose();
    }

    const departments = [
        { id: "1", title: "Reception / Concierge / Information Counter"},
        { id: "2", title: "Accident & Emergency"},
        { id: "3", title: "Admission / Registration"},
        { id: "4", title: "Wards"},
        { id: "5", title: "Outpatient Clinics"},
    ];
    
    useEffect(()=>
    {
        if(config==undefined ||  (Object.keys(config).length == 0) )
        {
            // navigate.push(`/${id}/`); 
            return;
        }
         
    },[])

    return <>
        <Loader>
        <Content style={{backgroundColor:'#DDEEFE'}}>
            <Language alignself='flex-end'/>
            <Container background='#FFF' position='absolute' top='0' width='100%'>
                <Logo alignself='center' margin='5% 0 2% 0'/>
            </Container>
            <Container background='#0072BC' width='100%' height='13%' align='center' margin='11% 0 0 0'  >
                <Text size='1.2rem' mcolor='white' margin='4% 0 0'>
                    Good day, please select the serviceyou would like to rate.
                </Text>
            </Container>
            <BackButton />
            <Container flex={2} />
            <Container className="container" margin="15% 0 0 0" style={{overflowX:'scroll'}} >
                {departments.map(  (data) => 
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
