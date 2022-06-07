import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Link,
} from "@mui/material";
import Logo from "../../Assets/Images/Logos/Logo.svg";
import Alert from "../../Common/Alerts";
import ResponsiveCard from "../ResponsiveCard";

function LoginView() {

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
              <MenuItem value={'english'}>English</MenuItem>
              <MenuItem value={'français'}>Français</MenuItem>
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
        <Grid align='center'>
          <Avatar src={Logo} sx={{ width: '60%', height: '70%', marginTop: '10%' }} variant='square' />
        </Grid>
        <form>
          <Box
            sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            component="form"
            noValidate
            autoComplete="off"
          >
                <TextField
                  id="standard-error-helper-text"
                  label="Email Address"
                  // helperText="Incorrect entry."
                  variant="standard"
                />
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
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
                <Link href="#" >
                  Forgot password ?
                </Link>
              </Typography>
              <Button
                type='submit'
                color='primary'
                variant="contained"
                style={btnstyle}
              >
                Login
              </Button>
            </Grid>
            <Typography fontSize='13px'>
              Don't have an account? <Link href='/signup'>Sign Up</Link>
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