import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {fetchServices,fetchServices2} from './../../data/api'
import {selectDepartment,setServices} from './../../data/actions'
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

    const sbranch     = useSelector(state=>state.select.branch)
    const departments = useSelector(state=>state.data.departments)

    const [selected,setSelected] = useState({})
    const [loading,toggle]       = useState(false)
    const [error,setError]       = useState()

    useEffect(()=>
    { 
        if(departments===undefined) 
            navigate.push(`/${id}/`) 
    },[departments])

    const onDepartmentSelect = async (dept) => 
    {
        setSelected(dept)

        let finallist = []
        if(features && features.queue)
        {
            console.log('features.queue')
            toggle(true)
            let qservices = await fetchServices(config.server, lang, sbranch.mid, dept.dept_id)
            toggle(false)
            if(qservices.error)
            { 
                setError(qservices.error); 
                return;
            }
            qservices = qservices[0].dept_service_data.map(i=>
            { 
                return{...i,...{enable_apmt:0}}
            })
            finallist = [...finallist,...qservices]
        }

        if(features&& features.appointment)
        {
            console.log('features.appointment')
            toggle(true)
            let aservices = await fetchServices2(config.server,lang,sbranch.mid,dept.dept_id)
            toggle(false)
            if(aservices.error)
            {
                setError(aservices.error); 
                return;
            }

            aservices.map((item,i)=>
            {
                const apmt  = {...item,...{enable_apmt:1}}
                const isExist = finallist.find(j=>item.serv_id == j.serv_id)
                if(isExist) 
                    finallist = finallist.map(j=>item.serv_id == j.servid?{...apmt,...item}:j)   // if exist update the value
                else 
                    finallist.push(apmt)                                                                // else push it to the main
            })
        }
        console.log('finallist',finallist);
        dispatch(selectDepartment(dept))
        dispatch(setServices(finallist))
        navigate.push(`/${id}/s`)
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //isSelected?theme&&theme.primarylight:'white'
    const Department0 = ({item}) => 
    {
        const isSelected = selected.dept_id === item.dept_id;
        const marker     = <FaMapMarkerAlt style={{width:10,height:10}}/>
        return <Card
            opacity={Object.keys(selected).length === 0 || isSelected? 1:0.4}
            bg={isSelected?colorShade(theme&&theme.primary,150):'white'}
            onClick={()=>onDepartmentSelect(item)}
            border={`1px solid ${theme&&theme.primary}`}>
            <Container flex={1} margin='12px 16px'>
                <Text weight='bold' textalign='center' isPrimary>{item.dept_name}</Text>
                <Text size='12px' margin='4px 0 0'>{item.address==='-'?'':item.address}</Text>
            </Container>
            <Loading margin='12px' show={isSelected&&loading} position='absolute' right='24px'/>
        </Card>
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const Department1 = ({item}) => 
    {
        const isSelected = selected.dept_id === item.dept_id;
        const marker     = <FaMapMarkerAlt style={{width:10,height:10}}/>
        return <Card
            opacity={Object.keys(selected).length === 0 || isSelected? 1:0.4}
            onClick={()=>onDepartmentSelect(item)}>
            <Deco bg={theme&&theme.primary}/>
            <Container flex={1} margin='12px 16px 12px 14px'>
                <Text weight='bold' isPrimary>{item.dept_name}</Text>
                <Text size='12px' margin='4px 0 0' opacity={0.5} icon={marker}>{getL('address')} {item.address}</Text>
            </Container>
            <Loading margin='12px' show={isSelected&&loading} />
        </Card>
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return <Loader>
    <Content>
        <BackButton />
        <Logo margin='16px'/>
        <Text margin='0 0 16px' width='320px' opacity={0.7} size='13px'>Branch</Text>
        { departments && departments.map((item,i)=>
            <Department0 key={i} item={item}/> 
        )}
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