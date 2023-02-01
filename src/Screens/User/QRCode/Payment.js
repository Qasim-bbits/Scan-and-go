import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Box, Button, Divider, Chip} from "@mui/material";
import {PaymentRequestButtonElement, useStripe, CardElement, useElements} from '@stripe/react-stripe-js';
import parkingService from '../../../services/parking-service';
import Spinner from '../../../Common/Spinner';
import SnackAlert from '../../../Common/Alerts';

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

function Payment(props) {
  console.log(props)
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
          amount: props.props.rateCycle[props.props.steps].total,
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
        setSpinner(false);
        let body = {
          paymentMethod : ev.paymentMethod,
          amount : props.props.rateCycle[props.props.steps].total,
          plate: props.props.plate,
          // user: '',
          zone: props.props.zone,
          city: props.props.city,
          from: props.props.rateCycle[props.props.steps].current_time,
          to: props.props.rateCycle[props.props.steps].time_desc,
          // token: ev.token.id
          coord: props.props.center,
          rate: props.props.tarif[0]._id,
          service_fee: props.props.rateCycle[props.props.steps].service_fee,
        }
        ev.complete('success');
        const res = await parkingService.buyParking(body);
        setSpinner(false);
        if(!res.data.message){
          // props.props.showReciept();
          // props.props.setParking(res.data)
          sessionStorage.removeItem("showParking")
          window.location.reload();
        }else{
          setAlertMessage(res.data.message);
          setSeverity('error');
          setShowAlert(true);
        }
      })
    }
  }, [stripe, props.props.rateCycle[props.props.steps].total]);

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
              amount : props.props.rateCycle[props.props.steps].total,
              plate: props.props.plate,
              // user: '',
              zone: props.props.zone,
              city: props.props.city,
              from: props.props.rateCycle[props.props.steps].current_time,
              to: props.props.rateCycle[props.props.steps].time_desc,
              coord: props.props.center,
              service_fee: props.props.rateCycle[props.props.steps].service_fee,
              rate: props.props.tarif[0]._id
            }
            const res = await parkingService.buyParking(body);
            if(!res.data.message){
              // props.props.showReciept();
              // props.props.setParking(res.data)
              sessionStorage.removeItem("showParking")
              window.location.reload();
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
        {props.props.rateCycle[props.props.steps].rate != 0 && paymentRequest && 
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
            <Button 
              type='submit'
              size='large'
              variant='contained'
              sx={{borderRadius: 8, width: '100%',my: 2}}
            >
              ${(props.props.rateCycle[props.props.steps].total/100).toFixed(2)}
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
    </>
  );
}

export default Payment;