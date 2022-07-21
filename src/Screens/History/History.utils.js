import React, {useState, useEffect} from 'react';
import moment from 'moment';
import HistoryView from './History.view';
import mainService from '../../services/main-service';
import SnackAlert from '../../Common/Alerts';
import Spinner from '../../Common/Spinner';
import { Layout } from '../../components/SidebarHeaderWrapper';

export default function HistoryUtils() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedList, setSelectedList] = useState({});


  useEffect(()=>{
    getUserHistory();
  },[])

  const getUserHistory = async()=>{
    let user = JSON.parse(sessionStorage.getItem("userLogged"));
    if(user !== null){
        const res = await mainService.getUserHistory({user_id: user.result._id});
        setHistory(res.data)
    }
  }

  const onListSelect = (e) => {
    
  };

  return (
    <>
        <Layout>
            <HistoryView 
                history = {history}
                
                onListSelect = {(e)=>onListSelect(e)}
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