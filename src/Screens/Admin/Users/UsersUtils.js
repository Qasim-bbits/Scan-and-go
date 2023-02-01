import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import userServices from "../../../services/user-service";
import UsersView from "./UsersView";
import AddUser from "./AddUser";
import cityServices from "../../../services/city-service";
import permissionServices from "../../../services/permission-service";

export default function UsersUtils() {
  let navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [editId, setEditId] = React.useState();
  const [inputField, setInputField] = useState({});
  const [btn, setBtn] = useState('Add');
  const [users, setUsers] = useState([]);
  const [selectedCities, setSelectedCities] = useState([])
  const [cities, setCities] = useState([]);

  useEffect(()=>{
    getUsers();
    getCities();
  },[])

  const getUsers = async()=>{
    setSpinner(true);
    const res = await userServices.getUsers();
    setUsers(res.data)
    setSpinner(false);
  }

  const getCities = async()=>{
    setSpinner(true);
    const res = await cityServices.getCities();
    setCities(res.data)
    setSpinner(false);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    if(inputField.role == 'agent' && selectedCities.length == 0){
      setMsg('Please Select City')
      setSeverity('error')
      setAlert(true)
      return;
    }
    setSpinner(true);
    inputField['cities'] = selectedCities.map(a => a._id);
    let res;
    if(btn === 'Add'){
      res = await userServices.addUser(inputField);
    }else{
      inputField['id'] = editId;
      res = await userServices.editUser(inputField);
    }
    if(res.data.status !== 'error'){
      setOpenDrawer(false);
      setOpenDialog(false);
      setInputField({});
      getUsers();
    }
    setSpinner(false);
    setOpenDialog(false);
    setMsg(res.data.msg)
    setSeverity(res.data.status)
    setAlert(true)
  }

  const onEdit = async(e)=> {
    setSpinner(true);
    console.log(e);
    if(e.role == 'agent'){
      const res = await permissionServices.getAgentPermissions({user_id: e._id});
      setSelectedCities(res.data[0]?.cities)
    }
    setInputField(e);
    setBtn('Update')
    setOpenDrawer(true);
    setEditId(e._id);
    setSpinner(false);
  }

  const delItem=async()=>{
    setSpinner(true);
    const res = await userServices.delItem({id: editId});
    if(res.data.deletedCount == 1)
    setUsers(users.filter(function( obj ) {
        return obj._id !== editId;
    }))
    setSpinner(false);
    setOpenDialog(false);
    setMsg('Collection deleted successfuly')
    setSeverity('success')
    setAlert(true)
  }

  return (
    <>
      <UsersView
        users = {users}

        delItem = {(id) => {setEditId(id); setOpenDialog(true)}}
        onEdit = {(e)=>onEdit(e)}
        setOpenDrawer = {()=>setOpenDrawer(!openDrawer)}
      />
      <AddUser
        openDrawer = {openDrawer}
        inputField = {inputField}
        selectedCities={selectedCities}
        cities={cities}
        btn = {btn}

        setSelectedCities = {(e)=>setSelectedCities(e)}
        setOpenDrawer = {()=>setOpenDrawer(!openDrawer)}
        handleSubmit = {(e)=>handleSubmit(e)}
        handleChange = {(e)=>handleChange(e)}
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
