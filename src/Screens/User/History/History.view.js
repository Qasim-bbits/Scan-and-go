import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import {Button, Divider, IconButton, Popover, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import InfoIcon from '@mui/icons-material/Info';
import ParkIn from "../../../assets/icons/park_in.png"
import Clock from "../../../assets/icons/clock.png"
import ParkOut from "../../../assets/icons/park_out.png"

function HistoryView(props) {

  const parkingRateButton = {
    backgroundColor: '#f0f2f5',
    margin: 5,
    color: '#2c3680',
  }
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Box sx={{display: 'flex', width: '80%', justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='h5' align='left' sx={{marginTop: 5, color: 'primary.main'}} >
          <IconButton
            color="inherit"
            edge="start"
          >
            <LocalParkingIcon />
          </IconButton>
          Parking History
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '2%', padding: '0 8% 0 8%', width: '80%'}}>
        {props.history.map(x=>{
          return(
            <Button variant='contained' onClick={()=>props.onListSelect(x)} style={parkingRateButton} fullWidth sx={{justifyContent: 'flex-start'}}>
                <Box sx={{display: 'flex', width: '100%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
                    <Typography variant='caption' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
                        <img src={ParkIn} width={'50px'}/>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {moment(x.from).format('ll')}
                        </Box>
                        <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
                            {moment(x.from).format('hh:mm a')}
                        </Box>
                    </Typography>
                    <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
                        <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            <img src={Clock} width={'80px'}/>
                        </Box>
                    </Typography>
                    <Typography variant='caption' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
                        <img src={ParkOut} width={'50px'}/>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {moment(x.to).format('ll')}
                        </Box>
                        <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
                            {moment(x.to).format('hh:mm a')}
                        </Box>
                    </Typography>
                </Box>
            </Button>
          )
        })}
      </Box>
    </Box>
  );
}

export default HistoryView;