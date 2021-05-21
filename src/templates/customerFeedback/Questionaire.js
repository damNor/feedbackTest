import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Block from "./Block1";

import StarRating from './StarRating'
import CustomizedRatings from './CustomizedRatings'
import HoverRating from './HoverRating'

import { Modal, Button} from "react-bootstrap"
import LoginForm from "./LoginForm";
import "bootstrap/dist/css/bootstrap.css"

import './../../block.css';
import Container,{Content} from './../../componentsv2/container'
import {BackButton} from './../../componentsv2/button'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Language from './../../components/language'
 

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
            <Container style={{backgroundColor:'#FFF',position:'absolute',top:0}} width='100%'>
                <Logo alignself='center' margin='5% 0 2% 0'/>
            </Container>
            <BackButton />
            <Container flex={2} />
            <Container className="container" margin="15% 0 0 0" style={{overflowX:'scroll'}} >

                
                <Button style={{background:'#007bff'}} variant="primary" onClick={handleShow} >Launch</Button> 
               
                <StarRating />
                <br />
                <CustomizedRatings />
                <br />
                <HoverRating /> 
                <br />
                <br />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center" style={{width:'100%'}}>Please Select</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm onSubmit={onLoginFormSubmit} />
                    </Modal.Body> 
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>        

                <Block 
                    title="1. Reception / Concierge / Information Counter"
                    section="1"
                    >
                    <div className="content"></div>
                </Block>
                <Block
                    title="2. Accident & Emergency"
                    section="2"
                    >
                    <div className="content"></div>
                </Block>
                <Block
                    title="3. Admission / Registration"
                    isOpen={state[2]}
                    onToggle={() => setState({ type: "toggle", index: 2 })} 
                    template={id} 
                    section="3" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="4. Wards"
                    isOpen={state[3]}
                    onToggle={() => setState({ type: "toggle", index: 3 })} 
                    template={id} 
                    section="4" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="5. Outpatient Clinics"
                    isOpen={state[4]}
                    onToggle={() => setState({ type: "toggle", index: 4 })} 
                    template={id} 
                    section="5" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="6. Health Screening Centre"
                    isOpen={state[5]}
                    onToggle={() => setState({ type: "toggle", index: 5 })} 
                    template={id} 
                    section="6" >
                    <div className="content"></div>
                </Block>
                <Block
                    title="7. Lab"
                    isOpen={state[6]}
                    onToggle={() => setState({ type: "toggle", index: 6 })}
                    template={id} 
                    section="7" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="8. Imaging"
                    isOpen={state[7]}
                    onToggle={() => setState({ type: "toggle", index: 7 })} 
                    template={id} 
                    section="8" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="9. Rehab"
                    isOpen={state[8]}
                    onToggle={() => setState({ type: "toggle", index: 8 })} 
                    template={id} 
                    section="9" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="10. Billing / Cashier / Accounts"
                    isOpen={state[9]}
                    onToggle={() => setState({ type: "toggle", index: 9 })} 
                    template={id} 
                    section="10" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="11. Pharmacy"
                    isOpen={state[10]}
                    onToggle={() => setState({ type: "toggle", index: 10 })} 
                    template={id} 
                    section="11" >
                    <div className="content"></div>
                </Block>

                <Block
                    title="12. Security Services"
                    isOpen={state[11]}
                    onToggle={() => setState({ type: "toggle", index: 11 })} 
                    template={id} 
                    section="12" >
                    <div className="content"></div>
                </Block>
            </Container>

            <Container flex={3}/>
        </Content>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
