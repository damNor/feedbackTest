import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {validateV3} from './../../data/api'
import Loader from './loader'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
/* 
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {
    fade,
    withStyles,
  } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase'; 
*/
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from 'universal-cookie'
import { GoogleReCaptchaProvider, GoogleReCaptcha} from 'react-google-recaptcha-v3';
import Container,{Content,Card} from './../../componentsv2/container'
import Button,{BackButton} from './../../componentsv2/button'
import Background from './../../componentsv2/background'
import Loading from './../../componentsv2/loading'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

import Language from './../../components/language'

const recaptchaVer = 'v3'

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

    const sbranch   = useSelector(state=>state.select.branch)
    const sdept     = useSelector(state=>state.select.department)
    const stimes    = useSelector(state=>state.select.timeslot)
    const sserv     = useSelector(state=>state.select.service)
    const stype     = useSelector(state=>state.select.type)

    const [forms,setForms]  = useState([])
    const [loading,toggle]  = useState(false)
    const [valid,setValid]  = useState(false)
    const [error,setError]  = useState()

    useEffect(()=>{
        if(config == undefined || (Object.keys(config).length == 0) )
        {
            navigate.push(`/${id}/`); 
            return;
        }
        console.log("config formsv2",config );
        const formsetups = (config.formsv2["1"]??config.formsv2.default)??config.forms
        setForms(formsetups)
    },[])

    const handleSubmit = () => {
        navigate.push(`/${id}/finish`); 
    }

    const onVerify = async (token) =>{
        // console.log('token',token);

        // below code should be implemented in the server
        const resp = await validateV3('6LenHygaAAAAAOQ3v7G4NNetz4gV-W_j6jVy1gfR',token)
        setValid(resp.success)

        // console.log('resp',resp);
    }

    return <Loader>
     
    {/* {
        recaptchaVer === 'v3' &&
        <GoogleReCaptchaProvider reCaptchaKey="6LenHygaAAAAALCX2Uwh6iLTOg9zIMiFY1o7Qg1h">
            <GoogleReCaptcha onVerify={onVerify}/>
        </GoogleReCaptchaProvider>
    } */}
    <Content style={{backgroundColor:'#DDEEFE'}}  position='absolute'>
        <Container background='#FFF'  align='center' top='0' width='100%' wrap='wrap'>
            <Logo alignself='center' margin='5vh 0 5vh 0' width='40vw'/>
        </Container>
        <Container background='' width='100%' display='box' align='center' wrap='wrap' margin='0 0 0 0'  >
            <Text size='3vw' mcolor='#0072BC' margin='5vw 2vw' lineHeight='' textalign='center'>
            Your Information
            </Text>
        </Container>
        <BackButton />
        <Container margin='10% 0 0 0' width='100%'>
            {/* <Card width='320px' padding='2px' margin='0 auto' direction='column'> */}
            <Container width='80%' alignself='center '>
                <Form>
                {
                    forms.map((item,i) => item.show && 
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{fontWeight:'bolder'}}>{item.label}</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    )
                }
                </Form>
                {
                    recaptchaVer === 'v2'&&
                    <ReCAPTCHA
                        style={{selfAlign:'center',margin:'16px 0 0'}}
                        sitekey={"6LdwSMQZAAAAANPSKk0dCnxLEOBCXpTJfp6Qk9cq"}
                        onChange={val=>setValid(val!==undefined)} />
                }
            {/* </Card> */}
            </Container>
    
            <Container position='relative' bottom='0vh' width='100%'>
                <Button 
                        width='80%' 
                        mColor='#06B017' 
                        label='Submit' 
                        onClick={handleSubmit} 
                        mloading={loading} 
                        // enable={valid} 
                        isPrimary
                        alignself="center" />
            </Container>    
        </Container>
    </Content>
    <Background/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

export default Component;
