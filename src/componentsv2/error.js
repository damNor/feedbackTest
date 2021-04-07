import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { IoMdClose } from "react-icons/io"

const style={width:18,height:18,cursor:'pointer'}
const Component = ({message='',show=false,onClose=()=>{}}) => <>
    <Snackbar
        open={show}
        message={message}
        autoHideDuration={3000}
        onClose={(e,reason)=>onClose()}
        action={<IoMdClose style={style} onClick={onClose}/>} />
    </>
export default Component;
