import React, { useState } from 'react';
import ForgetPasswordView from './ForgetPassword.view';
import SnackAlert from '../../../Common/Alerts';
import authServices from '../../../services/auth-service';
import Spinner from '../../../Common/Spinner';

function ForgetPasswordUtils() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({});

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setShowSpinner(true);
    const res = await authServices.forgetPassword(inputField);
    setAlertMessage(res.data.msg);
    setSeverity(res.data.status);
    setShowAlert(true);
    setShowSpinner(false);
  }

  return (
    <>
      <ForgetPasswordView
        inputField = {inputField}
        
        handleChange = {(e)=>handleChange(e)}
        handleSubmit = {(e)=>handleSubmit(e)}
      />
      <SnackAlert
        alertMessage = {alertMessage}
        showAlert = {showAlert}
        severity = {severity}
        
        closeAlert = {()=>setShowAlert(!showAlert)}
      />
      <Spinner
        spinner = {showSpinner}
      />
    </>
  );
}

export default ForgetPasswordUtils;