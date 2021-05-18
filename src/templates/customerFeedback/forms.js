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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

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

    const themeprovider = createMuiTheme({
        typography: { fontFamily: [theme&&theme.font,
            'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue','sans-serif'
        ].join(',') }
    });

    useEffect(()=>{
        if(config == undefined || (Object.keys(config).length == 0) )
        {
            navigate.push(`/${id}/`); 
            return;
        }
        console.log("formsv2",config );
        const formsetups = (config.formsv2["1"]??config.formsv2.default)??config.forms
        setForms(formsetups)
    },[])

    const onClick = async () =>
    {
        toggle(true)
        let formData = {}
        forms.map(item=>formData[item.keyword] = item.value)
        console.log('formData ',formData);
        toggle(false)
        navigate.push(`/${id}/q`)
        
        /* 
        if (stype === 'queue')
        {
            const rqueue = await getQueueNumber(config.server,sbranch.mid,sdept.dept_id,sserv.serv_id,customer);
            toggle(false)
            console.log("queue",rqueue);
            if(rqueue.error){ setError(rqueue.error); return; }
            navigate.push(`/${id}/q/${rqueue.qr_info}`)
        }
        else if (stype === 'booking')
        {
            const rbook = await bookappointment(
                config.server,
                sbranch.mid,
                sdept.dept_id,
                sserv.serv_id,
                stimes.date,
                stimes.time,
                customer.customer_name,
                customer.customer_id,
                customer.phone_no,
                customer.customer_id)
            toggle(false)
            console.log('booking',rbook);
            if(rbook.error){ setError(rbook.error); return; }
            const mstorage  = localStorage.getItem('booking')??'[]'
            const history   = JSON.parse(mstorage)
            history.push(rbook)
            localStorage.setItem('booking',JSON.stringify(history))
            navigate.push(`/${id}/a`)
        } 
        */
    }

    const onVerify = async (token) =>{
        // console.log('token',token);

        // below code should be implemented in the server
        const resp = await validateV3('6LenHygaAAAAAOQ3v7G4NNetz4gV-W_j6jVy1gfR',token)
        setValid(resp.success)

        // console.log('resp',resp);
    }

   /*  
   const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        margin: {
          margin: '5px 0',
        }
    }));

    const classes = useStyles();

    const BootstrapInput = withStyles((theme) => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(2),
          },
        },
        input: {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.common.white,
          border: '1px solid #ced4da',
          fontSize: 16,
          fontWeight:'bolder',
          width: '120',
          fullWidth:true,
          padding: '2px 3px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }))(InputBase); 
      */

    return <Loader>
    <ThemeProvider theme={themeprovider}>
    {
        recaptchaVer === 'v3' &&
        <GoogleReCaptchaProvider reCaptchaKey="6LenHygaAAAAALCX2Uwh6iLTOg9zIMiFY1o7Qg1h">
            <GoogleReCaptcha onVerify={onVerify}/>
        </GoogleReCaptchaProvider>
    }
    <Content style={{backgroundColor:'#DDEEFE'}}>
        <Language alignself='flex-end'/>
        <Container style={{backgroundColor:'#FFF',position:'absolute',top:0}} width='100%'>
            <Logo alignself='center' margin='5% 0 2% 0'/>
        </Container>
        <BackButton />
        <Container margin='15% 0 0 0' width='100%'>
            
            <Text size='16px' textalign='center' margin='5% 10%' weight='bold'  isPrimary>{getL('wlc_sec')}</Text>
            {/* <Card width='320px' padding='2px' margin='0 auto' direction='column'> */}
            <Container width='50%' alignself='center '>
                <Form>
                {
                    forms.map((item,i) => item.show && 
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontWeight:'bolder'}}>{item.label}</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                
                        // <TextField key={i}
                        // style={{margin:'0 0 8px'}}
                        // label={item.label}
                        // value={item.value}
                        
                        // InputLabelProps={{ shrink: true }} 
                        // fullWidth />
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
            <Button width='320px' 
                mColor='#3E474F' 
                label={stype==='queue'?'Start Rating':'Start Rating'} 
                onClick={onClick} 
                mloading={loading} 
                // enable={valid} 
                isPrimary
                alignself="center"
                />
        </Container>
    </Content>
    <Background/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </ThemeProvider>
    </Loader>
}

export default Component;
