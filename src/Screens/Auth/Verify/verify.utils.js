import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VerifyView from './verify.view';
import authServices from '../../../services/auth-service';
import Spinner from '../../../Common/Spinner';
import NotVerify from './notVerify.view';

function VerifyUtils() {
  let navigate = useNavigate();
  const {token} = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [verified, setVerified] = useState(false);

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
      {verified && <VerifyView/>}
      {!verified && <NotVerify/>}
      <Spinner
        spinner = {showSpinner}
      />
    </>
  );
}

export default VerifyUtils;