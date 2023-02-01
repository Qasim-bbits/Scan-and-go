import React, {useState, useEffect} from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Autocomplete, Grid, TextField, Table, TableBody, TableRow, TableCell, useTheme, Divider, ImageList, ImageListItem } from '@mui/material';
import moment from 'moment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import helpers from '../../../Helpers/Helpers';
import Stripe from './Stripe';
import { router } from '../../../Routes/routhPaths';
import { useNavigate } from 'react-router-dom';
import TicketReceipt from './TicketReceipt';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { config } from '../../../Constants';

const customStyles = {
  overlay: {
    zIndex: 1200
  },
};
const stripePromise = loadStripe(config.url.Publishable_key)

export default function PayTicketView(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [pk, setPk] = useState();
  const [ photoIndex, setPhotoIndex ] = useState(0);
  const [ isOpen, setIsOpen ] = useState(false);
  const steps = ['Search Ticket', 'Summary & Payment', 'Receipt'];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stepper activeStep={props.activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {props.activeStep === 0 &&
        <Grid container spacing={3} sx={{placeContent: "center", p: 2}}>
          <Grid item xs={12}>
            <Box component="form" onSubmit={props.handleSubmit}>
              <Grid container spacing={3} sx={{placeContent: "center", p: 1}}>
                <Grid item xs={12} align="right">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={props.cities}
                    getOptionLabel={(option) => option.city_name}
                    value={props.selectedCity}
                    onChange={(event, newValue)=>props.setSelectedCity(newValue)}
                    renderInput={(params) => (
                    <TextField {...params} label={'Select City'} color="primary" size="small" required/>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      id="standard-error-helper-text"
                      label={'Ticket Number'}
                      color="primary"
                      type="text"
                      name="ticket_num"
                      value={props.inputField["ticket_num"]}
                      onChange={props.handleChange}
                      size="small"
                      required
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      id="standard-error-helper-text"
                      label={'Plate'}
                      color="primary"
                      type="text"
                      name="plate"
                      value={props.inputField["plate"]}
                      onChange={props.handleChange}
                      size="small"
                      required
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12} align="end">
                  <Button type='submit' variant="outlined" size="small" color="primary">
                    {'Next'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      }
      {props.activeStep === 1 &&
        <Grid container spacing={1} sx={{placeContent: "center", p: 2}}>
          {/* <Grid item xs={12}>
            <Typography variant="body1" color="primary" sx={{textTransform: 'uppercase'}}>{props.literals.summary}</Typography>
          </Grid> */}
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="primary">
              {'Ticket Number'}:
            </Typography>
          </Grid>
          <Grid item xs={6} align='end'>
            <Typography variant="subtitle1" color="primary">
              {props.ticket?.ticketIssued?.ticket_num}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} alignSelf="center">
            <Typography variant="subtitle2">
              {'Images'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <ImageList sx={{ overflowX: 'auto' }}>
            <ImageListItem sx={{display: 'flex', flexDirection: 'row'}}>
              {props.ticket?.ticketIssued?.images.map((image,index) => {
                return (
                  <Button type="button" onClick={()=>{setIsOpen(true);setPhotoIndex(index)}}>
                    <img
                      src={image}
                      srcSet={image}
                      alt='title'
                      loading='lazy'
                      style={{paddingRight: '1em', width: '100px', height: '100px'}}
                    />
                  </Button>
                )
              })}
            </ImageListItem>
          </ImageList>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Location:
            </Typography>
          </Grid>
          <Grid item xs={6} align='end'>
            <Typography variant="subtitle2">
              {props.ticket?.ticketIssued?.zone?.zone_name}, {props.ticket?.ticketIssued?.city?.city_name}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Plate:
            </Typography>
          </Grid>
          <Grid item xs={6} align='end'>
            <Typography variant="subtitle2">
              {props.ticket?.ticketIssued?.plate}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="subtitle2">
              Ticket Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} align='end'>
            <Typography variant="subtitle2">
              {props.ticket?.ticketIssued?.ticket?.ticket_name}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          {props.ticket?.ticketIssued?.parking !== undefined &&
            <>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  Parking Id:
                </Typography>
              </Grid>
              <Grid item xs={6} align='end'>
                <Typography variant="subtitle2">
                  {props.ticket?.ticketIssued?.parking?.parking_id}
                </Typography>
              </Grid>
              <Grid item xs={12}><Divider width="100%"/></Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="subtitle2">
                  Parking Start Date/Time - End Date/Time:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} align='end'>
                <Typography variant="subtitle2">
                  {moment(props.ticket?.ticketIssued?.parking?.from).format('MMM Do YY, hh:mm a')} - {moment(props.ticket?.ticketIssued?.parking?.to).format('MMM Do YY, hh:mm a')} 
                </Typography>
              </Grid>
            </>
          }
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Ticket Issued At:
            </Typography>
          </Grid>
          <Grid item xs={6} align='end'>
            <Typography variant="subtitle2">
              {moment(props.ticket?.ticketIssued?.issued_at).format('MMM Do YY, hh:mm a')}
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} alignSelf="center">
            <Typography variant="subtitle2">
              Ticket Duration
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} align='end'>
            <Typography variant="subtitle2">
              <Table size="small" sx={{width: 'fit-content', float: 'right'}}>
                {props.ticket?.ticketAging.map(x=>{
                  return(
                    <TableBody>
                      <TableRow>
                        <TableCell sx = {{
                          border: 0,
                          color: (x._id == props.ticket?.ticketAmount?._id) ? theme.palette.primary.main : ''
                        }}>
                          $ {(x.rate/100).toFixed(2)}
                        </TableCell>
                        <TableCell sx = {{
                          border: 0,
                          color: (x._id == props.ticket?.ticketAmount?._id) ? theme.palette.primary.main : ''
                        }}>
                          {(x.applied_from == 0) ? 'within '+ (x.applied_to/24/60) +' days' :  
                          (x.applied_to == null) ? 'after ' + (x.applied_from/24/60 +' days') : 
                          'within ' + (x.applied_from/24/60) +' to ' + (x.applied_to/24/60) +' days'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )
                })}
              </Table>
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={6} sx={{background: '"#eeeeee52"'}}>
            <Typography variant="subtitle2">
              Ticket Passed Days:
            </Typography>
          </Grid>
          <Grid item xs={6} align='end' sx={{background: '"#eeeeee52"'}}>
            <Typography variant="subtitle2">
              {props.ticket?.ticketAmount?.day_passed} days
            </Typography>
          </Grid>
          <Grid item xs={12}><Divider width="100%"/></Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="primary">
              Amount:
            </Typography>
          </Grid>
          <Grid item xs={6} align='end'>
            <Typography variant="subtitle2" color="primary">
              $ {(props.ticket?.ticketAmount?.rate/100).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} align="end">
              <Elements stripe={stripePromise}>
                <Stripe
                  amount={props.ticket?.ticketAmount?.rate}
                  plate={props.ticket?.ticketIssued?.plate}
                  issued_at={props.ticket?.ticketIssued?.issued_at}
                  id={props.ticket?.ticketIssued?._id}
                  zone={props.ticket?.ticketIssued?.zone?.zone_name}

                  handleNext = {props.handleNext}
                  handleBack = {props.handleBack}
                />
              </Elements>
          </Grid>
        </Grid>
      }
      {props.activeStep === 2 &&
        <Grid container spacing={3} sx={{placeContent: "center", p: 2}}>
          <Grid item xs={12}>
            <TicketReceipt
              ticket = {props.ticket}
              emailTicketReciept = {(e)=>props.emailTicketReciept(e)}
            />
          </Grid>
          <Grid item xs={12} align="end">
            <Button type='button' variant="outlined" size="small" color="primary" onClick={()=>navigate(router.main)}>
              Back to home
            </Button>
          </Grid>
        </Grid>
      }
      {isOpen && (
        <Lightbox
        reactModalStyle={customStyles}
          mainSrc={props.ticket?.ticketIssued?.images[photoIndex]}
          nextSrc={props.ticket?.ticketIssued?.images[(photoIndex + 1) % props.ticket?.ticketIssued?.images.length]}
          prevSrc={props.ticket?.ticketIssued?.images[(photoIndex + props.ticket?.ticketIssued?.images.length - 1) % props.ticket?.ticketIssued?.images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + props.ticket?.ticketIssued?.images.length - 1) % props.ticket?.ticketIssued?.images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % props.ticket?.ticketIssued?.images.length)
          }
        />
      )}
    </Box>
  );
}
