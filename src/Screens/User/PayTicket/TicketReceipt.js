import React, { useCallback } from 'react';
import Box from "@mui/material/Box";
import {Typography, Divider, useTheme} from "@mui/material";
import moment from 'moment';
import List from "../../../assets/icons/list.png";
import Location from "../../../assets/icons/location.png"
import ParkIn from "../../../assets/icons/park_in.png"
import ParkOut from "../../../assets/icons/park_out.png"
import Plate from "../../../assets/icons/plate.png"
import Amount from '../../../assets/icons/amount.png';
import Clock from '../../../assets/icons/clock.png';

const iconStyle = {width: '25px', marginRight: '7px',  marginLeft: '7px'}

function TicketReceipt(props) {
  const theme = useTheme();

  return (
    <div className={' pricing-table'}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#fff',
        // height: '100%'
      }}>
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', color: 'black'}}>
          <Typography variant='h6' align='right' sx={{color: 'primary.main', width: '90%'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase'}}>
              Ticket Pay Receipt
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%'}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'center', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={List} width={'40px'}/>
              </Box>
              Ticket Number
            </Box>
          </Typography>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {props.ticket?.ticketIssued?.ticket_num}
            </Box>
          </Typography>
        </Box>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={Location} width={'40px'}/>
              </Box>
              {props.ticket?.ticketIssued?.zone?.zone_name}, {props.ticket?.ticketIssued?.city?.city_name}
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%'}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'center', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
            <Box>
              <img src={ParkIn} width={'50px'}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {moment(props.ticket?.ticketIssued?.parking?.from).format('ll')}
            </Box>
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
              {moment(props.ticket?.ticketIssued?.parking?.from).format('hh:mm a')}
            </Box>
          </Typography>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', justifyContent: 'center' }}>
              <Box>
                <img src={Clock} width={'80px'}/>
              </Box>
            </Box>
            {/* <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
              {props.Countdown}
            </Box> */}
          </Typography>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', textAlign: 'center'}} >
            <Box>
              <img src={ParkOut} width={'50px'}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {moment(props.ticket?.ticketIssued?.parking?.to).format('ll')}
            </Box>
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', placeContent: 'center' }}>
              {moment(props.ticket?.ticketIssued?.parking?.to).format('hh:mm a')}
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%', mt:2}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={Plate} width={'40px'}/>
              </Box>
              {props.ticket?.ticketIssued?.plate}
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%'}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={List} width={'40px'}/>
              </Box>
              {props.ticket?.ticketIssued?.ticket?.ticket_name}
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%'}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={Clock} width={'40px'}/>
              </Box>
              Issued At
            </Box>
          </Typography>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', alignSelf: 'center'}} >
            <Box>
              {moment(props.ticket?.ticketIssued?.issued_at).format('MMM Do YY, hh:mm a')}
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%'}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={Clock} width={'40px'}/>
              </Box>
              Ticket Passed Days
            </Box>
          </Typography>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', alignSelf: 'center'}} >
            <Box>
              {props.ticket?.ticketAmount?.day_passed} Days
            </Box>
          </Typography>
        </Box>
        <Divider sx={{width: '80%', mb: 2}}/>
        <Box sx={{display: 'flex', width: '80%', marginTop: 1, justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
              <Box sx={iconStyle}>
                <img src={Amount} width={'40px'}/>
              </Box>
              Amount Paid
            </Box>
          </Typography>
          <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', alignSelf: 'center'}} >
            <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              $ {(props.ticket?.ticketAmount?.rate/100).toFixed(2)}
            </Box>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default TicketReceipt;