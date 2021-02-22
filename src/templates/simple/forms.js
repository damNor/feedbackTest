import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {getQueueNumber} from './../../data/api'
import {selectService,setTimeslots} from './../../data/actions'
import ReCAPTCHA from "react-google-recaptcha";


////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Input from './../../components/input'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate   = useHistory()
    const dispatch   = useDispatch()
    const {id}       = useParams()
    const config     = useSelector(state=>state.config)
    const lang       = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages  = useSelector(state=>state.config.languages)
    const selBranch  = useSelector(state=>state.select.branch);
    const selDept    = useSelector(state=>state.select.department);
    const selService = useSelector(state=>state.select.service)
    const cfgForms   = useSelector(state=>state.config.forms)
    const [loading,setLoading]   = useState(false);
    const [forms,setForms] = useState([])


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || selService === undefined)
        navigate.push('/'+id+'/')
    },[config,selService])

    useEffect(()=>{
        if(cfgForms === undefined) return;
        setForms(cfgForms)
    },[cfgForms])

    //////////////////////////////////////////////////////////////////////////// functions
    const onSubmit = async() => {
        console.log('click');
        console.log(forms);

        const customer = {
            'sysid' : '',
            'id'    : forms.find(e=> e.keyword === 'email').value,
            'name'  : forms.find(e=> e.keyword === 'name').value,
            'phone' : ''
        }
        console.log(customer);
        const response = await getQueueNumber(config.server,selBranch.mid,selDept.dept_id,selService.serv_id,customer);
        if(response.error){
        }else{
            console.log(response);
            localStorage.setItem('queue',JSON.stringify(response));
            navigate.push('/'+id+'/q/'+response.qr_info)
        }
    }

    //////////////////////////////////////////////////////////////////////////// define UI
    return <Container flex={1} padding='16px' align='center'>
        <Text margin='8px 0'>Forms</Text>
        {
            forms.map((item,i)=><Input key={i}
                type={item.type}
                label={item.label}
                value={item.val}
                margin='8px 16px'
                onChange={e=>{
                    setForms(forms.map(jitem=>jitem.id === item.id?{...jitem,...{value:e}}: jitem))
                }} />)
        }
        {/*<ReCAPTCHA
            style={{selfAlign:'center',margin:16}}
            sitekey={"6LdwSMQZAAAAANPSKk0dCnxLEOBCXpTJfp6Qk9cq"}
            onChange={(val)=>{console.log(val)}}
        />*/}
        <Button isPrimary
            width='220px'
            label='SUBMIT'
            onClick={onSubmit}
        />
    </Container>


    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
