import React, {useState, useEffect} from 'react';
import moment from 'moment';
import HistoryView from './History.view';
import mainService from '../../services/main-service';
import SnackAlert from '../../Common/Alerts';
import Spinner from '../../Common/Spinner';
import { Layout } from '../../components/SidebarHeaderWrapper';
import { Drawer } from '@mui/material';
import DetailView from './Detail.view';

export default function HistoryUtils() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [drawer, setDrawer] = useState(false);

  useEffect(()=>{
    getUserHistory();
  },[])

  const getUserHistory = async()=>{
    setShowSpinner(true);
    let user = JSON.parse(sessionStorage.getItem("userLogged"));
    if(user !== null){
        const res = await mainService.getUserHistory({user_id: user.result._id});
        setHistory(res.data)
    }
    setShowSpinner(false);
  }

  const emailReciept = async()=>{
    setShowSpinner(true);
    const res = await mainService.emailReciept({parking_id : selectedList._id});
    setAlertMessage(res.data.msg);
    setSeverity(res.data.status);
    setShowAlert(true);
    setShowSpinner(false);
  }

  return (
    <>
        <Layout>
            <HistoryView 
                history = {history}
                
                onListSelect = {(e)=>{setSelectedList(e);setDrawer(true);}}
            />
            <Drawer
                variant='temporary'
                open={drawer}
                onClose={()=>setDrawer(false)}
                anchor='right'
                sx={{background: '#fff'}}
            >
                <DetailView
                    selectedList = {selectedList}

                    emailReciept = {()=>emailReciept()}
                    back={()=>setDrawer(false)}
                />
            </Drawer>
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