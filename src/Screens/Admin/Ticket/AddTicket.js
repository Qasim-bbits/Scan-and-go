import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, IconButton, Autocomplete, Divider, useTheme} from "@mui/material";
import { Add, Close, DeleteForeverOutlined } from "@mui/icons-material";

export default function AddTicket(props) {
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    let arr = [];
    for(let i = 0; i <= (props.inputs.length-1); i++){
      let obj = {
        rate: parseInt(props.inputs[i].rate),
        applied_from: parseInt(props.inputs[i].time)*24*60,
        applied_to: (props.inputs[i+1] !== undefined) ? parseInt(props.inputs[i+1].time)*24*60 : '',
        order: i+1
      }
      if(props.btn == 'Update'){
        obj.id = props.inputs[i].id;
      }
      arr.push(obj);
    }
    props.handleSubmit(arr);
  }

  return (
      <Box component="form" onSubmit={handleSubmit} sx={{p:3}}>
        <Grid container spacing={3} sx={{placeContent: "center"}}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="primary" className="font-bold m-2 font-gray">
              {props.btn} Ticket
            </Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={props.onClose}>
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label={'Ticket Name'}
                color="primary"
                type="text"
                name="ticket_name"
                value={props.inputField["ticket_name"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label={'Ticket Number Start'}
                color="primary"
                type="number"
                name="ticket_num_min"
                value={props.inputField["ticket_num_min"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="subtitle1" color={'primary'}>
                Ticket Aging
              </Typography>  
            </Divider>
          </Grid>
          <Grid item xs={12} align="center">
              <Grid container spacing={2} sx={{placeContent: "center"}}>
                {props.inputs.map((el, index) => {
                    return (
                      <>
                        <Grid item xs={5}>
                          <TextField
                            id={index}
                            label={'Rate (in cents)'}
                            color="primary"
                            type="number"
                            name="rate"
                            value={el.rate}
                            onChange={props.handleInputChange}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={5}>
                          {index !== 0 && <TextField
                            id={index}
                            label={'Days'}
                            color="primary"
                            helperText={
                              (el.time !== 0 && el.time !== undefined && el.time !== '') ? 'after '+ el.time +' days' : ''
                            }
                            type="number"
                            name="time"
                            value={el.time}
                            onChange={props.handleInputChange}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                          />}
                        </Grid>
                        <Grid item xs={1} align="center">
                          {(props.inputs.length-1) == index && <IconButton
                            type="button"
                            color="primary"
                            variant="outlined"
                            onClick={props.addInput}>
                              <Add/>
                          </IconButton>}
                        </Grid>
                        <Grid item xs={1} align="end">
                          {props.inputs.length !== 1 && <IconButton
                            type="button"
                            color="primary"
                            variant="outlined"
                            onClick={()=>props.delInput(index)}>
                              <DeleteForeverOutlined/>
                          </IconButton>}
                        </Grid>
                      </>
                  )}
                )}
              </Grid>
            </Grid>
          <Grid item xs={12} align="right">
            <Button 
              type="button"
              color="secondary"
              variant="contained"
              onClick={props.onClose}
              size="small"
              sx={{mx: 2}}>
                Cancel
            </Button>
            <Button 
              type="submit"
              color="primary"
              variant="contained"
              size="small">
                {props.btn}
            </Button>
          </Grid>
        </Grid>
    </Box>
  );
}
