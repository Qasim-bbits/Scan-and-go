import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import {Button, Divider, IconButton, Popover, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import InfoIcon from '@mui/icons-material/Info';

function SelectTariff(props) {
  const {
    setDrawerOpen,
  } = props

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
            <LocalParkingIcon />
          </IconButton>
          Select Parking Rate
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20%', padding: '0 8% 0 8%', width: '80%'}}>
        {props.tarif.map(x=>{
          return(
            <Button variant='contained' onClick={()=>props.onTarifSelect(x)} style={parkingRateButton} fullWidth sx={{justifyContent: 'flex-start'}}>
              <IconButton
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <InfoIcon />
              </IconButton>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>{x.rate_name}</Typography>
              </Popover>
              {x.rate_name}
            </Button>
          )
        })}
      </Box>
    </Box>
  );
}

export default SelectTariff;