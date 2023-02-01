import * as React from "react";
import {
  Box, FormControlLabel, Checkbox, Grid, Typography, Drawer, Button, TextField, Autocomplete
} from "@mui/material";
import {Close} from "@mui/icons-material";

export default function EditRate(props) {
  const checkBoxes = [
    {label: 'Mo', name: 'Monday'},
    {label: 'Tu', name: 'Tuesday'},
    {label: 'We', name: 'Wednesday'},
    {label: 'Th', name: 'Thursday'},
    {label: 'Fr', name: 'Friday'},
    {label: 'Sa', name: 'Saturday'},
    {label: 'Su', name: 'Sunday'}
  ]
  return (
    <Drawer
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
        sx={{p: 3}}
      >
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" color="primary">
                Edit Rate
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Close
                className="drawer-icon-visiblity"
                sx={{ color: "black", cursor: "pointer" }}
                onClick={props.setOpenDrawer}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-error-helper-text"
                label="Rate Name"
                color="secondary"
                type="text"
                name="rate_name"
                value={props.inputField["rate_name"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-error-helper-text"
                label="Rate Type"
                color="secondary"
                type="text"
                name="rate_type_name"
                value={props.inputField["rate_type_name"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
            </Grid>
            {props.inputField["special_rate"] === true && <Grid item xs={6}>
              <TextField
                id="standard-error-helper-text"
                label="Start Date"
                color="secondary"
                type="datetime-local"
                name="start_date"
                value={props.inputField["start_date"]}
                onChange={props.handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                required
                fullWidth
              />
            </Grid>}
            {props.inputField["special_rate"] === true && <Grid item xs={6}>
              <TextField
                id="standard-error-helper-text"
                label="End Date"
                color="secondary"
                type="datetime-local"
                name="end_date"
                value={props.inputField["end_date"]}
                onChange={props.handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Grid>}
            <Grid item xs={6}>
              <TextField
                id="standard-error-helper-text"
                label="Start time"
                color="secondary"
                type="time"
                name="start_time"
                value={props.inputField["start_time"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-error-helper-text"
                label="End time"
                color="secondary"
                type="time"
                name="end_time"
                value={props.inputField["end_time"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4} alignSelf="center" align="center">
              <Typography variant="body1" sx={{color: '#000000de'}}>
                Days:
              </Typography>
            </Grid>
            <Grid item xs={8} alignSelf="center" align="center">
              {checkBoxes.map(x=>{
                return(
                  <FormControlLabel
                    value="top"
                    sx={{color:'#0000009c', margin: 0}}
                    size="small"
                    control={
                      <Checkbox
                        name={x.name}
                        checked={props.inputField[x.name] == true}
                        color="primary"
                        onChange={props.handleCheck}
                        value={props.inputField[x.name]}
                        size="small"
                      />}
                    label={<Typography sx={{fontSize: '12px'}}>{x.label}</Typography>}
                    labelPlacement="top"
                  />
                )
              })}
            </Grid>
            {props.rateSteps.map((x,index)=>{
              return(
                <>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-error-helper-text"
                      label="Rate (in cents)"
                      color="secondary"
                      type="number"
                      name={x._id+"_rate"}
                      value={x[x._id+"_rate"]}
                      onChange={(e)=>props.handleRateChange(e,index)}
                      size="small"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-error-helper-text"
                      label="Time (in minutes)"
                      color="secondary"
                      type="number"
                      name={x._id+"_time"}
                      value={x[x._id+"_time"]}
                      onChange={(e)=>props.handleRateChange(e,index)}
                      size="small"
                      required
                      fullWidth
                    />
                  </Grid>
                </>
              )
            })}
            <Grid item xs={12}>
              <Button 
                type="submit"
                color="primary"
                variant="contained">
                Edit Rate
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
}
