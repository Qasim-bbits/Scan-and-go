import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import cityServices from "../../../services/city-service";
import AddCity from "./AddCity";
import CitiesView from "./CitiesView";
import organizationServices from "../../../services/organization-service";

export default function Cities() {
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
  const [organizations, setOrganizations] = useState([])
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [editId, setEditId] = useState('');
  const [btn, setBtn] = useState('Add');

  useEffect(()=>{
    getOrganizations();
    getCities();
  },[])

  const getOrganizations = async()=>{
    setSpinner(true);
    const res = await organizationServices.getOrganizations();
    setOrganizations(res.data)
    setSpinner(false);
  }

  const getCities = async()=>{
    setSpinner(true);
    const res = await cityServices.getCities();
    setCities(res.data)
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
    if(btn == 'Add'){
      const res = await cityServices.addCity(inputField);
      setMsg("City Added Successfully");
      setSeverity('success');
      setAlert(true);
    }else{
      inputField['id'] = editId;
      const res = await cityServices.editCity(inputField);
      setBtn('Add')
      setMsg("City Updated Successfully");
      setSeverity('success');
      setAlert(true);
    }
    getCities();
    setInputField({});
    setPolygon([]);
    setOpenDrawer(false);
    setSpinner(false);
  };

  const delItem=async()=>{
    setSpinner(true);
    const res = await cityServices.delCity({id: editId});
    if(res.data.deletedCount == 1)
    setCities(cities.filter(function( obj ) {
        return obj._id !== editId;
    }))
    setSpinner(false);
    setOpenDialog(false);
    setMsg('City deleted successfuly')
    setSeverity('success')
    setAlert(true)
  }

  const onEdit = async(e)=> {
    inputField["city_name"] = e.city_name;
    setOpenDrawer(true);
    setPolygon(e.polygon);
    setCenter(e.polygon[0]);
    setZoom(10);
    setEditId(e._id);
    setBtn('Update');
  }

  return (
    <>
    <CitiesView
      cities={cities}

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
      <AddCity
        center={center}
        zoom={zoom}
        polygon={polygon}
        inputField={inputField}
        btn={btn}
        organizations={organizations}
        selectedOrg={selectedOrg}

        setSelectedOrg={(e)=>setSelectedOrg(e)}
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
