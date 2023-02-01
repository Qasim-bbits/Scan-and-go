import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { router } from '../../../Routes/routhPaths';
import LoginView from './login.view';
import SnackAlert from '../../../Common/Alerts';
import authServices from '../../../services/auth-service';
import Spinner from '../../../Common/Spinner';
import helpers from '../../../Helpers/Helpers';

function LoginUtils() {
  let navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({language: '', rememberMe: false, email: '', password: ''});
  const [literals, setLiterals] = useState({});
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(()=>{
    let creds = JSON.parse(localStorage.getItem("loginCreds"));
    if(creds !== null){
      setInputField(creds);
      getLiterals(creds.language);
    }else{
      getLiterals(helpers.getLang());
    }
  },[])

  const getLiterals = async (language)=>{
    setShowSpinner(true);
    let literals = await helpers.getSheetData(language);
    setLiterals(literals);
    setShowSpinner(false);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
    if(e.target.name == 'language'){
      getLiterals(e.target.value);
    }
  }

  const handleChecked = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.checked});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setShowSpinner(true);
    const res = await authServices.login(inputField);
    if(res.data.auth){
      if(res.data.result.forget_password){
        setResetPassword(true);
        setShowSpinner(false);
        return;
      }
      if(inputField['rememberMe']){
        localStorage.setItem('loginCreds', JSON.stringify(inputField))
      }else{
        localStorage.removeItem('loginCreds')
      }
      sessionStorage.setItem('userLogged', JSON.stringify(res.data));
      if(res.data.result.role == "admin"){
        navigate(router.dashboard)
      }else{
        navigate(router.main);
      }
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
    if(res.data.auth){
      sessionStorage.setItem('userLogged', JSON.stringify(res.data));
      if(res.data.result.role == "admin"){
        navigate(router.dashboard)
      }else{
        navigate(router.main);
      }
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
        handleChecked = {(e)=>handleChecked(e)}
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