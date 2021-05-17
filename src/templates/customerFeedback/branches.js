import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {fetchDepartments} from './../../data/api'
import {selectBranch,setDepartments} from './../../data/actions'
import styled from 'styled-components'
import {FaMapMarkerAlt} from 'react-icons/fa'

import {colorShade} from './../../componentsv2/utils'
import Container,{Content,Card} from './../../componentsv2/container'
import Button,{BackButton} from './../../componentsv2/button'
import Background from './../../componentsv2/background'
import BottomBar from './../../componentsv2/bottombar'
import Loading from './../../componentsv2/loading'
import Loader from './../../componentsv2/loader'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

const Component = () => {
    const {id}      = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const features  = useSelector(state=>state.config.features)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = l => languages&&languages[l]?languages[l][lang]:""

    const branches  = useSelector(state=>state.data.branches)

    const [selected,setSelected] = useState({})
    const [loading,toggle]       = useState(false)
    const [error,setError]       = useState()

    useEffect(()=>{ 
        if(branches===undefined) navigate.push(`/${id}/`) 
    },[branches])

    const onBranchSelect = async (branch) => 
    {
        setSelected(branch)
        toggle(true)
        const departments =  await fetchDepartments(config.server,lang,config.server.mid)
        console.log('departments',departments)
        toggle(false)

        if(departments.error){
            setError(departments.error); return;
        }
        dispatch(selectBranch(branch))
        dispatch(setDepartments(departments))
        navigate.push(`/${id}/d`)
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////

    const Branch0 = ({item}) => 
    {
        console.log("selected.mid",selected.mid)
        console.log("item.mid",item.mid)

        const isSelected = selected.mid === item.mid;
        return <Card
                    opacity={Object.keys(selected).length === 0 || isSelected? 1:0.4}
                    bg={isSelected?theme&&theme.primarylight:'white'}
                    onClick={()=>onBranchSelect(item)}
                    border={`1px solid ${theme&&theme.primary}`}>
                    <Container flex={1} margin='12px 12px'>
                        <Text weight='bold'>{item.name}</Text>
                        <Text size='12px' margin='4px 0 0'>{item.address}</Text>
                    </Container>
                    <Loading margin='12px' show={isSelected&&loading} />
            </Card>
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////

    const Branch1 = ({item}) => 
    {
        const isSelected = selected.mid === item.mid;
        const marker     = <FaMapMarkerAlt style={{width:10,height:10}}/>
        return <Card
                opacity={Object.keys(selected).length === 0 || isSelected? 1:0.4}
                onClick={()=>onBranchSelect(item)}>
                <Deco bg={theme&&theme.primary}/>
                <Container flex={1} margin='12px 16px 12px 14px'>
                    <Text weight='bold' isPrimary>{item.name}</Text>
                    <Text size='12px' margin='4px 0 0' opacity={0.5} icon={marker}>{getL('address')} {item.address}</Text>
                </Container>
                <Loading margin='12px' show={isSelected&&loading} />
            </Card>
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////
    return <Loader>
    <Content>
        {console.log("branches",branches)}
        <BackButton />
        <Logo margin='16px'/>
        <Text margin='0 0 16px' width='320px' opacity={0.7} size='13px'>Branch</Text>
        { branches && branches.map((item,i)=><Branch0 key={i} item={item}/>) }
    </Content>
    <Background/>
    <BottomBar/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

const Deco = styled.div`
    background      : ${p=>p.bg};
    align-self      : stretch;
    border-radius   : 6px;
    width           : 6px;
    margin          : 2px;
`

export default Component;