import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../../../assets/images/Logos/Logo.svg";
import ResponsiveCard from "../../ResponsiveCard";
import { router } from '../../../Routes/routhPaths';

function VerifyView(props) {

  const btnstyle={margin:'8% 0', width: '100%', borderRadius: 20, backgroundColor: '#2c3680'}

  return (
    <Box
      sx={{backgroundColor: '#f0f2f5', height:'100vh', width: '100%'}}
    >
      <Grid sx={{paddingTop: 5}}>
        <ResponsiveCard>
          <Grid align='center'>
            <Avatar src={Logo} sx={{ width: '60%', height: '70%', marginTop: '10%' }} variant='square' />
          </Grid>
          <Box
            sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}
            noValidate
            autoComplete="off"
          >
            <Grid sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '78%',
            }}>
              <Typography variant='body2'>
                {props.alertMessage}
              </Typography>
            </Grid>
            <Typography fontSize='13px'>
              Don't have an account? <Link to={{pathname: router.signUp}}> Sign Up</Link>
            </Typography>
          </Box>
        </ResponsiveCard>
      </Grid>
    </Box>
  );
}

export default VerifyView;