import React, { useState, useEffect } from "react";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import ticketServices from "../../../services/ticket-service";
import TicketsIssuedView from "./TicketsIssuedView";
import EditTicketIssued from "./EditTicketIssued";

export default function TicketIssued(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [inputField, setInputField] = useState({});
  const [ticketsIssued, setTicketsIssued] = useState([])
  const [aging, setAging] = useState([])
  const [editId, setEditId] = useState('');

  useEffect(()=>{
    getTicketsIssued();
  },[])

  const getTicketsIssued = async()=>{
    setSpinner(true);
    const res = await ticketServices.getTicketsIssued({});
    setTicketsIssued(res.data)
    setSpinner(false);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value.toUpperCase()});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    inputField['id'] = editId;
    setSpinner(true);
    const res = await ticketServices.editIssueTicket(inputField);
    setMsg("Plate updated successfully");
    setSeverity('success');
    setAlert(true);
    setOpenDrawer(false);
    var foundIndex = ticketsIssued.findIndex(x => x._id == editId);
    ticketsIssued[foundIndex].plate = inputField.plate;
    setSpinner(false);
  }

  const getAgingByTicket = async(e) => {
    setSpinner(true);
    const res = await ticketServices.getAgingByTicket({ticket: e});
    setAging(res.data);
    setSpinner(false);
  }

  const onEdit = async(e) =>{
    inputField['plate'] = e.plate
    setEditId(e._id);
    setOpenDrawer(true)
  }

  return (
    <>
      <TicketsIssuedView
        ticketsIssued = {ticketsIssued}
        aging={aging}

        onEdit={(e)=>onEdit(e)}
        // delItem={(id) => {setEditId(id); setOpenDialog(true)}}
        // setOpenDrawer={()=>{setOpenDrawer(!openDrawer)}}
        getAgingByTicket={(e)=>getAgingByTicket(e)}
      />
      <EditTicketIssued
        openDrawer = {openDrawer}
        inputField = {inputField}

        handleChange = {(e)=>handleChange(e)}
        handleSubmit = {(e)=>handleSubmit(e)}
        setOpenDrawer = {()=> setOpenDrawer(!openDrawer)}
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
      {/* <ConfirmDiallog
        openDialog = {openDialog}

        closeDialog = {()=>setOpenDialog(false)}
        delItem = {()=>delItem()}
      /> */}
    </>
  );
}
