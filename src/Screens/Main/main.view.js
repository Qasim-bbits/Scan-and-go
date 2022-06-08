import React, {useState} from 'react';
import {Layout} from "../../Components/SidebarHeaderWrapper";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {countries} from "../SignUp/signUp.utils";
import {Autocomplete, Box, Button, Drawer, TextField, useMediaQuery} from "@mui/material";
import ParkingRateForm from "./parkingRateForm";
import AddPlateForm from "./addPlateForm";
import SelectPlateForm from "./selectPlateForm";

function MainView() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: false
  });

  const containerStyle = {
    height: '90vh',
  };

  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const btnStyle={width: smDown ? '60%' : '40%', borderRadius: 20}

  return (
    <Layout>
      <LoadScript
        googleMapsApiKey="AIzaSyCLD8cITdyUJTXZCeXJAiMiThGIn6LNYYY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'flex-start',
              margin: smDown ? '20% 0 0 2%' : '8% 0 0 2%'
            }}
          >
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{width: smDown ? 200 : 300, backgroundColor: '#fff'}}
                  label="Search input"
                  variant='outlined'
                  size='small'
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{width: smDown ? 200 : 300, backgroundColor: '#fff', marginTop: 2}}
                  label="Search input"
                  variant='outlined'
                  size='small'
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '65%'}}>
            <Button size='large' variant='contained' style={btnStyle} onClick={() => toggleDrawer()}>
              Confirm Your Zone
            </Button>
          </Box>
        </GoogleMap>
      </LoadScript>
      <Drawer
        variant='temporary'
        open={drawerOpen}
        onClose={toggleDrawer}
        anchor='right'
      >
        {/*<ParkingRateForm setDrawerOpen={setDrawerOpen} />*/}
        {/*<AddPlateForm setDrawerOpen={setDrawerOpen} />*/}
        <SelectPlateForm setDrawerOpen={setDrawerOpen} />
      </Drawer>
    </Layout>
  );
}

export default MainView;