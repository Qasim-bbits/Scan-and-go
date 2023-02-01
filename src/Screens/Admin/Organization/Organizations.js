import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import organizationServices from "../../../services/organization-service";
import AddOrganization from "./AddOrganization";
import OrganizationsView from "./OrganizationsView";
import helpers from "../../../Helpers/Helpers";

export default function Organizations() {
  const [openDialog, setOpenDialog] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [inputField, setInputField] = useState({});
  const [organizations, setOrganizations] = useState([])
  const [editId, setEditId] = useState('');
  const [btn, setBtn] = useState('Add');
  const [logo, setLogo] = useState({});

  useEffect(()=>{
    getOrganizations();
  },[])

  const getOrganizations = async()=>{
    setSpinner(true);
    const res = await organizationServices.getOrganizations();
    setOrganizations(res.data)
    setSpinner(false);
  }

  const handleChange = (e) => {
    if(e.target.name == 'org_name'){
      let data = {...inputField};
      data['org_name'] = e.target.value;
      data['sub_domain'] = e.target.value.replace(/\s/g, '');
      setInputField(data);
    }else{
      setInputField({ ...inputField, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSpinner(true);
    if(logo == {} && btn == 'Add'){
      setMsg("Please Upload Logo");
      setSeverity('error');
      setAlert(true);
      return;
    }
    let formData = new FormData();
        formData = helpers.createFormData(formData,inputField);
        formData.append('logo', logo);
    let res;  
    if(btn == 'Add'){
      res = await organizationServices.addOrganization(formData);
      setMsg(res.data.msg);
      setSeverity(res.data.status);
      setAlert(true);
    }else{
      formData.append('id', editId);
      res = await organizationServices.editOrganization(formData);
      setMsg(res.data.msg);
      setSeverity(res.data.status);
      setAlert(true);
    }
    if(res.data.status == 'success'){
      setBtn('Add')
      getOrganizations();
      setInputField({});
      setOpenDrawer(false);
    }
    setSpinner(false);
  };

  const delItem=async()=>{
    setSpinner(true);
    const res = await organizationServices.delOrganization({id: editId});
    if(res.data.deletedCount == 1)
    setOrganizations(organizations.filter(function( obj ) {
        return obj._id !== editId;
    }))
    setSpinner(false);
    setOpenDialog(false);
    setMsg('Organization deleted successfuly')
    setSeverity('success')
    setAlert(true)
  }

  const onEdit = async(e)=> {
    setInputField(e);
    setOpenDrawer(true);
    setEditId(e._id);
    setBtn('Update');
  }

  return (
    <>
    <OrganizationsView
      organizations={organizations}

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
      <AddOrganization
        inputField={inputField}
        btn={btn}

        setLogo={(e)=>setLogo(e)}
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
