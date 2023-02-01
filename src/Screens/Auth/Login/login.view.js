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
  IconButton,
  InputAdornment,
} from "@mui/material";
import logo from "../../../assets/images/Logos/logo.svg";
import ResponsiveCard from "../../User/ResponsiveCard";
import { router } from '../../../Routes/routhPaths';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginView(props) {
  const btnstyle={margin:'8% 0', width: '100%', borderRadius: 20, backgroundColor: '#2c3680'}
  const [showPassword, setShowPassword] = useState(false);

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
              name={'language'}
              value={props.inputField['language']}
              onChange={props.handleChange}
            >
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'fr'}>Français</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveCard>
        <Grid align='center' sx={{mt:5, mb: 4}}>
          <Avatar src={logo} variant='square' sx={{width: 220, height: 70}} />
        </Grid>
        {!props.resetPassword && <form onSubmit={props.handleSubmit}>
          <Box
            sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            noValidate
            autoComplete="off"
          >
                <TextField
                  id="standard-error-helper-text"
                  label="Email Address"
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
                  type={(showPassword) ? 'text':'password'}
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  value={props.inputField['password']}
                  onChange={props.handleChange}
                  InputProps={{ 
                    // pattern: "[a-zA-Z0-9]{6,12}",
                    // title: "Only numbers and alphabets are allowed",
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            onClick={()=>setShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
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
                    name="rememberMe"
                    color="primary"
                    size="small"
                    checked={props.inputField['rememberMe']}
                    onChange={props.handleChecked}
                  />
                }
                label="Remember me"
              />
              <Typography variant='body2'>
                <Link to={{pathname: router.reset}}>
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
        </form>}
        {props.resetPassword && <form onSubmit={props.handleChangePassword}>
          <Box
            sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-error-helper-text"
              label="New Password"
              variant="standard"
              type={(showPassword) ? 'text':'password'}
              name="new_password"
              value={props.inputField['new_password']}
              onChange={props.handleChange}
              InputProps={{ 
                // pattern: "[a-zA-Z0-9]{6,12}",
                // title: "Only numbers and alphabets are allowed",
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        onClick={()=>setShowPassword(!showPassword)}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
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
              <Button
                type="submit"
                color='primary'
                variant="contained"
                style={btnstyle}
              >
                Update Password
              </Button>
            </Grid>
            <Typography fontSize='13px'>
              Don't have an account? <Link to={{pathname: router.signUp}}> Sign Up</Link>
            </Typography>
            <Box sx={{ m: 2 }} />
          </Box>
        </form>}
        </ResponsiveCard>
      </Grid>
    </Box>
  );
}

export default LoginView;