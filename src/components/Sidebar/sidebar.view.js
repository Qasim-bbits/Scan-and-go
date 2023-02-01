import React, {useState, useEffect, useCallback, useRef} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import logo from "../../assets/images/Logos/logo.svg";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Button,
  Typography
} from '@mui/material';
import {DashboardOutlined, Login} from '@mui/icons-material';
import {adminRoutes, router} from "../../Routes/routhPaths";
import Spinner from '../../Common/Spinner';
import mainService from '../../services/main-service';
import CurrentParking from './CurrentParking.view';
import ParkIn from "../../assets/icons/park_in.png"
const moment = require('moment-timezone');
moment.tz.setDefault("America/New_York");

export const SidebarView = (props) => {
  let navigate = useNavigate();
  const location = useLocation()
  const { open, onClose } = props;
  const user = JSON.parse(sessionStorage.getItem("userLogged"));
  const plates = JSON.parse(localStorage.getItem("plates"));
  const [parking, setParking] = useState([]);
  const [selectedParking, setSelectedParking] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [showParkings ,setShowParkings] = useState(false);

  useEffect(()=>{
    getCurrentParking();
  },[])

  const getCurrentParking = async()=>{
    setShowSpinner(true);
    let showDrawer = sessionStorage.getItem("showParking")
    if(user !== null){
        const res = await mainService.getCurrentParking({user_id: user.result._id});
        setParking(res.data)
        setSelectedParking(res.data[0]);
        if(res.data.length > 0 && showDrawer == null){
          sessionStorage.setItem("showParking", true)
          setShowParkings(true)
        }
    }else if(plates !== null){
      const res = await mainService.getCurrentParkingsByPlate({plates: plates});
      setParking(res.data)
      setSelectedParking(res.data[0]);
      if(res.data.length > 0 && showDrawer == null){
        sessionStorage.setItem("showParking", true)
        setShowParkings(true)
      }
    }
    setShowSpinner(false);
  }

  const calculateDuration = eventTime => moment.duration(Math.max(eventTime - (Math.floor(moment().toDate() / 1000)), 0), 'seconds');

  function Countdown({ eventTime, interval }) {
    const [duration, setDuration] = useState(calculateDuration(eventTime));
    const timerRef = useRef(0);
    const timerCallback = useCallback(() => {
      setDuration(calculateDuration(eventTime));
    }, [eventTime])

    useEffect(() => {
      timerRef.current = setInterval(timerCallback, interval);

      return () => {
        clearInterval(timerRef.current);
      }
    }, [eventTime]);

    return (
      <div>
        
          {(duration.days() == 0 ? "" : duration.days() + "d ")}
          {(duration.hours() == 0 ? "" : duration.hours() + "h ")}
          {(duration.minutes() == 0 ? "" : duration.minutes() + "m ")}
          {duration.seconds() + "s "}
        
      </div>
    )
  }

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false
  });

  const isAdmin = JSON.parse(sessionStorage.getItem('userLogged'));

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f0f2f5',
          height: '100%',
        }}
      >
        <Box 
          sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '5%', cursor: 'pointer' }} 
          onClick={()=>navigate(router.main)}
        >
            <Avatar src={logo} variant='square' sx={{width: 220, height: 70}} />
        </Box>
        <Divider
          sx={{
            my: 1
          }}
        />
        {parking.length > 0 && 
          <Button 
            onClick={()=>{setShowParkings(true); console.log('asd')}}
            sx={{
              display: 'flex', width: '100%', marginTop: 1, 
              justifyContent: 'space-between', alignItems: 'flex-end',
              background: '#c8d9f3'}}
          >
            <Typography variant='subtitle1' align='left' sx={{color: 'primary.main'}} >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={ParkIn} width="50px"/>
                {parking[0].plate}
              </Box>
            </Typography>
            <Typography variant='subtitle1' align='left' sx={{color: 'primary.main', alignSelf: 'center', fontWeight: "bold", textTransform: "lowercase"}} >
              <Box>
                <Countdown eventTime={moment(parking[0].to).unix()} interval={1000} />
              </Box>
            </Typography>
          </Button>
        }
        {isAdmin?.result?.role === 'admin' && <NavLink
          to={router.dashboard}
          style={{color: '#2c3680', textDecoration: 'none'}}
        >
          <ListItemButton>
              <DashboardOutlined/>  &nbsp;
              <ListItemText primary={'Dashboard'}/>
          </ListItemButton>
        </NavLink>}
        {!location.pathname.includes("zone") && adminRoutes.map(route=>{
          return(
            <NavLink
              to={route.parent.path}
              style={({ isActive }) => (isActive ?
                {color: '#14a7e0', textDecoration: 'none'} : {color: '#2c3680', textDecoration: 'none'})}
            >
              <ListItemButton>
                  {route.parent.icon} &nbsp;
                  <ListItemText primary={route.parent.title}/>
              </ListItemButton>
            </NavLink>
          )
        })}
        {location.pathname.includes("zone") && 
          <NavLink
            to={router.login}
            style={({ isActive }) => (isActive ?
              {color: '#14a7e0', textDecoration: 'none'} : {color: '#2c3680', textDecoration: 'none'})}
          >
            <ListItemButton>
                {<Login/>} &nbsp;
                <ListItemText primary={'Signup / Login'}/>
            </ListItemButton>
          </NavLink>
        }
      </Box>
    </>
  );

  if (lgUp && !showParkings) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <>
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="temporary"
      >
        {content}
      </Drawer>
      <Drawer
      anchor={"left"}
      open={showParkings}
      onClose={()=>setShowParkings(false)}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          width: smDown ? '100%' : 600,
        }
      }}
    >
      <CurrentParking
        selectedList = {selectedParking}
        parkings = {parking}

        back = {()=>setShowParkings(false)}
        seletecPlate = {(e)=>{setSelectedParking(e); console.log(e)}}
        
        Countdown = {<Countdown eventTime={moment(selectedParking?.to).unix()} interval={1000} />}
      />
    </Drawer>
    <Spinner
        spinner = {showSpinner}
    />
  </>
  );
};
