import React, { useState } from 'react';
import SignUpView from './signUp.view';
import SnackAlert from '../../../Common/Alerts';
import authServices from '../../../services/auth-service';
import Spinner from '../../../Common/Spinner';

function SignupUtils() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({language: 'en'});

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleCheck = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.checked});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setShowSpinner(true);
    const res = await authServices.signup(inputField);
    setSeverity(res.data.status);
    setAlertMessage(res.data.msg);
    setShowAlert(true);
    setShowSpinner(false);
  }

  return (
    <>
      <SignUpView
        inputField = {inputField}
        
        handleChange = {(e)=>handleChange(e)}
        handleCheck = {(e)=>handleCheck(e)}
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

export default SignupUtils;