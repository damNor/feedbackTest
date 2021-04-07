import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import QRCode from 'react-qr-code'
import moment from 'moment'

const TicketOuter = styled.div`
    align-self      : center;
    mask-image      : ${p=>`radial-gradient(circle 10px at 100% ${p.yaxis}, transparent 0, transparent 10px, black 11px)`};
    margin          : ${p=>p.margin};
`
const TicketInner = styled.div`
    background      : ${p=>p.bg??'dodgerblue'};
    color           : ${p=>p.color??'white'};
    height          : ${p=>p.height};
    box-sizing      : border-box;
    background-size : 100% 100%;
    width           : 300px;
    padding         : 16px;
    border-radius   : 10px;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    mask-image      : ${p=>`radial-gradient(circle 10px at 0 ${p.yaxis}, transparent 0, transparent 10px, black 11px)`};
`

const Text = styled.div`
    text-align      : ${p=>p.textalign??'center'};
    font-size       : ${p=>p.size};
    line-height     : ${p=>p.size};
    font-weight     : ${p=>p.weight};
    color           : ${p=>p.mcolor};
    opacity         : ${p=>p.opacity};
    margin          : ${p=>p.margin};
`;

const Info = ({label,value}) => <div style={{width:89}}>
    <Text size='12px' opacity={0.7}>{label}</Text>
    <Text size='16px' margin='6px 0 0'>{value}</Text>
</div>

const Ticket = ({id,qr,queue}) => {
    return <>
    <TicketOuter yaxis='100%' margin='16px 16px 0'>
        <TicketInner yaxis='100%' bg={`url(config/${id}/images/ticket_top.png)`}>
            <Text weight='bold'>Your Queue Number</Text>
            <Text weight='bold' size='70px'>{queue.queue_number??'-'}</Text>
        </TicketInner>
    </TicketOuter>
    <TicketOuter yaxis='00%' margin='0 16px 6px'>
        <TicketInner yaxis='00%' bg={`url(config/${id}/images/ticket_bot.png)`}>
            <div style={{padding:'4px 4px 2px',background:'white',borderRadius:4,margin:'12px 0 16px'}}>
                <QRCode width='134px' value={qr} size={120}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            {
                queue.status !== 2?<>
                <Info label={"Serving Now"} value={queue.serv_current_serving} />
                <Info label={"Position"} value={queue.wait_position} />
                <Info label={"ETA"} value={moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')} /></>:<>
                <Info label={"Attended By"} value={"-"} />
                <Info label={"Call Time"} value={"-"} />
                </>
            }
            </div>

        </TicketInner>
    </TicketOuter>
    </>
}

export default Ticket;
