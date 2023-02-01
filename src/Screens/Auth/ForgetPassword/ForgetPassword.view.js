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
import Logo from "../../../assets/images/Logos/logo.svg";
import ResponsiveCard from "../../User/ResponsiveCard";
import { router } from '../../../Routes/routhPaths';

function ForgetPasswordView(props) {

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
          <form onSubmit={props.handleSubmit}>
            <Box
              sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
              noValidate
              autoComplete="off"
            >
                  <TextField
                    id="standard-error-helper-text"
                    label="Email Address"
                    // helperText="Incorrect entry."
                    variant="standard"
                    type="email"
                    name="email"
                    value={props.inputField['email']}
                    onChange={props.handleChange}
                    required
                  />
              <Grid sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '78%',
                marginTop: '5%'
              }}>
                <Button
                  type="submit"
                  color='primary'
                  variant="contained"
                  style={btnstyle}
                >
                  Reset Password
                </Button>
              </Grid>
              <Typography fontSize='13px'>
                Already a member? <Link to={{pathname: router.login}}> Login</Link>
              </Typography>
              <Box sx={{ m: 2 }} />
            </Box>
          </form>
        </ResponsiveCard>
      </Grid>
    </Box>
  );
}

export default ForgetPasswordView;