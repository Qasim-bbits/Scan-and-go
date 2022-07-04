import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { router } from '../../../Routes/routhPaths';
import VerifyView from './verify.view';
import SnackAlert from '../../../Common/Alerts';
import authServices from '../../../services/auth-service';

function VerifyUtils() {
  let navigate = useNavigate();
  const {token} = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({});

  const verify = async()=> {
    setShowSpinner(true);
    const res = await authServices.verify({token : token});
    console.log(res.data);
    if(res.data.msg){
      setAlertMessage(res.data.msg);
    }else{
      sessionStorage.setItem('userLogged', JSON.stringify(res.data));
      navigate(router.main);
    }
    setShowSpinner(false);
  }

  useEffect(async ()=>{
    verify();
  },[token])

  return (
    <>
      <VerifyView
        alertMessage = {alertMessage}
      />
      <SnackAlert
        alertMessage = {alertMessage}
        showAlert = {showAlert}
        severity = {severity}
        
        closeAlert = {()=>setShowAlert(!showAlert)}
      />
    </>
  );
}

export default VerifyUtils;