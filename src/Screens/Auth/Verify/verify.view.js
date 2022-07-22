import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  Paper
} from "@mui/material";
import ReceiptTop from "../../../assets/images/Backgrounds/receipt_top.png"
import ReceiptBottom from "../../../assets/images/Backgrounds/receipt_bottom.png"
import { router } from '../../../Routes/routhPaths';

function VerifyView(props) {

  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false
  });

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width:'100%',
      backgroundColor: '#eee',
      height: '100vh',
      placeContent: 'center'
    }}>
      <Paper sx={{width: "50%", textAlign: 'center'}} elevation={2}>
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
              <img src={ReceiptTop} width={'35%'}/>
            </Box>
          </Typography>
          {props.verified && <Typography variant='h6' align='right' sx={{color: 'primary.main'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', p: 2}}>
              Account Verified
            </Box>
          </Typography>}
          {!props.verified && <Typography variant='h6' align='right' sx={{color: '#ed0000'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', p: 2 }}>
              Account Not Verified
            </Box>
          </Typography>}
        </Box>
        <Typography variant='subtitle1' align='center' >
          {props.verified && <Box sx={{ display: 'flex', alignItems: 'center', placeContent: 'center' }}>
            Your account has been verified. Please&nbsp;<Link to={{pathname: router.login}}>Login</Link>&nbsp;to continue
          </Box>}
          {!props.verified && <Box sx={{ display: 'flex', alignItems: 'center', placeContent: 'center' }}>
            Token has been Expired. Please&nbsp;<Link to={{pathname: router.signUp}}>register</Link>&nbsp;again to continue
          </Box>}
        </Typography>
        <Box sx={{width: '100%'}}>
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
            <img src={ReceiptBottom} width={'100%'}/>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default VerifyView;