import React from 'react';
import {Layout} from "../../Components/SidebarHeaderWrapper";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {countries} from "../SignUp/signUp.utils";
import {Autocomplete, Box, TextField, useMediaQuery} from "@mui/material";

function MainView(props) {

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
                  sx={{width: 300, backgroundColor: '#fff'}}
                  label="Search input"
                  variant='outlined'
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
                  sx={{width: 300, backgroundColor: '#fff', marginTop: 2}}
                  label="Search input"
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </Box>
        </GoogleMap>
      </LoadScript>
    </Layout>
  );
}

export default MainView;