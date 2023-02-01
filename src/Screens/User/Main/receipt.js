import React from 'react';
import Box from "@mui/material/Box";
import {Button, IconButton, Typography, useMediaQuery, Divider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from 'moment';
import ReceiptTop from "../../../assets/images/Backgrounds/receipt_top.png"
import ReceiptBottom from "../../../assets/images/Backgrounds/receipt_bottom.png"
import Amount from "../../../assets/icons/amount.png"
import Clock from "../../../assets/icons/clock.png"
import List from "../../../assets/icons/list.png"
import Location from "../../../assets/icons/location.png"
import ParkIn from "../../../assets/icons/park_in.png"
import ParkOut from "../../../assets/icons/park_out.png"
import Percentage from "../../../assets/icons/percantage.png"
import Plate from "../../../assets/icons/plate.png"
import Rate from "../../../assets/icons/rate.png"


function Receipt(props) {

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
      // height: '100%'
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
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', width: '30%'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center'}}>
            <img src={ReceiptTop} width={'100%'}/>
          </Box>
        </Typography>
        <Typography variant='h6' align='right' sx={{color: 'primary.main', width: '70%'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', mx:2}}>
            Parking Receipt
          </Box>
        </Typography>
      </Box>
      <Divider sx={{width: '80%'}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'center', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
            <img src={List} width={'40px'}/>
            Parking ID
          </Box>
        </Typography>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {props.parking.parking_id}
          </Box>
        </Typography>
      </Box>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
          <img src={ParkIn} width={'50px'}/>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {moment(props.rateCycle[props.steps].current_time, 'MMMM Do YYYY, hh:mm a').format('ll')}
          </Box>
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
            {moment(props.rateCycle[props.steps].current_time, 'MMMM Do YYYY, hh:mm a').format('hh:mm a')}
          </Box>
        </Typography>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            <img src={Clock} width={'80px'}/>
          </Box>
        </Typography>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
          <img src={ParkOut} width={'50px'}/>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {moment(props.rateCycle[props.steps].time_desc, 'MMMM Do YYYY, hh:mm a').format('ll')}
          </Box>
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
            {moment(props.rateCycle[props.steps].time_desc, 'MMMM Do YYYY, hh:mm a').format('hh:mm a')}
          </Box>
        </Typography>
      </Box>
      <Divider sx={{width: '80%', mt:2}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Location} width={'40px'}/>
            {props.zone.zone_name}, {props.city.city_name}
          </Box>
        </Typography>
      </Box>
      <Divider sx={{width: '80%'}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Plate} width={'40px'}/>
            {props.plate}
          </Box>
        </Typography>
      </Box>
      <Divider sx={{width: '80%'}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Rate} width={'40px'}/>
            {props.tarif[0].rate_name}
          </Box>
        </Typography>
      </Box>
      <Divider sx={{width: '80%'}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Percentage} width={'40px'}/>
            Service Fee
          </Box>
        </Typography>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', alignSelf: 'center'}} >
          <Box>
            {(props.rateCycle[props.steps].service_fee/100).toFixed(2)} $
          </Box>
        </Typography>
      </Box>
      <Divider sx={{width: '80%', mb: 2}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
            <img src={Amount} width={'40px'}/>
            Amount Paid
          </Box>
        </Typography>
        <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', alignSelf: 'center'}} >
          <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {props.rateCycle[props.steps].total/100} $
          </Box>
        </Typography>
      </Box>
      <Button size='small' variant='contained' onClick={props.emailReciept}>
        Send by email
      </Button>
      <Box sx={{width: '100%'}}>
        <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
          <img src={ReceiptBottom} width={'100%'}/>
        </Box>
      </Box>
    </Box>
  );
}

export default Receipt;