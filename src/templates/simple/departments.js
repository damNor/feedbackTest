import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices} from './../../data/api'
import {selectDepartment,setServices} from './../../data/actions'


////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Loading from './../../components/loading'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate      = useHistory()
    const dispatch      = useDispatch()
    const {id}          = useParams()
    const config        = useSelector(state=>state.config)
    const theme         = useSelector(state=>state.config.theme)
    const lang          = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages     = useSelector(state=>state.config.languages)
    const departments   = useSelector(state=>state.data.departments)
    const selBranch     = useSelector(state=>state.select.branch);
    const [selected,setSelected] = useState({})
    const [loading,setLoading]   = useState(false);


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || departments === undefined)
        navigate.push('/'+id+'/')
    },[config,departments])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async(department) =>{
        setSelected(department)
        setLoading(true)
        const response = await fetchServices(config.server,lang,selBranch.mid,department.dept_id);
        setLoading(false)
        if(response.error){
            //todo
        }else{
            dispatch(selectDepartment(department))
            dispatch(setServices(response[0].dept_service_data))
            navigate.push('/'+id+'/s')
        }
    }


    //////////////////////////////////////////////////////////////////////////// define components
    const Department = ({department}) => <Container
        border="1px solid rgba(0,0,0,0.2)"
        borderradius="5px"
        padding='16px'
        margin="4px 0"
        width='350px'
        background={department.dept_id === selected.dept_id?'ghostwhite':''}
        cursor='pointer'
        align='flex-start'
        direction='row'
        onClick={()=>onClick(department)}>
        <div style={{width:40,height:40,background:'lightblue',borderRadius:'50%'}}/>
        <Container margin='0 0 0 16px'>
            <Text weight='bold'>{department.dept_name}</Text>
            <Text size='12px' mColor='rgba(0,0,0,0.5)' margin='4px 0 2px'>Address: - </Text>
        </Container>
    </Container>


    //////////////////////////////////////////////////////////////////////////// define UI
    return <Container flex={1} align='center' overflowx='auto'>
        <Text margin='16px 0 8px'>Select Branch</Text>
        {
            departments === undefined?'':
            departments.map((item,i)=><Department key={i} department={item} />)
        }
        <Container height='40px' />
        { loading&&<Loading margin='8px' /> }
    </Container>


    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
