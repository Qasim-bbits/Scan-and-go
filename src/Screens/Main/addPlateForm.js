import React from 'react';
import Box from "@mui/material/Box";
import {Button, IconButton, TextField, Typography, useMediaQuery} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddPlateForm(props) {
  const {
    setDrawerOpen,
  } = props

  const btnstyle={margin:'8% 0', width: '100%', borderRadius: 20, backgroundColor: '#2c3680', color: '#fff'}

  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false
  });

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: smDown ? '100vw' : 600,
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Box sx={{display: 'flex', backgroundColor: '#14a7e0', width: '100%'}}>
        <IconButton
          color="inherit"
          edge="end"
          onClick={props.back}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{display: 'flex', width: '80%', justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='h5' align='left' sx={{marginTop: 5, color: 'primary.main'}} >
          <IconButton
            color="inherit"
            edge="start"
          >
            <DirectionsCarIcon />
          </IconButton>
          {props.btn}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10%', padding: '0 8% 0 8%'}}>
        <Typography variant= 'body1' color='#14a7e0' marginBottom='5%'>
          You can add many cars as you want, organize and always have them in your hands.
        </Typography>
        <form onSubmit = {props.handlePlateSubmit} style={{width: '100%'}}>
          <TextField
            fullWidth
            placeholder='New Plate'
            name="plate"
            value={props.inputPlateField["plate"]}
            onChange={props.handlePlateChange}
          />
          <Button style={btnstyle} type="submit">
            {props.btn}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddPlateForm;