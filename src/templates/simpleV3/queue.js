import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,useParams} from 'react-router-dom'
import {getQueueStatus,getQueueTransaction,updateCustInfo} from './../../data/api'
import {selectService,setTimeslots,setTab} from './../../data/actions'
import TextField from '@material-ui/core/TextField'
import ReCAPTCHA from 'react-google-recaptcha'
import {FaWhatsapp,FaSms,FaQrcode} from 'react-icons/fa'
import Cookies from 'universal-cookie'
import styled from 'styled-components'
import Loader from './loader'
import moment from 'moment'
import QRCode from 'react-qr-code'
import {colorShade} from './../../componentsv2/utils'

import Container,{Content,Card,BlackOut} from './../../componentsv2/container'
import Background from './../../componentsv2/background'
import BottomBar from './../../componentsv2/bottombar'
import Language from './../../components/language'
import Loading from './../../componentsv2/loading'
import Button from './../../componentsv2/button'
import Ticket from './../../componentsv2/ticket'
import Error from './../../componentsv2/error'
import Logo from './../../componentsv2/logo'
import Text from './../../componentsv2/text'

const designtype = 99;       // 0 | 1 | 2 | 99

const Component = () => {
    const {id,qr}   = useParams()
    const navigate  = useHistory()
    const dispatch  = useDispatch()
    const cookies   = new Cookies()
    const config    = useSelector(state=>state.config)
    const theme     = useSelector(state=>state.config.theme)
    const languages = useSelector(state=>state.config.languages)
    const lang      = useSelector(state=>state.select.language.id)
    const getL      = lbl => languages&&languages[lbl]?languages[lbl][lang]:""

    const [queue,setQueue]      = useState({})
    const [loading,toggle]      = useState(false)
    const [invalid,setInvalid]  = useState(false)
    const [show,setShow]        = useState(false)
    const [phone,setPhone]      = useState('')
    const [submit,setSubmit]    = useState(false)
    const [error,setError]      = useState()

    useEffect(()=>{
        if(qr === undefined) return;
        if(Object.keys(config) == 0) return;

        dispatch(setTab('queue'))
        start()
        return ()=>{
            console.log('stop qtimer');
            clearInterval(cookies.get('qtimer'))
            cookies.remove('qtimer')
        }
    },[qr,config])

    const conf = {path:"/",expires:moment().add(1,'days').toDate()}
    const start = async () =>{
        toggle(true)                                                            //
        const response = await getQueueStatus(config.server,'','','','',qr)     //
        console.log('queue',response);
        toggle(false)

        if(response.error){ setInvalid(true); return;}                          // not a valid qr code
        cookies.set('qr',qr,conf)
        cookies.set('qrdate',moment().format('DD/MM/yyyy'))
        setQueue(response)

        if (response.status === 2) return;
        const mtimer = setInterval(()=>monitorQNumber(response),10000)
        cookies.set('qtimer',mtimer,conf)
    }

    const monitorQNumber = async (response) =>{
        if(Object.keys(config) == 0) return;
        const status = await getQueueStatus(config.server,'','','','',qr);
        console.log("queue",status);
        if(!response.error) setQueue(status)
    }

    const onSubmit = async () => {
        setSubmit(true)
        const customer = {phone:phone,queue:queue.queue_number};
        const response = await updateCustInfo(config.server,lang,queue.mid,queue.dept_id,queue.serv_id,customer);
        setError(response.error? 'Failed to update : '+response.error : 'Updated!')
        setShow(false)
    }


    return <Loader>
    <Content>
        { designtype === 1 && <Container position='absolute' background={colorShade(theme&&theme.primary,100)} height='170px' width='100%' zindex={-1}/>}
        { designtype === 2 && <Container position='absolute' background={theme&&theme.primary} height='170px' width='100%' zindex={-1}/>}
        { designtype !== 2 && <Logo margin='16px'/>}
        {
            designtype === 0 ? <Ticket0 id={id} qr={qr} queue={queue} theme={theme}/>:
            designtype === 1 ? <Ticket1 id={id} qr={qr} queue={queue} theme={theme}/>:
            designtype === 2 ? <Ticket2 id={id} qr={qr} queue={queue} theme={theme}/>:
            <Ticket id={id} qr={qr} queue={queue} theme={theme} />
        }


        <Status queue={queue} theme={theme} languages={languages} lang={lang}/>
        <Extras
            show={(config.features && config.features.whatsapp && queue.wa_url !== undefined && queue.wa_url !== '')?'flex':'none'}
            icon={<FaWhatsapp style={{width:20, height:20,color:'white'}} />}
            onClick={()=>window.open(queue.wa_url,'_blank')}
            label='WHATSAPP UPDATE'
            bg={'#25D366'}/>
        <Extras
            show={(config.features && config.features.sms)?'flex':'none'}
            icon={<FaSms style={{width:18, height:18, color:'white'}} />}
            onClick={()=>{setShow(true); setSubmit(false);}}
            label='SMS UPDATE'
            bg='#434343'/>
        <div style={{minHeight:40}}/>

        {/*  SHOW WHEN INVALID  */}
        <BlackOut display={invalid?'flex':'none'}>
            <Card width='200px' align='center' justify='center' padding='16px' direction='column'>
                <FaQrcode style={{width:24,height:24,margin:'0 0 12px'}}/>
                <Text size='14px' margin='0 16px'>Invalid QR Code</Text>
            </Card>
        </BlackOut>

        {/*  SHOW DURING LOADING  */}
        <BlackOut display={loading?'flex':'none'}>
            <Card width='200px' align='center' justify='center' padding='12px'>
                <Loading/>
                <Text size='14px' margin='0 16px'>Loading...</Text>
            </Card>
        </BlackOut>

        {/*  SHOW PHONE DIALOG  */}
        <BlackOut display={show?'flex':'none'}>
            <Card width='300px' direction='column'>
                <Text weight='bold' alignself='flex-start' margin='16px 16px 12px'>Enter Details</Text>
                <div style={{alignSelf:'stretch',padding:'0  16px'}}>
                    <TextField fullWidth placeholder='Phone Number' value={phone} onChange={e=>setPhone(e.target.value)}/>
                </div>
                <div style={{alignSelf:'stretch',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                    <div style={{width:85,padding:16,color:'darkgray',fontWeight:'bold'}} onClick={()=>setShow(false)}>CANCEL</div>
                    {
                        submit?
                        <div style={{width:85,display:'flex',justifyContent:'center'}}><Loading size='14px'/></div>:
                        <div style={{width:85,padding:16,color:'dodgerblue',fontWeight:'bold'}} onClick={onSubmit}>SUBMIT</div>
                    }
                </div>
            </Card>
        </BlackOut>
    </Content>
    <Background/>
    <BottomBar/>
    <Error message={error} show={error!=undefined} onClose={()=>setError()} />
    </Loader>
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Extras = ({icon,label,bg,onClick,show}) => <Card
    display={show}
    width='300px' padding='12px 16px' bg={bg} justify='center' onClick={onClick}
    margin='6px 6px 0'
    border={'1px solid '+bg}>
    {icon}
    <div style={{margin:'0 16px',color:'white'}}>{label}</div>
</Card>

const TicketOuter = styled.div`
    margin          : ${p=>p.margin};
    mask-image      : ${p=>`radial-gradient(circle 10px at 100% ${p.yaxis}, transparent 0, transparent 10px, black 11px)`};
`
const TicketInner = styled.div`
    color           : ${p=>p.color??'white'};
    border          : ${p=>p.border};
    height          : ${p=>p.height};
    background      : ${p=>p.bg};
    background-image: ${p=>p.img??''};
    box-sizing      : border-box;
    background-size : 100% 100%;
    align-items     : center;
    flex-direction  : column;
    width           : 300px;
    padding         : 16px;
    border-radius   : ${p=>p.borderradius??'10px'};
    display         : flex;
    mask-image      : ${p=>`radial-gradient(circle 10px at 0 ${p.yaxis}, transparent 0, transparent 10px, black 11px)`};
`
const MTicket = (props) => <TicketOuter {...props}><TicketInner {...props}>{props.children}</TicketInner></TicketOuter>
const Label   = ({label,value}) => <Container width='100px' align='center'>
    <Text size='12px' margin='0 0 4px'>{label}</Text>
    <Text size='18px' weight='bold'>{value}</Text>
</Container>

const Ticket0 = ({id,qr,queue,theme}) => {
    return <>
    <MTicket yaxis='100%' img={`url(config/${id}/images/ticket_top.png)`} bg={theme&&theme.primary}>
        <Text mcolor='white' size='12px'>Your Queue Number</Text>
        <Text mcolor='white' size='70px' weight='bold'>{queue.queue_number??'----'}</Text>
    </MTicket>
    <Container direction='row' justify='space-around' width='300px' margin='-3px 0 -4px' padding='0 10px' zindex='1'>
        { [...Array(16)].map((item,i)=><div key={i} style={{width:6,height:6,background:'white',borderRadius:'50%'}}/>) }
    </Container>
    <MTicket yaxis='0%'
        img={`url(config/${id}/images/ticket_bot.png)`}
        bg={theme&&colorShade(theme.primary,80)}>
        <Card padding='6px 8px' border={`1px solid ${theme&&theme.primary}`} width='140px' justify='center'>
            <QRCode width='134px' value={qr} size={120}/>
        </Card>
        <Container direction='row' justify='space-around' margin='16px 0 0'>
            <Label label={'Serving'} value={queue.serv_current_serving}/>
            <Label label={'Position'} value={queue.wait_position}/>
            <Label label={'ETA'} value={moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')}/>
        </Container>
    </MTicket>
    </>
}

const Ticket1 = ({id,qr,queue,theme}) => {
    return <>
    <MTicket borderradius='5px 5px 0 0' img={`url(config/${id}/images/ticket_top.png)`} bg={theme&&theme.primary}>
        <Text mcolor='white' size='12px'>Your Queue Number</Text>
        <Text mcolor='white' size='70px' weight='bold'>{queue.queue_number??'----'}</Text>
    </MTicket>
    <MTicket borderradius='0 0 5px 5px'
        img={`url(config/${id}/images/ticket_bot.png)`}
        border={`1px solid ${theme&&theme.primary}`}
        bg='white'>
        <Card padding='6px 8px' border={`1px solid ${theme&&theme.primary}`} width='140px' justify='center'>
            <QRCode width='134px' value={qr} size={120}/>
        </Card>
        <Container direction='row' justify='space-around' margin='16px 0 0'>
            <Label label={'Serving'} value={queue.serv_current_serving}/>
            <Label label={'Position'} value={queue.wait_position}/>
            <Label label={'ETA'} value={moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')}/>
        </Container>
    </MTicket>
    </>
}

const Ticket2 = ({id,qr,queue,theme}) => {
    return <>
    <MTicket borderradius='10px' bg={'white'} margin='50px 0 0' border={`1px solid ${theme&&theme.primary}`}>
        <Logo />
        <Text size='12px'>Your Queue Number</Text>
        <Text size='70px' weight='bold' margin='0 0 16px'>{queue.queue_number??'----'}</Text>
        <Card padding='6px 8px' border={`1px solid ${theme&&theme.primary}`} width='140px' justify='center'>
            <QRCode width='134px' value={qr} size={120}/>
        </Card>
        <Container direction='row' justify='space-around' margin='16px 0 0'>
            <Label label={'Serving'} value={queue.serv_current_serving}/>
            <Label label={'Position'} value={queue.wait_position}/>
            <Label label={'ETA'} value={moment().add(queue.serv_est_wait_time/60, 'm').add(2,'m').format('hh:mm A')}/>
        </Container>
    </MTicket>
    </>
}

const Status = ({queue,theme,languages,lang}) =>{
    const getL      = lbl => languages&&languages[lbl]?languages[lbl][lang]:""
    return <Card
    margin='6px 6px 0'
    width='300px'
    border={`1px solid ${theme&&theme.primary}`}
    minheight='100px'
    padding='16px'
    borderwidth='1px 1px 10px 1px'
    justify='center'>
    <Text textalign='center'>
    {queue.state}
    {
        queue.status === 0? getL('q_waiting'):
        queue.status === 1? `${queue.wstt_name} ${getL('q_calling')}`:
        queue.status === 2? getL('q_done') : ''
    }
    </Text>
    </Card>
}


    // <Text width='300px' size='14px' textalign='center' margin='16px' mcolor={theme&&theme.textsecondary}>
    // {
    //     queue.status === 0? languages.q_waiting[lang]:
    //     queue.status === 1? queue.wstt_name+' '+languages.q_calling[lang]:
    //     queue.status === 2? languages.q_done[lang]:''
    // }
    // </Text>


export default Component;
