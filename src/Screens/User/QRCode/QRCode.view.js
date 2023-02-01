import React, {useState} from 'react';
import {Layout} from "../../components/SidebarHeaderWrapper";
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import {Autocomplete, Box, Button, TextField, useMediaQuery} from "@mui/material";
import Marker from "../../assets/images/image/marker.png";

const cityPolygonOptions = {
  fillColor: "#14a7e0",
  fillOpacity: 0.5,
  strokeColor: "#14a7e0",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}
const zonePolygonOptions = {
  fillColor: "#2c3680",
  fillOpacity: 0.5,
  strokeColor: "#2c3680",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}


export default function MainView(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapref, setMapRef] = useState(null);
  
  const handleOnLoad = map => {
    setMapRef(map);
  };
  
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      props.handleMapCenter({lat: newCenter.lat(), lng: newCenter.lng()});
    }
  };
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

  const btnStyle={width: smDown ? '60%' : '40%', borderRadius: 20}

  return (
    <Layout>
      <div style={{position: 'relative'}}>
        {props.zones.length > 0 && <div style={{position: 'absolute', zIndex: 1, top: '43%', left: '49%'}}>
          <img src={Marker} width="30px"/>
        </div>}
        <LoadScript
          googleMapsApiKey="AIzaSyCLD8cITdyUJTXZCeXJAiMiThGIn6LNYYY"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={props.center}
            zoom={props.zoom}
            onLoad={handleOnLoad}
            onCenterChanged={handleCenterChanged}
          >
            {props.cityPolygon.length > 0 && <Polygon
              paths={props.cityPolygon}
              options={cityPolygonOptions}
            />}
            {props.zones.length > 0 && props.zones.map(x=>{
              return(
                <Polygon
                  paths={x.polygon}
                  options={zonePolygonOptions}
                />
              )
            })}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: smDown ? '20% 0 0 2%' : '5% 0 0 2%'
              }}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={props.cities}
                getOptionLabel={(option) => option.city_name}
                value={props.selectedCity}
                onChange={(event, newValue)=>props.onSelectedCity(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{width: smDown ? 200 : 300, backgroundColor: '#fff'}}
                    label="Search City"
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
                options={props.zones}
                getOptionLabel={(option) => option.zone_name}
                value={props.selectedZone}
                onChange={(event, newValue)=>props.onSelectedZone(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{width: smDown ? 200 : 300, backgroundColor: '#fff', marginTop: 2}}
                    label="Search Zone"
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
              {props.inPolygon && <Button size='large' variant='contained' style={btnStyle} onClick={props.confirmZone}>
                Confirm Your Zone
              </Button>}
            </Box>
          </GoogleMap>
        </LoadScript>
      </div>
    </Layout>
  );
}