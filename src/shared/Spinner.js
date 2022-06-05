import React from "react";
import { Box, Backdrop, CircularProgress, Typography, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import logoSpinner from "../assets/images/logo/logo_spinner.png"

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
                    <CircularProgress sx={{color: '#734d03'}}/>
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="caption" component="div" color="textSecondary">
                            <img src={logoSpinner} width= '50px'/>
                        </Typography>
                    </Box>
                </Box>
            </Backdrop>
        </>
    )
}
