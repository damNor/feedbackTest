import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {fetchQuestions} from './../../data/api'
import Cookies from 'universal-cookie'
import Section from "./Section";

// Mateial UI
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import './../../block.css';
import Container,{Content} from './../../componentsv2/container'
import Button,{BackButton} from './../../componentsv2/button'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
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

    const [loading,toggle]  = useState(false)
    const [valid,setValid]  = useState(false)
    
    const sdept                 = useSelector(state=>state.select.department)
    const srating               = useSelector(state=>state.select.rating)
    const sfilleddepartment     = useSelector(state=>state.select.filledDepartment)
    const [detail,setDetail]    = useState({})

    // sample 
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        formControl: {
          margin: theme.spacing(3),
        },
      }));
    
    const classes = useStyles();
    const [state, setState] = React.useState({
      gilad: true,
      jason: false,
      antoine: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    const { gilad, jason, antoine } = state;
    const errorForm = [gilad, jason, antoine].filter((v) => v).length !== 2;
  
    // sample End
    useEffect(()=>
    {
        console.log('sdept',sdept)
        console.log('srating',srating)
        console.log('sfilleddepartment',sfilleddepartment)

        const fetchData = async () =>  
        {
            // toggle(true)
            const detail = await fetchQuestions(config.server,lang,sdept,srating)
            setDetail(detail);
            console.log('detail',detail.filterQuestions);
            // toggle(false)
        };

        fetchData()
    },[])

    const onClick = async () =>
    {
        toggle(true)
        let formData = {}
        forms.map(item=>formData[item.keyword] = item.value)
        console.log('formData ',formData);
        toggle(false)
        navigate.push(`/${id}/q`)
    }

    return <>
        <Loader>
        <Content style={{backgroundColor:'#FFFFFF'}}>
            <Container background='#FFFFFF' width='100%' height='13%' align='center' margin='5% 0 0 0'  >
                {console.log('detail',detail)}
                {detail.filterDepartment && detail.filterDepartment.map(  (data) => 
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
                <div style={{width:'40%',textAlign:'center',display:'block',margin:'0 auto',fontFamily:'roboto'}}>
                    <Text size='1rem' mcolor='#0072BC' weight='400'>
                        Which aspect(s) do you rate as average / poor / very poor? 
                        You may select 1 or more and then click submit.
                    </Text>
                </div>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Which aspect(s) do you rate as average / poor / very poor? 
                        You may select 1 or more and then click submit.</FormLabel>
                                <FormGroup> 
                                {console.log(detail[0].filterQuestions)}
                                
                                {detail.filterQuestions && Object.keys(detail.filterQuestions).map( (item,i ) => 
                                (
                                    
                                    <>
                                    <FormControlLabel
                                        control={<Checkbox checked={gilad } onChange={handleChange} name="gilad" />}
                                        label={detail.filterQuestions[item]}
                                    />
                                    </>
                                ))}
                                </FormGroup>
                        </FormControl>
                    
                <Button 
                    width='320px' 
                    mColor='#3E474F' 
                    label='Ok' 
                    onClick={onClick} 
                    mloading={loading} 
                    enable={valid} 
                    isPrimary
                    alignself="center" />
            </Container>
            <BackButton />
            <Container flex={2} />
            <Container className="container" margin="5% 0 0 0" >
                
            </Container>

            <Container flex={3}/>
        </Content>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
