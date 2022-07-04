import React from 'react';
import Box from "@mui/material/Box";
import {Button, IconButton, Typography, Paper, useMediaQuery} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SelectPlateForm(props) {
  const {
    setDrawerOpen,
  } = props

  const listOfCars = [
    {numberPlate: 'LGS-123', model: 'Mehran'},
    {numberPlate: 'VWS-113', model: 'Civic'},
    {numberPlate: 'LSS-923', model: 'Corolla'},
    {numberPlate: 'MAS-223', model: 'Prado'},
  ]

  const parkingRateButton = {
    backgroundColor: '#f0f2f5',
    margin: 5,
    color: '#2c3680',
  }

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
      width: smDown ? '100%' : 600,
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Box sx={{display: 'flex', backgroundColor: '#14a7e0', width: '100%'}}>
        <IconButton
          color="inherit"
          edge="end"
          onClick={() => setDrawerOpen(false)}
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
          Select Plate
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10%', padding: '0 1% 0 1%'}}>
        {listOfCars.map((car) => (
          <Paper elevation={1} sx={{display: 'flex', height: 120, width: '100%'}}>
            <Box>
              <IconButton
                color="primary"
                edge="start"
              >
                <DirectionsCarIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                color="primary"
                edge="start"
              >
                <DirectionsCarIcon />
              </IconButton>
            </Box>
            <Box>
              <Button 
                variant='contained' 
                style={parkingRateButton} 
                fullWidth 
                sx={{justifyContent: 'flex-start'}}
                onClick={()=>props.onPlateSelect(car.numberPlate)}>
                <Typography>
                  {car.numberPlate}
                </Typography>
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default SelectPlateForm;