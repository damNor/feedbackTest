import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchDepartments} from './../../data/api'
import {selectBranch,setDepartments,selectDepartment,setServices} from './../../data/actions'
import Helmet from "react-helmet";

////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'
import Language from './../../components/language'
import Loading from './../../components/loading'


//////////////////////////////////////////////////////////////////////////////// Start
const Component = () => {
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const {id}      = useParams()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const lang      = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages = useSelector(state=>state.config.languages)
    const branches  = useSelector(state=>state.data.branches)
    const [selected,setSelected] = useState({})
    const [loading,setLoading]   = useState(false);


    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || branches === undefined)
        navigate.push('/'+id+'/')
    },[config,branches])


    //////////////////////////////////////////////////////////////////////////// functions
    const onClick = async(branch) =>{
        setSelected(branch)
        setLoading(true)
        const response = await fetchDepartments();
        setLoading(false)
        if(response.error){
            //todo
        }else{
            dispatch(selectBranch(branch))
            dispatch(setDepartments(response))
            navigate.push('/'+id+'/d')
        }
    }


    //////////////////////////////////////////////////////////////////////////// define components
    const Branches = ({branch}) => <Container
        border="1px solid rgba(0,0,0,0.2)"
        borderradius="5px"
        margin="4px 0"
        width='300px'
        background={branch.mid === selected.mid?'ghostwhite':'white'}
        cursor='pointer'
        align='center'
        onClick={()=>onClick(branch)}>
        {/*<div style={{width:30,height:30,background:'red',borderRadius:'50%',margin:'0 16px 0 0'}} />*/}
        <Text padding='16px'>{branch.name}</Text>
    </Container>


    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
        <Helmet>
            <title>Branch Page</title>
        </Helmet>
        <Container flex={1} align='center'>
            <Text margin='16px 0 8px'>Branches</Text>
            {
                branches === undefined?'':
                branches.map((item,i)=><Branches key={i} branch={item}/>)
            }
            { loading&&<Loading margin='8px'/>}
            <Container flex={1} />
        </Container>
    </>

    //////////////////////////////////////////////////////////////////////////// End
}
export default Component;
