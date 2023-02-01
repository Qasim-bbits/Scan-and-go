import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import ticketServices from "../../../services/ticket-service";
import AddTicket from "./AddTicket";
import TicketsView from "./TicketsView";

export default function Ticket() {
  const [openDialog, setOpenDialog] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [inputField, setInputField] = useState({});
  const [tickets, setTickets] = useState([])
  const [aging, setAging] = useState([])
  const [editId, setEditId] = useState('');
  const [btn, setBtn] = useState("Add");
  const inputsArr = [{rate: 0, time: 0}]
  const [inputs, setInputs] = useState(inputsArr);
  const user = JSON.parse(sessionStorage.getItem('userLogged'));

  useEffect(()=>{
    getTickets();
  },[])

  const getTickets = async()=>{
    setSpinner(true);
    const res = await ticketServices.getTickets({});
    setTickets(res.data)
    setSpinner(false);
  }

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    inputField['ticket_aging'] = e;
    if(btn === 'Add'){
      await ticketServices.addTicket(inputField);
      setMsg('Ticket Added Successfully');
      setSeverity('success');
      setAlert(true);
    }else{
      inputField['id'] = editId;
      await ticketServices.editTicket(inputField);
      setBtn('Add')
      setMsg('Ticket Updated Successfully');
      setSeverity('success');
      setAlert(true);
    }
    getTickets();
    setInputField({});
    setOpenDrawer(false);
    setInputs(inputsArr);
    setSpinner(false);
  };

  const delItem=async()=>{
    setSpinner(true);
    const res = await ticketServices.delTicket({id: editId});
    if(res.data.deletedCount === 1)
    setTickets(tickets.filter(function( obj ) {
        return obj._id !== editId;
    }))
    setSpinner(false);
    setOpenDialog(false);
    setMsg('Ticket Deleted Successfully')
    setSeverity('success')
    setAlert(true)
  }

  const onEdit = async(e)=> {
    setInputField(e);
    const res = await ticketServices.getAgingByTicket({ticket: e._id});
    let arr = [];
    res.data.map(x=>{
      let obj = {
        id: x._id,
        rate: x.rate,
        time: x.applied_from/24/60
      }
      arr.push(obj);
    })
    setInputs(arr)
    setOpenDrawer(true);
    setEditId(e._id);
    setBtn('Update');
  }

  const getAgingByTicket = async(e) => {
    setSpinner(true);
    const res = await ticketServices.getAgingByTicket({ticket: e});
    setAging(res.data);
    setSpinner(false);
  }

  const addInput = () => {
    setInputs(s => {return [ ...s,{rate: 0, time: 0}]});
  };

  const delInput = (index)=>{
    let clone = [...inputs];
    clone.splice(index , 1);
    setInputs(clone);
  }

  const handleInputChange = (e) => {
    const index = e.target.id;
    setInputs(s => {
      const newArr = s.slice();
      newArr[index][e.target.name] =  e.target.checked || e.target.value;
      return newArr;
    });
  };

  const reset = ()=>{
    setInputs(inputsArr);
    setInputField({});
    setBtn('Add');
  }

  return (
    <>
    <TicketsView
      tickets={tickets}
      aging={aging}
      btn={btn}

      onEdit={(e)=>onEdit(e)}
      delItem={(id) => {setEditId(id); setOpenDialog(true)}}
      setOpenDrawer={()=>{setOpenDrawer(!openDrawer); reset()}}
      getAgingByTicket={(e)=>getAgingByTicket(e)}
      reset={()=>reset()}
    />
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#fff !important",
          width:
            window.innerWidth > 700
              ? "45% !important"
              : "100% !important",
        },
      }}
      anchor={'right'}
      open={openDrawer}
      onClose={()=>setOpenDrawer(false)}
    >
      <AddTicket
        inputField={inputField}
        btn={btn}
        user={user}
        inputs={inputs}
        
        handleChange={(e)=>handleChange(e)}
        handleSubmit={(e)=>handleSubmit(e)}
        onClose={()=>{setOpenDrawer(false)}}
        addInput={()=>addInput()}
        delInput={(e)=>delInput(e)}
        handleInputChange={(e)=>handleInputChange(e)}
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
