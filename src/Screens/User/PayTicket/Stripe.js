import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Box, Button, Divider, Chip, Grid} from "@mui/material";
import {PaymentRequestButtonElement, useStripe, CardElement, useElements} from '@stripe/react-stripe-js';
import parkingService from '../../../services/parking-service';
import Spinner from '../../../Common/Spinner';
import SnackAlert from '../../../Common/Alerts';
import ticketServices from '../../../services/ticket-service';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

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

function Stripe(props) {
  const stripe = useStripe();
  const elements = useElements()
  const [spinner, setSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'CA',
        currency: 'cad',
        total: {
          label: 'Connected Parking',
          amount: props.amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async  (ev) => {
        setSpinner(true);
        let body = {
          paymentMethod : ev.paymentMethod,
          payment_gateway: "stripe",
          id: props.id,
          amount: props.amount,
          plate: props.plate,
          issued_at: props.issued_at,
          zone_name: props.zone
        }
        ev.complete('success');
        const res = await ticketServices.payTicket(body);
        setSpinner(false);
        if(!res.data.message){
          props.handleNext()
        }else{
          setAlertMessage(res.data.message);
          setSeverity('error');
          setShowAlert(true);
        }
      })
    }
  }, [stripe, props.amount]);

  const purchaseParking= async (e)=>{
    e.preventDefault();
    setSpinner(true);
    if(stripe == null){
      setAlertMessage("Invalid Card details");
      setSeverity('error');
      setShowAlert(true);
      setSpinner(false);
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
            payment_gateway: "stripe",
            id: props.id,
            amount: props.amount,
            plate: props.plate,
            issued_at: props.issued_at,
            zone_name: props.zone
          }
          const res = await ticketServices.payTicket(body);
          setSpinner(false);
          if(!res.data.message){
            props.handleNext()
          }else{
            setAlertMessage(res.data.message);
            setSeverity('error');
            setShowAlert(true);
          }
        }catch(error){
            console.log("Error", error.message)
            setAlertMessage(error.message);
            setSeverity('error');
            setShowAlert(true);
        }
    }else{
        console.log("Error", error)
        setAlertMessage(error.message);
        setSeverity('error');
        setShowAlert(true);
    }
    setSpinner(false);
  }

  return (
    <>
      <Box sx={{width:'100%', my: 1}}>
        {paymentRequest && 
        <>
          <PaymentRequestButtonElement options={{paymentRequest}} />
          <Root>
            <Divider sx={{mt:2}}>
              <Chip label="OR" sx={{background: '#1e255930', color: '#2c3680', fontWeight: 'bold'}}/>
            </Divider>
          </Root>
        </>
        }
        <form onSubmit={purchaseParking} style={{width:'100%',marginTop: '16px'}}>
          <CardElement options={CARD_OPTIONS}/>
          <Grid container spacing={2} sx={{placeContent: "center", p: 2}}>
            <Grid item xs={6} align="start">
              <Button
                color="inherit"
                onClick={props.handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type='submit' variant="contained" size="small" color="primary">
                Pay
              </Button>
            </Grid>
          </Grid>
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
    </>
  );
}

export default Stripe;