import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import QRCode from 'react-qr-code'
import moment from 'moment'
import {FaCheckCircle,FaUserTie} from 'react-icons/fa'

const Container = styled.div`
    align-self      : center;
    margin          : ${p=>p.margin};
    display         : flex;
    width           : 320px;
    opacity         : ${p=>p.opacity};
`

const Timestamp = styled.div`
    color           : ${p=>p.mcolor??'white'};
    background      : ${p=>p.bg??'limegreen'};
    text-align      : center;
    width           : 80px;
    border-radius   : 5px;
    padding         : 2px;
    box-sizing      : border-box;
    font-size       : 12px;
`
const Qstatus = styled.div`
    color           : ${p=>p.mcolor};
    background      : ${p=>p.bg};
    text-align      : left;
    width           : 80px;
    border-radius   : 5px;
    padding         : 2px;
    box-sizing      : border-box;
    font-size       : 12px;
    text-transform  : capitalize;
`
const DetailIcon = styled.div`
    font-size       : 8px;
    width           : 16px;
    height          : 16px;
    background      : rgba(0,0,0,0.5);
    color           : white;
    padding         : 1px;
    border-radius   : 50%;
    display         : flex;
    align-items     : center;
    justify-content : center;
    margin          : 0 8px 0 0;
`

const Text = styled.div`
    font-weight     : ${p=>p.weight};
    margin          : ${p=>p.margin};
    font-size       : ${p=>p.size};
    line-height     : ${p=>p.size};
    opacity         : ${p=>p.opacity};
`

const Deco = () =><div style={{display:'flex',flexDirection:'column',alignSelf:'stretch',alignItems:'center',margin:'0 8px'}}>
    <FaCheckCircle style={{color:'limegreen'}}/>
    <div style={{width:2,background:'limegreen',flex:1,marginTop:-2}}/>
</div>


const Component = ({transaction}) => {
    return <Container opacity={transaction.state == 1 || transaction.state ==2? 1:0.5}>
        <div style={{margin:'8px 0'}}>
            <Timestamp>{moment(transaction.time_msec_issue).format('h:mm A')}</Timestamp>
            <Qstatus>{transaction.state_text}</Qstatus>
        </div>
        <Deco />
        <div style={{margin:'8px 0'}}>
            <Text weight='bold' margin='0 0 4px'>{transaction.dept_name}</Text>
            <Text size='12px' margin='0 0 16px'>{transaction.serv_name}</Text>
            <div style={{display:'flex',alignItems:'center',margin:'0 0 8px'}}>
                <DetailIcon>CT</DetailIcon>
                <Text size='12px' margin='0 16px 0 0'>{moment(transaction.time_msec_call).format('h:mm A')}</Text>
                <DetailIcon>DT</DetailIcon>
                <Text size='12px' margin='0 16px 0 0'>{moment(transaction.time_msec_done).format('h:mm A')}</Text>
            </div>
            {
                transaction.user_name &&
                <div style={{display:'flex',alignItems:'center',margin:'0 0 8px'}}>
                    <FaUserTie style={{width:16,height:16}}/>
                    <Text size='12px' margin='0 0 0 16px'>{`${transaction.user_name}(${transaction.wstt_name})`}</Text>
                </div>
            }
        </div>
    </Container>
}


// <Text weight='bold' margin='0 0 4px'>{item.dept_name}</Text>
// <Text size='12px' margin='0 0 16px' opacity={0.8}>{item.serv_name}</Text>
// <div style={{display:'flex'}}>
// <Text size='12px' margin='0 16px 4px 0' icon={<DetailIcon>CT</DetailIcon>} opacity={0.8}>{moment(item.time_msec_call).format('h:mm A')}</Text>
// <Text size='12px' margin='0 16px 4px 0' icon={<DetailIcon>DT</DetailIcon>} opacity={0.8}>{moment(item.time_msec_done).format('h:mm A')}</Text>
// </div>
// {item.user_name && <Text size='12px' margin='0 0 4px' icon={<FaUserTie style={{width:18,height:18}}/>} opacity={0.8}>{item.user_name + " ("+ item.wstt_name+")"}</Text>}

export default Component;
