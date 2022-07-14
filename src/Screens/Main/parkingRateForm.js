import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import {Button, Divider, IconButton, Popover, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import InfoIcon from '@mui/icons-material/Info';
// import CircularSlider from '@fseehawer/react-circular-slider';
import { CircleSlider } from "react-circle-slider";
import moment from 'moment';
import {PaymentRequestButtonElement, useStripe, CardElement, useElements} from '@stripe/react-stripe-js';
import parkingService from '../../services/parking-service';
import Spinner from '../../Common/Spinner';
import SnackAlert from '../../Common/Alerts';

const CARD_OPTIONS = {
  style: {
      base: {
          fontSize : '15px',
          color: "#013941",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
          color: "#aab7c4"
          },          
      },
      invalid: {
          color: "#9e2146"
      }
      }
  }

function ParkingRateForm(props) {
  const stripe = useStripe();
  const elements = useElements()
  const [spinner, setSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);
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

  useEffect(() => {
    if (stripe && props.rateCycle[props.steps].rate > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: props.rateCycle[props.steps].rate,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          console.log(result)
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async  (ev) => {
        console.log(ev)
        let body = {
          paymentMethod : ev.paymentMethod.id,
          amount : (props.rateCycle[props.steps].rate/100).toFixed(2),
          plate: props.plate,
          user: props.user.result._id,
          zone: props.zone,
          city: props.city,
          from: moment().format("MMM Do YYYY, hh:mm a"),
          to: props.rateCycle[props.steps].time_desc,
          // token: ev.token.id
        }
        ev.complete('success');
        const res = await parkingService.buyParking(body);
        setSpinner(false);
        if(!res.data.message){
          props.showReciept();
        }else{
          setAlertMessage(res.data.message);
          setSeverity('error');
          setShowAlert(true);
        }
      })
    }
  }, [stripe]);

  const purchaseParking= async (e)=>{
    e.preventDefault();
    setSpinner(true);
    if(props.rateCycle[props.steps].rate == 0){
      let body = {
        paymentMethod: '',
        amount: (props.rateCycle[props.steps].rate/100).toFixed(2),
        plate: props.plate,
        user: props.user.result._id,
        zone: props.zone,
        city: props.city,
        from: moment().format("MMM Do YYYY, hh:mm a"),
        to: props.rateCycle[props.steps].time_desc
      }
      const res = await parkingService.buyParking(body);
      setSpinner(false);
      if(!res.data.message){
        props.showReciept();
      }else{
        setAlertMessage(res.data.message);
        setSeverity('error');
        setShowAlert(true);
      }
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
    })
    if(!error){
        try{
            let body = {
              paymentMethod : paymentMethod,
              amount : (props.rateCycle[props.steps].rate/100).toFixed(2),
              plate: props.plate,
              user: props.user.result._id,
              zone: props.zone,
              city: props.city,
              from: moment().format("MMM Do YYYY, hh:mm a"),
              to: props.rateCycle[props.steps].time_desc
            }
            const res = await parkingService.buyParking(body);
            if(!res.data.message){
              props.showReciept();
            }else{
              setAlertMessage('Parking purchased');
              setSeverity('success');
              setShowAlert(true);
            }
        }catch(error){
            console.log("Error", error.message)
        }
    }else{
        console.log("Error", error)
        setAlertMessage(error.message);
        setSeverity('error');
        setShowAlert(true);
    }
    setSpinner(false);
  }

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
      <Box sx={{width: '80%', background: '#f8f8f8'}}>
        <Box sx={{display: 'flex', marginTop: 2, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='caption' align='left' sx={{color: 'primary.main'}} >
            {moment().format("MMM Do YYYY, hh:mm a")}
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
      <Box sx={{width: '80%', textAlign: 'center', position: 'relative'}}>
        <Box sx={{position: 'absolute', left: '41%', top: '40%'}} >
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
            {props.rateCycle[props.steps].time_diff}
          </Typography>
          <Typography variant='h6' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
            CA${(props.rateCycle[props.steps].rate/100).toFixed(2)}
          </Typography>
        </Box>
        <CircleSlider 
          value={props.steps} 
          min={0} 
          max={props.rateCycle.length-1} 
          onChange={props.handleChange} 
          size={280}
        />
      </Box>
      <Box sx={{width:'80%',bottom: '25px', position: 'absolute'}}>
        {props.rateCycle[props.steps].rate != 0 && paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
        <form onSubmit={purchaseParking} style={{width:'100%',marginTop: '16px'}}>
            {props.rateCycle[props.steps].rate != 0 && <CardElement options={CARD_OPTIONS}/>}
            <Button 
              type='submit'
              size='large'
              variant='contained'
              sx={{borderRadius: 8, width: '100%',marginTop: 2}}
            >
              Pay CA${(props.rateCycle[props.steps].rate/100).toFixed(2)}
            </Button>
        </form>
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