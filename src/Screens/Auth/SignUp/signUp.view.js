import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid, InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {countries} from "./signUp.utils";
import Alert from "../../../Common/Alerts";
import logo from "../../../assets/images/Logos/logo.svg";
import ResponsiveCard from "../../ResponsiveCard";
import { router } from '../../../Routes/routhPaths';

function SignUpView(props) {

  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');

  const handleWrongCredentials = () => {
    setAlertMessage('Invalid username or password');
    setAlertTitle('Login Error')
    setShowAlert(true);
    setSeverity('error');
  }

  const btnstyle={margin:'8% 0', width: '100%', borderRadius: 20, backgroundColor: '#2c3680'}

  return (
    <Box
      sx={{backgroundColor: '#f0f2f5', height:'100%', width: '100%'}}
    >
      <Grid sx={{paddingTop: 5}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 40}}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Language"
              name="language"
              value={props.inputField['language']}
              onChange={props.handleChange}
            >
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'fr'}>Français</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveCard>
          <Alert
            showAlert={showAlert}
            severity={severity}
            alertMessage={alertMessage}
            closeAlert={()=>setShowAlert(false)}
          />
          <Grid align='center' sx={{mt:5, mb: 4}}>
            <Avatar src={logo} variant='square' sx={{width: 220, height: 70}} />
          </Grid>
        <form onSubmit={props.handleSubmit}>
          <Box
            sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-error-helper-text"
              label="First Name"
              fullWidth
              variant="standard"
              type="text"
              name="fname"
              value={props.inputField['fname']}
              onChange={props.handleChange}
              required
            />
            <TextField
              id="standard-error-helper-text"
              label="Last Name"
              fullWidth
              variant="standard"
              type="text"
              name="lname"
              value={props.inputField['lname']}
              onChange={props.handleChange}
              required
            />
            <TextField
              id="standard-error-helper-text"
              label="Address"
              fullWidth
              variant="standard"
              type="text"
              name="address"
              value={props.inputField['address']}
              onChange={props.handleChange}
            />
            <TextField
              id="standard-error-helper-text"
              label="Mobile No"
              fullWidth
              variant="standard"
              type="number"
              name="mobile_no"
              value={props.inputField['mobile_no']}
              onChange={props.handleChange}
            />
            <TextField
              id="standard-error-helper-text"
              label="Email Address"
              fullWidth
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
              fullWidth
              name="password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={props.handleChange}
              value={props.inputField['password']}
              inputProps={{ 
                pattern: "[a-zA-Z0-9]{6,12}",
                title: "Only numbers and alphabets are allowed"
              }}
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
                    name="accept_conditions"
                    color="primary"
                    onChange={props.handleCheck}
                    value={props.inputField['accept_conditions']}
                    required
                  />
                }
                label={
                  <Typography variant='caption' sx={{letterSpacing: 0.1}}>
                    I have read and agreed to the Conditions of Use and the Privacy Policy.
                  </Typography>
                }
              />
              <Box sx={{ m: 2 }} />
              <Button
                type='submit'
                color='primary'
                variant="contained"
                style={btnstyle}
                size='large'
              >
                Sign Up
              </Button>
            </Grid>
            <Typography fontSize='13px'>
              Already a member? <Link to={{pathname: router.login}}>Log In</Link>
            </Typography>
            <Box sx={{ m: 2 }} />
          </Box>
        </form>
        </ResponsiveCard>
      </Grid>
    </Box>
  );
}

export default SignUpView;