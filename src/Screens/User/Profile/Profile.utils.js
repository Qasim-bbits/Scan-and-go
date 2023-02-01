import React, {useState, useEffect} from 'react';
import ProfileView from './Profile.view';
import mainService from '../../../services/main-service';
import SnackAlert from '../../../Common/Alerts';
import Spinner from '../../../Common/Spinner';
import { Layout } from '../../../components/SidebarHeaderWrapper';

export default function ProfileUtils() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [profile, setProfile] = useState([]);
  const [inputField, setInputField] = useState({});

  useEffect(()=>{
    getUserProfile();
  },[])

  const getUserProfile = async()=>{
    setShowSpinner(true);
    let user = JSON.parse(sessionStorage.getItem("userLogged"));
    if(user !== null){
        const res = await mainService.getUserProfile({user_id: user.result._id});
        setInputField(res.data[0])
    }
    setShowSpinner(false);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setShowSpinner(true); 
    const res = await mainService.editProfile(inputField);
    setAlertMessage("Profile Updated Successfuly");
    setSeverity("success");
    setShowAlert(true);
    setShowSpinner(false);
  }

  return (
    <>
        <Layout>
            <ProfileView 
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
        </Layout>
    </>
  );
}