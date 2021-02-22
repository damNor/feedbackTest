import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchDepartments} from './../../data/api'
import {selectBranch,setDepartments} from './../../data/actions'


////////////////////////////////////////////////////////////////////////////////
import Container from './../../components/container'
import Button from './../../components/button'
import Text from './../../components/text'


////////////////////////////////////////////////////////////////////////////////
const Component = () => {
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const {id}      = useParams()
    const config    = useSelector(state=>state.config)
    const lang      = useSelector(state=>state.select.language?state.select.language.id:0);
    const languages = useSelector(state=>state.config.languages)
    const branches  = useSelector(state=>state.data.branches)
    const [selected,setSelected] = useState({})
    const [loading,setLoading]   = useState(false);

    //////////////////////////////////////////////////////////////////////////// config loader
    useEffect(()=>{
        if(Object.keys(config).length === 0 || branches === undefined)
        navigate.push('/'+id+'/$')
    },[config,branches])


    //////////////////////////////////////////////////////////////////////////// onClick
    const onClick = async (branch) => {
        setSelected(branch)
        const response = await fetchDepartments();
        if(response.error){
            //todo
        }else{
            console.log(response);
            dispatch(selectBranch(branch))
            dispatch(setDepartments(response))
        }
    }


    //////////////////////////////////////////////////////////////////////////// define component item
    const Branches = ({item}) => <Container
        border="1px solid rgba(0,0,0,0.2)"
        borderradius="5px"
        padding='8px 16px'
        margin="4px 0"
        width='300px'
        background={item.bid === selected.bid?'ghostwhite':''}
        onClick={()=>onClick(item)}>
        {item.name}
    </Container>


    //////////////////////////////////////////////////////////////////////////// define UI
    return <>
        <Container flex={1} background='white' padding='16px'>
            <Text weight='bold' margin='0 0 8px 0'>Branches</Text>
            {
                branches === undefined?'':
                branches.map((item,i)=><Branches key={i} item={item} />)
            }
        </Container>
    </>

    //////////////////////////////////////////////////////////////////////////// End
}

export default Component;
