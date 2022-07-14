import React from 'react';
import Box from "@mui/material/Box";
import {Button, IconButton, Typography, Paper, useMediaQuery, ListItem, Divider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from 'moment';
import Logo from "../../assets/images/Logos/logo.png"

function Receipt(props) {
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
          Parking Purchased
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' ,marginTop: '10%', padding: '0 1% 0 1%',width: '100%'}}>
        <Paper elevation={1} sx={{p: 2, width: '80%', backgroundColor:'#f0f2f5', marginBottom: '5px'}}>
          <div style={{textAlign: "center"}}>
            <img src={Logo} alt="Logo" width={'50%'}/>
          </div>
          <div>
            You have succesfully purhcased parking from&nbsp;{moment().format("MMM Do YYYY, hh:mm a")}&nbsp;to&nbsp;{props.rateCycle[props.steps].time_desc}
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

export default Receipt;