import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { router } from '../../../Routes/routhPaths';
import LoginView from './login.view';
import SnackAlert from '../../../Common/Alerts';
import authServices from '../../../services/auth-service';
import Spinner from '../../../Common/Spinner';

function LoginUtils() {
  let navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({});
  const [resetPassword, setResetPassword] = useState(false);

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setShowSpinner(true);
    const res = await authServices.login(inputField);
    console.log(res.data);
    if(res.data.auth){
      if(res.data.result.forget_password){
        setResetPassword(true);
        setShowSpinner(false);
        return;
      }
      sessionStorage.setItem('userLogged', JSON.stringify(res.data));
      navigate(router.main);
    }else{
      setAlertMessage(res.data.msg);
      setSeverity('error');
      setShowAlert(true);
    }
    setShowSpinner(false);
  }

  const handleChangePassword = async(e)=> {
    e.preventDefault();
    setShowSpinner(true);
    const res = await authServices.changePassword(inputField);
    console.log(res.data);
    if(res.data.auth){
      sessionStorage.setItem('userLogged', JSON.stringify(res.data));
      navigate(router.main);
    }else{
      setAlertMessage(res.data.msg);
      setSeverity('error');
      setShowAlert(true);
    }
    setShowSpinner(false);
  }

  return (
    <>
      <LoginView
        inputField = {inputField}
        resetPassword = {resetPassword}
        
        handleChange = {(e)=>handleChange(e)}
        handleSubmit = {(e)=>handleSubmit(e)}
        handleChangePassword = {(e)=>handleChangePassword(e)}
        setResetPassword = {()=>setResetPassword(true)}
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

export default LoginUtils;