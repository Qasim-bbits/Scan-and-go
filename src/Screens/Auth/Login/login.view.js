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
import Alert from "../../../Common/Alerts";
import ResponsiveCard from "../../ResponsiveCard";
import { router } from '../../../Routes/routhPaths';

function LoginView(props) {

  const btnstyle={margin:'8% 0', width: '100%', borderRadius: 20, backgroundColor: '#2c3680'}

  return (
    <Box
      sx={{backgroundColor: '#f0f2f5', height:'100vh', width: '100%'}}
    >
      <Grid sx={{paddingTop: 5}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 40}}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Language"
            >
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'fr'}>Français</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveCard>
        {/* <Alert
          showAlert={showAlert}
          severity={severity}
          alertMessage={alertMessage}
          closeAlert={()=>setShowAlert(false)}
        /> */}
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
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  value={props.inputField['password']}
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
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    size="small"
                  />
                }
                label="Remember me"
              />
              <Typography variant='body2'>
                <Link to={{pathname: router.signUp}}>
                  Forgot password ?
                </Link>
              </Typography>
              <Button
                type="submit"
                color='primary'
                variant="contained"
                style={btnstyle}
              >
                Login
              </Button>
            </Grid>
            <Typography fontSize='13px'>
              Don't have an account? <Link to={{pathname: router.signUp}}> Sign Up</Link>
            </Typography>
            <Box sx={{ m: 2 }} />
          </Box>
        </form>
        </ResponsiveCard>
      </Grid>
    </Box>
  );
}

export default LoginView;