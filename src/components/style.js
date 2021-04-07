import React,{useState,useEffect} from 'react'
import styled,{keyframes} from 'styled-components'

export const GrayoutBg = styled.div`
    position        : fixed;
    z-index         : 5;
    width           : 100%;
    height          : 100%;
    display         : flex;
    align-items     : center;
    justify-content : center;
    background      : rgba(0,0,0,0.7);
    color           : white;
`;

export const TextIcon = styled.div`
    display         : flex;
    align-items     : center;
    justify-content : center;
    background      : #A9A9A9;
    border-radius   : 50%;
    width           : 18px;
    height          : 18px;
    font-size       : 10px;
    color           : white;
    font-weight     : bold;
    margin          : 0 4px 0 0;
`
