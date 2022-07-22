import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VerifyView from './verify.view';
import authServices from '../../../services/auth-service';
import Spinner from '../../../Common/Spinner';

function VerifyUtils() {
  let navigate = useNavigate();
  const {token} = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [verified, setVerified] = useState({});

  useEffect(async ()=>{
    verify();
  },[])
  
  const verify = async()=> {
    setShowSpinner(true);
    const res = await authServices.verify({token : token});
    setVerified(res.data.auth);
    setShowSpinner(false);
  }

  return (
    <>
      <VerifyView
        verified = {verified}
      />
      <Spinner
        spinner = {showSpinner}
      />
    </>
  );
}

export default VerifyUtils;