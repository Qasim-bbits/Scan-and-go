import React from 'react';
import {Button, Grid, Typography, TextField, Paper} from "@mui/material";

function ProfileView(props) {
  console.log(props)
  return (
    <Paper elevation={2} sx={{ width: '100%',p: 3, height: '80vh' }}>
        <Typography variant="h6" color="primary">
          Profile
        </Typography>
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={12} md={6} lg={6} alignSelf={"center"}>
              <TextField
                label="First Name"
                color="primary"
                type="text"
                name="fname"
                value={props.inputField["fname"]}
                onChange={props.handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} alignSelf={"center"}>
              <TextField
                label="Last Name"
                color="primary"
                type="text"
                name="lname"
                value={props.inputField["lname"]}
                onChange={props.handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} alignSelf={"center"}>
              <TextField
                label="Contact No"
                color="primary"
                type="number"
                name="mobile_no"
                value={props.inputField["mobile_no"]}
                onChange={props.handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} alignSelf={"center"}>
              <TextField
                label="Address"
                color="primary"
                type="text"
                name="address"
                value={props.inputField["address"]}
                onChange={props.handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} alignSelf={"center"}>
              <TextField
                label="Email"
                color="primary"
                type="email"
                name="email"
                value={props.inputField["email"]}
                onChange={props.handleChange}
                size="small"
                required
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} alignSelf={"center"}>
              <TextField
                label="Password"
                color="primary"
                type="password"
                name="password"
                value={props.inputField["password"]}
                onChange={props.handleChange}
                size="small"
                required
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}alignSelf={"center"}>
              <Button type="submit" color="primary" variant="contained">
                Update  
              </Button>
            </Grid>
          </Grid>
        </form>
    </Paper>
        
  );
}

export default ProfileView;