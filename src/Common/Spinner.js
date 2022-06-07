import React from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Spinner(props){
  const {
    showSpinner,
  } = props;
  const classes = useStyles();

  return(
    <>
      <Backdrop className={classes.backdrop} open={showSpinner}>
        <Box position="relative" display="inline-flex">
          <CircularProgress sx={{color: '#0581FC'}}/>
        </Box>
      </Backdrop>
    </>
  )
}

export default Spinner;