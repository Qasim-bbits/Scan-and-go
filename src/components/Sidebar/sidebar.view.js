import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../Assets/Images/Logos/Logo.svg";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {adminRoutes} from "../../Routes/routhPaths"

export const SidebarView = (props) => {
  const { open, onClose } = props;

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

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
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '5%' }}>
            <Avatar src={logo} variant='square' sx={{width: 220, height: 70}} />
        </Box>
        <Divider
          sx={{
            my: 1
          }}
        />
        {adminRoutes.map(route=>{
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
      </Box>
    </>
  );

  if (lgUp) {
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
  );
};
