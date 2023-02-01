import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Box, Button, Divider, IconButton, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CircularSlider from '@fseehawer/react-circular-slider';
// import { CircleSlider } from "react-circle-slider";
import moment from 'moment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import parkingService from '../../../services/parking-service';
import Spinner from '../../../Common/Spinner';
import SnackAlert from '../../../Common/Alerts';
import Payment from './Payment';
import { config } from '../../../Constants';

const stripePromise = loadStripe(config.url.Publishable_key)
function ParkingRateForm(props) {
  const [spinner, setSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false
  });
  

  useEffect(() => {
  }, []);

  const handleWheelChange = (value)=>{
    setShowPayment(false);
    props.handleChange(value);
  }
  const purchaseParking= async (e)=>{
    e.preventDefault();
    setSpinner(true);
    if(props.rateCycle[props.steps].rate == 0){
      let body = {
        paymentMethod: '',
        amount: (props.rateCycle[props.steps].total/100).toFixed(2),
        plate: props.plate,
        user: props.user.result._id,
        zone: props.zone,
        city: props.city,
        from: props.rateCycle[props.steps].current_time,
        to: props.rateCycle[props.steps].time_desc,
        service_fee: props.rateCycle[props.steps].service_fee,
        coord: props.center,
        rate: props.tarif[0]._id
      }
      const res = await parkingService.buyParking(body);
      setSpinner(false);
      if(!res.data.message){
        // props.showReciept();
        // props.setParking(res.data)
        sessionStorage.removeItem("showParking")
        window.location.reload();
      }else{
        setAlertMessage(res.data.message);
        setSeverity('error');
        setShowAlert(true);
      }
    }else{
      setShowPayment(true);
    }
    setSpinner(false);
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: smDown ? '100vw' : 600,
      backgroundColor: '#fff'
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
      <Box sx={{width: '80%', background: '#f8f8f8'}}>
        <Box sx={{display: 'flex', marginTop: 2, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
            {props.rateCycle[props.steps].current_time}
          </Typography>
        </Box>
        <Divider/>
        <Box sx={{display: 'flex', marginTop: 2, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
            Your parking session will end:
          </Typography>
          <Typography variant='caption' align='left' 
            sx={{background: '#161b40', color: 'aliceblue', padding: '0 23px', borderRadius: '17px'}} 
          >
            {props.rateCycle[props.steps].day}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', marginTop: 2, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            {moment(props.rateCycle[props.steps].time_desc, "MMMM Do YYYY, hh:mm a").format("MMM Do YYYY")}
          </Typography>
          <Typography variant='h4' align='left' sx={{color: 'primary.main'}} >
            {moment(props.rateCycle[props.steps].time_desc, "MMM Do YYYY, hh:mm a").format("hh:mm a")}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{width: '80%'}}/>
      <Box sx={{display: 'flex', width: '80%', marginTop: 2, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
          Total (incl. 5% GST):
        </Typography>
        <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
          CA${(props.rateCycle[props.steps].rate/100).toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', width: '80%', marginTop: 2, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
          Service Fee:
        </Typography>
        <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
          CA${(props.rateCycle[props.steps].service_fee/100).toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{width: '80%', textAlign: 'center', position: 'relative', my: 2}}>
        <CircularSlider
            label={props.rateCycle[props.steps].time_diff}
            labelSize
            labelColor="#2c3680"
            knobColor="#2c3680"
            progressColorFrom="#14a7e0"
            progressColorTo="#2c3680de"
            progressSize={26}
            valueFontSize={'3rem'}
            trackColor="#eeeeee"
            trackSize={24}
            knobSize={72}
            labelBottom={true}
            prependToValue="$"
            data={props.stepData}
            dataIndex={0}
            onChange={ value => { handleWheelChange(value); } }
        />
      </Box>
      <Box sx={{width:'80%', my: 1}}>
        <form onSubmit={purchaseParking} style={{width:'100%',marginTop: '16px'}}>
          {!showPayment && 
          <Button 
            type='submit'
            size='large'
            variant='contained'
            sx={{borderRadius: 8, width: '100%',my: 2}}
          >
            ${(props.rateCycle[props.steps].total/100).toFixed(2)}
          </Button>}
        </form>
        {showPayment && 
          <Elements stripe={stripePromise}>
            <Payment props={props}/>
          </Elements>
        }
      </Box>
      <Spinner
        spinner = {spinner}  
      />
      <SnackAlert
        alertMessage = {alertMessage}
        showAlert = {showAlert}
        severity = {severity}
        
        closeAlert = {()=>setShowAlert(!showAlert)}
      />
    </Box>
  );
}

export default ParkingRateForm;