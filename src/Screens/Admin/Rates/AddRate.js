import React, {useState} from "react";
import {
  Box, FormControlLabel, Checkbox, Grid, Typography, Drawer, Button, TextField, Autocomplete, Divider, IconButton, Radio, RadioGroup
} from "@mui/material";
import {Add, Close, DeleteForeverOutlined} from "@mui/icons-material";

export default function AddRate(props) {
  const inputArr = [{rate: 0, time: 0}];
  const stepsArr = [{
    rate_type_name: '', start_time: '', end_time: '', 
    Monday: false, Tuesday: false, Wednesday: false, 
    Thursday: false, Friday: false, Saturday: false, Sunday: false, 
    rate_steps: inputArr
  }]
  const [steps, setSteps] = useState(stepsArr);
  
  const addInput = (e, index) => {
    let clone = [...steps];
    clone[index].rate_steps.push({rate: 0,time: 0})
    setSteps(clone);
  };

  const delInput = (i, index)=>{
    let clone = [...steps];
    clone[index].rate_steps.splice(i , 1);
    setSteps(clone);
  }

  const handleChange = (e, index) => {
    const i = e.target.id;
    setSteps(s => {
      const newArr = s.slice();
      newArr[index].rate_steps[i][e.target.name] = e.target.value;
      return newArr;
    });
  };

  const addStep = () => {
    setSteps(s => {return [ ...s,{
        rate_type_name: '', start_time: '', end_time: '', 
        Monday: false, Tuesday: false, Wednesday: false, 
        Thursday: false, Friday: false, Saturday: false, Sunday: false, 
        rate_steps: inputArr
      }];
    });
  };

  const delStep = (index)=>{
    let clone = [...steps];
    clone.splice(index , 1);
    setSteps(clone);
  }

  const handleStepChange = (e) => {
    const index = e.target.id;
    setSteps(s => {
      const newArr = s.slice();
      newArr[index][e.target.name] =  e.target.checked || e.target.value;
      return newArr;
    });
  };

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
              ? "50% !important"
              : "100% !important",
        },
      }}
      anchor={'right'}
      open={props.openAddDrawer}
      onClose={props.setOpenAddDrawer}
    >
      <Box
        sx={{p: 3}}
      >
        <form onSubmit={(e)=>props.handleAddSubmit(e, steps)}>
          <Grid container spacing={2} sx={{placeContent: "center"}}>
            <Grid item xs={6}>
              <Typography variant="h6" color="primary">
                Add Rate
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Close
                className="drawer-icon-visiblity"
                sx={{ color: "black", cursor: "pointer" }}
                onClick={props.setAddOpenDrawer}
              />
            </Grid>
            <Grid item xs={12} align="right">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={props.zones}
                getOptionLabel={(option) => option.zone_name}
                value={props.selectedZone}
                onChange={(event, newValue)=>props.onZoneSelected(newValue)}
                renderInput={(params) => (
                <TextField {...params} label="Select Zone" color="secondary" size="small" required/>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="regular" sx={{color: "#2c3680"}} control={
                  <Radio 
                    checked={props.rateType === 'regular'}
                    onChange={props.onRateType}
                  />} label="Regular Rate" />
                <FormControlLabel value="special" sx={{color: "#2c3680"}} control={
                  <Radio
                    checked={props.rateType === 'special'}
                    onChange={props.onRateType}
                  />} label="Special Rate" />
              </RadioGroup>
            </Grid>
            {props.rateType === 'regular' && <Grid item xs={12}>
              <TextField
                id="standard-error-helper-text"
                label="Rate Name"
                color="secondary"
                type="text"
                name="rate_name"
                value={props.inputAddField["rate_name"]}
                onChange={props.handleAddChange}
                size="small"
                InputProps={{readOnly: props.btn == "Edit"}}
                required
                fullWidth
              />
            </Grid>}
            {props.rateType === 'special' && <Grid item xs={12} align="right">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={props.rates}
                getOptionLabel={(option) => option.rate_name}
                value={props.selectedRate}
                onChange={(event, newValue)=>props.setSelectedRate(newValue)}
                renderInput={(params) => (
                <TextField {...params} label="Select Rate" color="secondary" size="small" required/>
                )}
              />
            </Grid>}
            {props.rateType === 'special' && <Grid item xs={6}>
              <TextField
                id="standard-error-helper-text"
                label="Start Date"
                color="secondary"
                type="datetime-local"
                name="start_date"
                value={props.inputAddField["start_date"]}
                onChange={props.handleAddChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                required
                fullWidth
              />
            </Grid>}
            {props.rateType === 'special' && <Grid item xs={6}>
              <TextField
                id="standard-error-helper-text"
                label="End Date"
                color="secondary"
                type="datetime-local"
                name="end_date"
                value={props.inputAddField["end_date"]}
                onChange={props.handleAddChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Grid>}
            <Grid item xs={12}>
              <TextField
                id="standard-error-helper-text"
                label="Service Fee (in cents)"
                color="secondary"
                type="number"
                name="service_fee"
                value={props.inputAddField["service_fee"]}
                onChange={props.handleAddChange}
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary">
                Rate Steps
              </Typography>
            </Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={2} sx={{placeContent: "center"}}>
                {steps.map((el, index) => {
                    return (
                      <>
                        <Grid item xs={6} align="start" alignSelf="center">
                          <Typography variant="subtitle1" color="primary">
                            {(index+1)}.
                          </Typography>
                        </Grid>
                        <Grid item xs={6} align="end">
                          {steps.length !== 1 && <IconButton
                            type="button"
                            color="primary"
                            variant="outlined"
                            onClick={()=>delStep(index)}>
                              <DeleteForeverOutlined/>
                          </IconButton>}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id={index}
                            label="Rate Type"
                            color="secondary"
                            type="text"
                            name="rate_type_name"
                            value={el.rate_type_name}
                            onChange={handleStepChange}
                            size="small"
                            InputProps={{readOnly: props.btn == "Edit"}}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={index}
                            label="Start time"
                            color="secondary"
                            type="time"
                            name="start_time"
                            value={el.start_time}
                            onChange={handleStepChange}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={index}
                            label="End time"
                            color="secondary"
                            type="time"
                            name="end_time"
                            value={el.end_time}
                            onChange={handleStepChange}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2} alignSelf="center">
                          <Typography variant="body1" sx={{color: '#000000de'}}>
                            Days:
                          </Typography>
                        </Grid>
                        <Grid item xs={10} alignSelf="center" align="right">
                          {checkBoxes.map(x=>{
                            return(
                              <FormControlLabel
                                value="top"
                                sx={{color:'#0000009c', margin: 0}}
                                size="small"
                                control={
                                  <Checkbox
                                    id={index}
                                    name={x.name}
                                    checked={el[x.name] == true}
                                    color="primary"
                                    onChange={handleStepChange}
                                    value={el[x.name]}
                                    size="small"
                                  />}
                                label={<Typography sx={{fontSize: '12px'}}>{x.label}</Typography>}
                                labelPlacement="top"
                              />
                            )
                          })}
                        </Grid>
                        {el.rate_steps.map((item, i) => {
                          return (
                            <>
                              <Grid item xs={5}>
                                <TextField
                                  id={i}
                                  label="Rate (in cents)"
                                  color="secondary"
                                  type="number"
                                  name="rate"
                                  value={item.rate}
                                  onChange={(e)=>handleChange(e,index)}
                                  size="small"
                                  required
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={5}>
                                <TextField
                                  id={i}
                                  label="Time (in minutes)"
                                  color="secondary"
                                  type="number"
                                  name="time"
                                  value={item.time}
                                  onChange={(e)=>handleChange(e,index)}
                                  size="small"
                                  required
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={1} align="center">
                                {el.rate_steps.length !== 1 && <IconButton
                                  type="button"
                                  color="primary"
                                  variant="outlined"
                                  onClick={()=>delInput(i, index)}>
                                    <DeleteForeverOutlined/>
                                </IconButton>}
                              </Grid>
                              <Grid item xs={1} align="center">
                                {i == el.rate_steps.length-1 && <IconButton
                                  type="button"
                                  color="primary"
                                  variant="outlined"
                                  onClick={()=>addInput(i,index)}>
                                    <Add/>
                                </IconButton>}
                              </Grid>
                            </>
                          );
                        })}
                        <Grid item xs={12}>
                          <Divider color="secondary"/>
                        </Grid>
                      </>
                  )}
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <IconButton
                type="button"
                color="primary"
                variant="outlined"
                onClick={addStep}>
                  <Add/>
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained">
                Add Rate
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
}
