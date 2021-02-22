import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import {animated,useSpring} from "react-spring";
import {selectLanguage} from './../data/actions'

const Container = styled(animated.div)`
    margin      : ${p=>p.margin};
    padding     : ${p=>p.padding};
    align-self  : ${p=>p.alignself};
    position    : relative;
    outline     : none;
    display     : flex;
    flex-direction: column;
    z-index     : 99;
`;
const Dialog = styled(animated.div)`
    position    : absolute;
    padding     : 0px 0px;
    align-self  : ${p=>p.alignself};
    background  : white;
    border      : 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;

`;

const Item = styled(animated.div)`
    font-weight : ${p=>p.weight};
    padding     : ${p=>p.padding??"8px 16px"};
    cursor      : pointer;
    border      : ${p=>p.border};

`

const Component = (props) => {
    const dispatch      = useDispatch()
    const languages     = useSelector(state=>state.config.languageSelection);
    const curlanguage   = useSelector(state=>state.select.language);
    const [open,toggle] = useState(false);

    const animate = useSpring({
        config : {friction: 100,mass:1,tension:3000},
        opacity: open? 1:0,
        display: open? 'block':'none'
    })

    // return <Container {...props} >
    return <Container {...props} tabIndex="0" onBlur={()=>toggle(false)}>
        <Item border="1px solid transparent" onClick={()=>toggle(!open)}>{curlanguage?curlanguage.label:''}</Item>
        <Dialog style={animate}>
            {
                languages === undefined?'':
                languages.map((item,i)=><Item
                    key={item.id}
                    onClick={()=>{
                        toggle(!open);
                        dispatch(selectLanguage(item));
                    }}
                >{item.label}</Item>)
            }
        </Dialog>
    </Container>


}
export default Component;
