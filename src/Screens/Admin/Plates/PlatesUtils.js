import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import AddPlate from "./AddPlate";
import PlatesView from "./PlatesView";
import cityServices from "../../../services/city-service";
import plateServices from "../../../services/plate-service";

export default function PlatesUtils() {
  let navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({});
  const [zones, setZones] = useState([]);
  const [plate, setPlate] = useState([]);
  const [plateDetail, setPlateDetail] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [editId, setEditId] = React.useState();

  useEffect(()=>{
    getZones();
    getBusinessPlate();
  },[])

  const getZones = async()=>{
    setSpinner(true);
    const res = await cityServices.getZones();
    setZones(res.data)
    setSelectedZone(res.data[0])
    setSpinner(false);
  }

  const getBusinessPlate = async()=>{
    setSpinner(true);
    const res = await plateServices.getBusinessPlate();
    setPlate(res.data)
    setSpinner(false);
  }

  const getPlateDetail = async(e)=>{
    const res = await plateServices.getPlateDetail({zone_id : e});
    setPlate(res.data);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value.toUpperCase()});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setSpinner(true);
    inputField["zone"] = selectedZone._id;
    inputField["zone_type"] = selectedZone.zone_type;
    inputField["city"] = selectedZone.city_id._id;
    const res = await plateServices.addBusinessPlate(inputField);
    if(res.data.success != false){
      setMsg("Plate added successfully");
      setSeverity('success');
      setAlert(true);
      getBusinessPlate();
      inputField["plate"] = "";
      setOpenDrawer(false);
    }else{
      setMsg(res.data.msg);
      setSeverity('info');
      setAlert(true);
    }
    setSpinner(false);
  }

  const delItem=async()=>{
    setSpinner(true);
    const res = await plateServices.delBusinessPlate({id: editId});
    if(res.data.deletedCount == 1)
    setPlate(plate.filter(function( obj ) {
        return obj._id !== editId;
    }))
    setSpinner(false);
    setOpenDialog(false);
    setMsg('Plate deleted successfuly')
    setSeverity('success')
    setAlert(true)
  }

  const onEdit = async(e)=> {
    console.log(e)
    inputField["plate"] = e.plate;
    setSelectedZone(e.zone);
    setOpenDrawer(true)
    // setSpinner(true);
  }

  return (
    <>
      {zones.length > 0 && <PlatesView
        inputField = {inputField}        
        zones = {zones}
        plate = {plate}
        plateDetail = {plateDetail}

        getPlateDetail = {(e)=>getPlateDetail(e)}
        setOpenDrawer={()=>setOpenDrawer(!openDrawer)}
        delItem = {(id) => {setEditId(id); setOpenDialog(true)}}
        onEdit = {(e)=>onEdit(e)}
        />}
      <AddPlate
        zones = {zones}
        selectedZone = {selectedZone}
        openDrawer = {openDrawer}
        inputField = {inputField}

        handleChange = {(e)=>handleChange(e)}
        handleSubmit = {(e)=>handleSubmit(e)}
        setOpenDrawer = {()=> setOpenDrawer(!openDrawer)}
        setSelectedZone = {(e)=> setSelectedZone(e)}
      />
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
