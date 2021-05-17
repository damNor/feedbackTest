import React,{useState,useEffect,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import {fetchFeedback,submitFeedback} from './../../data/api/feedback'
import styled,{keyframes} from 'styled-components'
import bg from './../../resources/feedbackbanner.png'
import smiley0 from './../../resources/smiley/0.png'
import smiley25 from './../../resources/smiley/25.png'
import smiley50 from './../../resources/smiley/50.png'
import smiley75 from './../../resources/smiley/75.png'
import smiley100 from './../../resources/smiley/100.png'

import Container from './../../components/container'
import Text from './../../components/text'
import QRCode from "react-qr-code";

const feedbackapi   = 'https://qa-dir-feedback.monash.edu.my/private/qos_getstatus.php?ignoreurl=true&type=qos_json&vtype=1';
const submitapi     = 'https://qa-dir-feedback.monash.edu.my/private/qos_setanswer.php?ignoreurl=true&id=50';
const version       = 'v1.0';

const animate = keyframes`
    0%   { opacity: 0.2}
    50%  { opacity: 1}
    100% { opacity: 0.2}
`

const BlinkWhenHover = styled.img`
    &:hover{
        /* animation : ${animate} 1.2s linear infinite; */
    }
`

const Card = styled.div`
    margin          : ${p=>p.margin};
    padding         : ${p=>p.padding};
    width           : ${p=>p.width??(p.stretch?'stretch':'')};
    max-width       : ${p=>p.maxwidth};
    height          : ${p=>p.height};
    background      : ${p=>p.background};
    display         : ${p=>p.display??'flex'};
    flex            : ${p=>p.flex};
    flex-direction  : ${p=>p.direction??'column'};
    flex-shrink     : 0;
    flex-wrap       : ${p=>p.wrap};
    align-items     : ${p=>p.align??(p.center?'center':'flex-start')};
    justify-content : ${p=>p.justify??(p.center?'center':'flex-start')};
    align-self      : ${p=>p.alignself};
    border          : ${p=>p.border};
    border-radius   : ${p=>p.borderradius};
    opacity         : ${p=>p.opacity};
    overflow        : ${p=>p.overflow};
    overflow-x      : ${p=>p.overflowx};
    overflow-y      : ${p=>p.overflowy};
    position        : ${p=>p.position??'relative'};
    top             : ${p=>p.top};
    bottom          : ${p=>p.bottom};
    left            : ${p=>p.left};
    right           : ${p=>p.right};
    color           : ${p=>p.color};
    cursor          : ${p=>p.cursor};
    z-index         : ${p=>p.zindex};
    box-sizing      : ${p=>p.boxsizing};
    box-shadow      : ${p=>p.shadow};

    &:hover{
        animation : ${animate} 1.2s linear infinite;
    }
`

const Component = () => {
    const navigate          = useHistory();
    const dispatch          = useDispatch()
    const {id}              = useParams();
    const [loading,toggle]  = useState({api: true,submit: false});
    const [dept,setDept]    = useState({})
    const [feedqr,setfeedqr]       = useState({});
    const [questions,setQuestions] = useState([]);
    const [answers,setAnswers]     = useState([]);
    const [current,setCurrent]     = useState({});
    const [pos,setPos]             = useState(0);
    const [confirmation,setConfirm]= useState(false)
    const [xtraFeedback,setXtra]   = useState(false);
    const [selected,setSelected]   = useState('');

    useEffect(()=>{
        const readQr = async () =>{
            const response = await fetch("config/feedbackqr.json", {})
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .catch(error=>{return {error:error.message,status:500} }); //error.message
            setfeedqr(response);
            console.log(response);
        };
        readQr();
    },[])

    useEffect(()=>{
        if(id === undefined) return;
        const mfetch = async () =>{
            toggle({...loading,...{api:true}});
            const response = await fetchFeedback(feedbackapi);
            if(!response.error){
                setDept(response.department.find(i=>i.d == id))
                setQuestions(response.questions)
            }
            toggle({...loading,...{api:false}});
            console.log(response);
        }
        mfetch();
    },[id])

    const submitFeed = async (provideMore) =>
    {
        setXtra(provideMore)

        let ans = "";
        for(let [key,value] of Object.entries(answers))
            ans = ans + "&" + key +"=" + value
        const submit = submitapi + "&d=" + id + ans
        console.log(submit);
        const response = await submitFeedback(submit);
        console.log(response);
        setPos(pos+1); //after success
    }

    return <Container flex={1} background='white' align='stretch'>
        <Container height='200px'>
            <div style={{zIndex:1,position:'absolute',bottom:0,margin:16,fontSize:32,color:'white'}}>{dept?dept.label:''}</div>
            <img src={bg} style={{width:'100%',height:'100%',zIndex:0,objectFit:'cover',objectPosition:'0 0'}}/>
        </Container>
        {
            loading.api?'Loading...':
            questions.length === 0? 'no available questionaire':
            pos < questions.length ?
            <>
                <Text textalign='center' size='28px' margin='16px 16px'>{questions[pos].question}</Text>
                <Container >{
                    questions[pos].answers.map((item,i)=><Card key={i}
                    margin='4px 16px'
                    align='center'
                    direction='row'
                    padding='8px'
                    alignself='stretch'
                    border={selected === ('q'+questions[pos].qid+'a'+item.answer_id)?
                        '1px solid rgba(0,0,0,0.3)':
                        '1px solid rgba(0,0,0,0.2)'
                    }
                    background={
                        selected === ('q'+questions[pos].qid+'a'+item.answer_id)?'cyan':'white'
                    }
                    borderradius='4px'
                    onClick={()=>{
                        setSelected('q'+questions[pos].qid+'a'+item.answer_id);
                        setAnswers({...answers,...{['anws_'+questions[pos].qid]:item.answer_id}});
                        if(pos === questions.length-1) {
                            submitFeed(item.label === 'Yes')
                        }else{
                            setConfirm(true);
                        }
                    }}>
                    {
                        item.point >=100 ? <BlinkWhenHover src={smiley100} style={{width:40, margin:'0 16px 0 8px'}}/>:
                        item.point >=75  ? <BlinkWhenHover src={smiley75} style={{width:40, margin:'0 16px 0 8px'}}/>:
                        item.point >=50  ? <BlinkWhenHover src={smiley50} style={{width:40, margin:'0 16px 0 8px'}}/>:
                        item.point >=25  ? <BlinkWhenHover src={smiley25} style={{width:40, margin:'0 16px 0 8px'}}/>:
                        item.point >=0   ? <BlinkWhenHover src={smiley0} style={{width:40, margin:'0 16px 0 8px'}}/>:
                        ''
                    }
                    {
                        item.label === 'Yes' ? <div style={{margin:'auto',padding:8,borderRadius:4}}>Yes</div> :
                        item.label === 'No'  ? <div style={{margin:'auto',padding:8,borderRadius:4}}>No</div> :
                        <div style={{flex:1,textAlign:'center'}}>{item.label}</div>
                    }
                    </Card>)
                }</Container>
            </>:
            pos === questions.length?<Container flex={1} align='center' justify='center' onClick={()=>setPos(0)}>
                <Container color='#092A53' margin='16px'><Text size='32px' weight='300'>Thank You</Text></Container>
                <Container display={xtraFeedback?'flex':'none'} align='center'>
                    <a href={feedqr[id]??feedqr.default} target="_blank">
                        <QRCode width='134px' value={feedqr[id]??feedqr.default} size={134}/>
                    </a>
                    <Container color='#092A53' margin='16px'>Please Click on QR Code to give detailed feedback online</Container>
                </Container>
            </Container>:
            ''
        }

        <Container display={confirmation?'flex':'none'} position='absolute' bottom='0' left='16px' right='16px' align='center' border='1px solid black' margin='0 0 -1px 0' padding='16px' background='white'>
            <Text>Please confirm your rating</Text>
            <Container direction='row'>
                <Container background='#505050' color='white' padding='16px' margin='16px' onClick={()=>{setSelected(''); setConfirm(false)}}>Cancel</Container>
                <Container background='#505050' color='white' padding='16px' margin='16px' onClick={()=>{setPos(pos+1); setConfirm(false);}}>Confirm</Container>
            </Container>
        </Container>
        <div style={{position:'absolute '}}></div>
    </Container>
}

export default Component;
