import React from "react";
import { Box, Backdrop, CircularProgress, Typography, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({   
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }));
export default function Spinner(prop){
    const classes = useStyles();

    return(
        <>
            <Backdrop className={classes.backdrop} open={prop.spinner} sx={{zIndex: 9999}}>
                <Box position="relative" display="inline-flex">
                    <CircularProgress sx={{color: 'primary'}}/>
                </Box>
            </Backdrop>
        </>
    )
}
