import React,{useState,useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const Component = ({message='',show=false,duration=3000,onClose=()=>{}}) => {
    return <Snackbar
        open={show}
        autoHideDuration={duration}
        onClose={(e,reason)=>onClose()}
        message={message}
        action={
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={(e,reason)=>onClose()}
            >x</IconButton>
        } />
}
export default Component;
