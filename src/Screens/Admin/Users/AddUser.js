import * as React from "react";
import {
  Box, Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Drawer, Button, TextField, Grid, Typography,
  IconButton, Autocomplete, Divider
} from "@mui/material";
import {Close} from "@mui/icons-material";

export default function AddUser(props) {

  return (
    <Drawer
      className="drawer-width"
      PaperProps={{
        sx: {
          backgroundColor: "#fff !important",
          width:
            window.innerWidth > 700
              ? "35% !important"
              : "100% !important",
        },
      }}
      anchor={'right'}
      open={props.openDrawer}
      onClose={props.setOpenDrawer}
    >
      <Box
        component="form"
        onSubmit={props.handleSubmit} 
        sx={{
          px: 3
        }}
      >
        <Grid container spacing={3} sx={{placeContent: "center"}}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="primary" className="font-bold m-2 font-gray">
              {props.btn} User
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={props.setOpenDrawer}>
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-error-helper-text"
              label="First Name"
              color="secondary"
              type="text"
              name="fname"
              value={props.inputField["fname"]}
              onChange={props.handleChange}
              size="small"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-error-helper-text"
              label="Last Name"
              color="secondary"
              type="text"
              name="lname"
              value={props.inputField["lname"]}
              onChange={props.handleChange}
              size="small"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-error-helper-text"
              label="Address"
              color="secondary"
              type="text"
              name="address"
              value={props.inputField["address"]}
              onChange={props.handleChange}
              size="small"
              // required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-error-helper-text"
              label="Mobile No"
              color="secondary"
              type="number"
              name="mobile_no"
              value={props.inputField["mobile_no"]}
              onChange={props.handleChange}
              size="small"
              // required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-error-helper-text"
              label="Email"
              color="secondary"
              type="email"
              name="email"
              value={props.inputField["email"]}
              onChange={props.handleChange}
              size="small"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl  color="secondary">
              <FormLabel color="secondary" id="demo-row-radio-buttons-group-label">Role</FormLabel>
              <RadioGroup
                row
                name="role"
                value={props.inputField["role"]}
                onChange={props.handleChange}
                color="secondary"
              >
                <FormControlLabel value="user" sx={{color: "#2c3680"}} control={
                  <Radio color="secondary"/>
                } label="User"/>
                <FormControlLabel value="admin" sx={{color: "#2c3680"}} control={
                  <Radio color="secondary"/>
                } label="Admin" />
                <FormControlLabel value="agent" sx={{color: "#2c3680"}} control={
                  <Radio color="primary"/>
                } label={'Agent'} />
              </RadioGroup>
            </FormControl>
          </Grid>
          {props.inputField["role"] == 'agent' && <>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="subtitle1" color={'primary'}>
                  Permissions
                </Typography>  
              </Divider>
            </Grid>
            <Grid item xs={12} >
              <Autocomplete
                multiple
                options={props.cities}
                getOptionLabel={(option) => option.city_name}
                value={props.selectedCities}
                onChange={(event, newValue)=>props.setSelectedCities(newValue)}
                renderInput={(params) => (
                <TextField 
                  {...params} label={'Select City'}
                  color="primary" size="small"/>
                )}
              />
            </Grid>
          </>}
          <Button
            type="submit"
            color="primary"
            sx={{ margin: "30px 0px" }}
            variant="contained"
          >
            {props.btn}
          </Button>
        </Grid>
      </Box>
    </Drawer>
  );
}
