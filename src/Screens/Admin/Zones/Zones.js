import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import cityServices from "../../../services/city-service";
import ZonesView from "./ZonesView";
import AddZone from "./AddZone";

export default function Zones() {
  const [openDialog, setOpenDialog] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [inputField, setInputField] = useState({});
  const [center, setCenter] = useState({lat: 45.35291599443195, lng: -75.5066849632779});
  const [zoom, setZoom] = useState(12);
  const [polygon, setPolygon] = useState([])
  const [cities, setCities] = useState([])
  const [zones, setZones] = useState([])
  const [selectedCity, setSelectedCity] = useState(null);
  const [editId, setEditId] = useState('');
  const [btn, setBtn] = useState('Add');

  useEffect(()=>{
    getCities();
    getZones();
  },[])

  const getCities = async()=>{
    setSpinner(true);
    const res = await cityServices.getCities();
    setCities(res.data)
    setSpinner(false);
  }

  const getZones = async()=>{
    setSpinner(true);
    const res = await cityServices.getZones();
    setZones(res.data)
    setSpinner(false);
  }

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(polygon.length == 0){
      setMsg("Please Draw Polygon");
      setSeverity('error');
      setAlert(true);
      return;
    }
    setSpinner(true);
    inputField['polygon'] = polygon;
    inputField['visitor_pass_time'] = 0;
    inputField['zone_type'] = 0;
    inputField['city_id'] = selectedCity._id;
    console.log(selectedCity, inputField);
    
    if(btn == 'Add'){
      const res = await cityServices.addZone(inputField);
      setMsg("Zone Added Successfully");
      setSeverity('success');
      setAlert(true);
    }else{
      inputField['id'] = editId;
      const res = await cityServices.editZone(inputField);
      setBtn('Add')
      setMsg("Zone Updated Successfully");
      setSeverity('success');
      setAlert(true);
    }
    getZones();
    setInputField({});
    setPolygon([]);
    setOpenDrawer(false);
    setSpinner(false);
  };

  const delItem=async()=>{
    setSpinner(true);
    const res = await cityServices.delZone({id: editId});
    if(res.data.deletedCount == 1)
    setZones(zones.filter(function( obj ) {
        return obj._id !== editId;
    }))
    setSpinner(false);
    setOpenDialog(false);
    setMsg('Zone deleted successfuly')
    setSeverity('success')
    setAlert(true)
  }

  const onEdit = async(e)=> {
    setInputField(e);
    setSelectedCity(e.city_id);
    setOpenDrawer(true);
    setPolygon(e.polygon);
    setCenter(e.polygon[0]);
    setZoom(20);
    setEditId(e._id);
    setBtn('Update');
  }

  return (
    <>
    <ZonesView
      cities={cities}
      zones={zones}

      onEdit={(e)=>onEdit(e)}
      delItem={(id) => {setEditId(id); setOpenDialog(true)}}
      setOpenDrawer={()=>setOpenDrawer(!openDrawer)}
    />
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#fff !important",
          width:
            window.innerWidth > 700
              ? "50% !important"
              : "100% !important",
        },
      }}
      anchor={'right'}
      open={openDrawer}
      onClose={()=>setOpenDrawer(false)}
    >
      <AddZone
        cities={cities}
        center={center}
        zoom={zoom}
        polygon={polygon}
        inputField={inputField}
        btn={btn}
        selectedCity={selectedCity}

        setSelectedCity={(e)=>setSelectedCity(e)}
        setPolygon={(e)=>setPolygon(e)}
        setCenter={(e)=>setCenter(e)}
        setZoom={(e)=>setZoom(e)}
        handleChange={(e)=>handleChange(e)}
        handleSubmit={(e)=>handleSubmit(e)}
        onClose={()=>setOpenDrawer(false)}
      />
      </Drawer>

      <SnackAlert
        msg = {msg}
        alert = {alert}
        severity = {severity}
        
        closeAlert = {()=>setAlert(!alert)}
      />
      <Spinner
        spinner = {spinner}
      />
      <ConfirmDiallog
        openDialog = {openDialog}

        closeDialog = {()=>setOpenDialog(false)}
        delItem = {()=>delItem()}
      />
    </>
  );
}
