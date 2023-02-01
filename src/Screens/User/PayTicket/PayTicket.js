import React, {useState, useEffect} from 'react';
import SnackAlert from '../../../shared/SnackAlert';
import Spinner from '../../../Common/Spinner';
import { Layout } from '../../../components/SidebarHeaderWrapper';
import cityServices from '../../../services/city-service';
import PayTicketView from './PayTicketView';
import ticketServices from '../../../services/ticket-service';

export default function PayTicket(props) {
  const user = JSON.parse(sessionStorage.getItem('userLogged'));
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({});
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [activeStep, setActiveStep] = React.useState(0);
  const [ticket, setTicket] = React.useState({});

  useEffect(()=>{
    getCities();
  },[])

  const getCities = async()=>{
    setSpinner(true);
    const res = await cityServices.getCities({});
    setCities(res.data)
    setSpinner(false);
  }

  const handleChange = (e) => {
    if(e.target.name == 'plate'){
      setInputField({ ...inputField, [e.target.name]: e.target.value.toUpperCase().replace(/\s/g, '') });
    }else{
      setInputField({ ...inputField, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    inputField['city'] = selectedCity._id;
    const res = await ticketServices.searchTicket(inputField);
    if(res.data.status !== undefined){
      setAlert(true);
      setMsg(res.data.msg);
      setSeverity(res.data.status);
    }else{
      setTicket(res.data);
      setActiveStep(1);
    }
    setSpinner(false);
  }

  const emailTicketReciept = async (e) =>{
    console.log(e)
    const res = await ticketServices.searchTicket(inputField);

  }

  return (
    <>
      <Layout>
        <PayTicketView 
          user = {user}
          activeStep={activeStep}
          cities = {cities}
          selectedCity = {selectedCity}
          inputField = {inputField}
          ticket = {ticket}

          handleChange={(e)=>handleChange(e)}
          handleSubmit={(e)=>handleSubmit(e)}
          setSelectedCity={(e)=>setSelectedCity(e)}
          emailTicketReciept={(e)=>emailTicketReciept(e)}
          handleBack={()=>setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          handleNext={()=>setActiveStep((prevActiveStep) => prevActiveStep + 1)}
        />
        <SnackAlert
          msg = {msg}
          alert = {alert}
          severity = {severity}
          
          closeAlert = {()=>setAlert(!alert)}
        />
        <Spinner
          spinner = {spinner}
        />
      </Layout>
    </>
  );
}