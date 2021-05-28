import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {fetchQuestions} from './../../data/api'
import Cookies from 'universal-cookie'
import Section from "./Section";
import { setFilledDepartment } from './../../data/actions'

// Mateial UI
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

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

    const[location, setLocation]        = useState({
        location : ''
    });
    const[departments, setDepartments] = useState({}) // for selected object

    const sdept                 = useSelector(state=>state.select.department)
    const srating               = useSelector(state=>state.select.rating)
    const sfilleddepartment     = useSelector(state=>state.select.filledDepartment)

    const [detail,setDetail]                    = useState({})
    const [showInputField, setShowInputField]   = useState(false)

    const [checkboxState, setCheckboxState]     = useState({
        checkBoxObj: {} 
    });

    // const filledState = initialState;

    /* 
    const { checkBoxObj } = checkboxState;

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        
        },
        formControl: {
            margin:'10px 12px'
        },
        label: {
            fontSize: '3.2vw',
            margin: '3px',
          },
      }));

    const classes = useStyles();  

    const checkBoxStyles = theme => ({
        root: {
          '&$checked': {
            color: '#0072BC',
          },
          padding:1,
        },
        checked: {},
       })
    
    const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);   
    */

    const handleSubmit = async () =>
    {
        console.log('sdept ',sdept)
        const data = {
            type:"SET_FILLED_DEPARTMENT",
            payload:{
                departments:sdept,
                rating:srating
            }
        }; 
        dispatch(setFilledDepartment( data ))
        setDepartments(data)
    }

    const handleChange = (index) => 
    {
        /* setCheckboxState({
            checkBoxObj : {
                 ...checkBoxObj, ...{[index] : !checkBoxObj[index]} 
            }
        }) 
        console.log('checkBoxObj', checkBoxObj[index]); 
        console.log('checkBoxObj index', index); 

        if(index === 3 && (checkBoxObj[index] === false  || checkBoxObj[index] === undefined)){
            setShowInputField(true)  
            console.log('handleClick checkBoxObj');
        }
        else
            setShowInputField(false)
        */
        setCheckboxState({isChecked: !this.state.isChecked});
    };

    const handleClick = (event) => {
        
        /* 
        console.log('name',event.target.name)
        console.log('value',event.target.value) 
        console.log('checkedOne',checkedOne)
        */
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);

        if(checkedOne)
            setValid(true)
        else
            setValid(false)            
    }
  
    const handleChangeSelect = name => event => {
        setLocation({ name: event.target.value });
      };
    useEffect(()=>
    {
        // console.log('sdept',sdept)
        // console.log('srating',srating)
        // console.log('sfilleddepartment',sfilleddepartment)

        const fetchData = async () =>  
        {
            const detail = await fetchQuestions(config.server,lang,sdept,srating)
            setDetail(detail);
            console.log('detail ',detail);
        };

        fetchData()
    },[])

    const inputField = showInputField ? <input type='text' name='other_reason' /> : null

    return <>
        <pre>{JSON.stringify(departments, 2)}</pre>
        <Loader>
        <Content style={{backgroundColor:'#FFFFFF'}}>
            <Container background='#FFFFFF' width='100%' height='13%' align='center' margin='15% 0 0 0'  >
                
                {/* {console.log('detail',detail.title)} */}
                <Container margin='0 5%'>
                    {detail.department && detail.department.map(  (data) => 
                    (
                        <>
                            <Section 
                                title={data.title}
                                section={data.id} 
                                selectedRating={srating}
                                template='feedback'>
                                <div className="content"></div>
                            </Section>
                        </>
                    ))}
                    <Container margin='2% 5% 0 5%'>
                        {/* choose location  */}
                        <select
                            value={location.location}
                            onChange={handleChangeSelect('location')}
                            name="location" 
                            style={{margin:'2vw 0 4vw 0'}}
                            >
                            <option value="">Location</option>
                            <option value={1}>Ward 1</option>
                            <option value={2}>Ward 2</option>
                            <option value={3}>Ward 3</option>
                        </select>

                        <Text size='3vw' mcolor='#0072BC' weight='400'>
                            Which aspect(s) do you rate as average / poor / very poor? 
                            You may select 1 or more and then click submit.
                        </Text>

                        {/* {console.log(detail.questions)} */}
                        <Container style={{justifyContent:'center',margin:'3vw 0'}}>
                            {detail.questions && detail.questions.map( (item,i ) => 
                            (
                                <> 
                                    <div style={{textAlign:'left'}}>
                                        <input 
                                            onChange={() => handleChange(i)}
                                            id={i} 
                                            checked=""
                                            type="checkbox" 
                                            name={`questions[${i+1}]`} 
                                            value='true' 
                                            style={{margin:'1vw'}}
                                            />
                                        <label htmlFor={i}>{item}</label>
                                    </div>
                                    {/* 
                                    <FormControlLabel
                                        classes={{label : classes.label}}
                                        control={
                                            <CustomCheckbox 
                                            checked={checkBoxObj[i] || false} 
                                            onChange={() => handleChange(i)}  
                                            onClick={handleClick} 
                                            value='true' 
                                            name={`questions[${i+1}]`} 
                                            style={{transform:"scale(1.1)"}} 
                                            />
                                        }
                                        label={item} 
                                    /> 
                                    */}
                                    {/* {Object.keys(detail.questions).length -1} */}
                                    
                                    {/* {(Object.keys(detail.questions).length -1) === i ?  
                                        <input type='text'  />  : ''
                                    }  */}
                                </>
                            ))}
                            {inputField}
                        </Container>
                    </Container>
                    {/* 
                    <div style={{textAlign:'center',display:'block',margin:'0 auto',fontFamily:'roboto'}}>
                    </div> 
                    */}
                </Container>
            </Container>
            <BackButton />

            <Container position='absolute' bottom='10px'>
                <Button 
                        width='320px' 
                        mColor='#3E474F' 
                        label='Ok' 
                        onClick={handleSubmit} 
                        mloading={loading} 
                        enable={valid} 
                        isPrimary
                        alignself="center" />
            </Container>
            <Container flex={3}/>
        </Content>
        <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
    </>
}

export default Component;
