import React, {useState, useEffect} from 'react';
import moment from 'moment';
import AddPlateForm from './addPlateForm';
import ParkingRateForm from './parkingRateForm';
import SelectPlateForm from './selectPlateForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SelectTariff from './SelectTariff';
import mainService from '../../services/main-service';
import SnackAlert from '../../Common/Alerts';
import Spinner from '../../Common/Spinner';
import Receipt from './receipt';
import { Layout } from '../../components/SidebarHeaderWrapper';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA')
export default function QRCodeUtils() {
  let {id} = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [selectedPlate, setSelectedPlate] = useState([]);
  const [plates, setPlates] = useState([]);
  const [drawerComponent, setDrawerComponent] = useState(2);
  const [steps, setSteps] = useState(0);
  const [rateCycle, setRateCycle] = useState([]);
  const [zones, setZones] = useState([]);
  const [inputPlateField, setInputPlateField] = useState({});
  const [btn, setBtn] = useState("Add Plate")
  const [parking, setParking] = useState({})
  const [tarif, setTarif] = useState([])


  useEffect(()=>{
    getZonebyId();
    confirmZone();
  },[])

  const getZonebyId = async()=>{
    const res = await mainService.getZonebyId({id: id});
    setZones(res.data)
  }

  const confirmZone=async()=>{
    setShowSpinner(true);
    let plate = JSON.parse(localStorage.getItem('plates'));
    if(plate !== null){
      setPlates(plate)
    }
    setShowSpinner(false);
    setDrawerComponent(2);
    setBtn("Add Plate");
  }

  const onTarifSelect = async(e)=>{
    setSteps(0);
    setShowSpinner(true);
    const res = await mainService.getRateSteps({id: e._id, plate: selectedPlate, rate_type: e.rate_type, qr_code: e.qr_code})
    setRateCycle(res.data);
    if(res.data.length > 0){
      setDrawerComponent(3);
    }else{
      setAlertMessage(res.data.msg);
      setSeverity("error");
      setShowAlert(true);
    }
    setShowSpinner(false);
  }

  const onPlateSelect = async(e)=>{
    setSelectedPlate(e);
    setShowSpinner(true);
    const res = await mainService.getQRRateById({id: zones[0]._id, plate: e, zone_type: zones[0].zone_type});
    if(res.data.success != false){
      setTarif(res.data);
      setDrawerComponent(0);
    }else{
      setAlertMessage(res.data.msg);
      setSeverity('info');
      setShowAlert(true);
    }
    setShowSpinner(false);
  }

  const handleChange = (value) => {
    setSteps(value);
  };

  const onPlateDel = async(e) => {
    let plate = JSON.parse(localStorage.getItem('plates'));
    plate.splice(e, 1)
    localStorage.setItem('plates', JSON.stringify(plate));
    confirmZone();
  }

  const onPlateEdit = async(plate, index) => {
    inputPlateField['id'] = index;
    inputPlateField['plate'] = plate;
    setDrawerComponent(1);
    setBtn("Edit Plate");
  }

  const handlePlateChange = (e) =>{
    setInputPlateField({...inputPlateField, [e.target.name] : e.target.value})
  }

  const handlePlateSubmit = async(e) =>{
    e.preventDefault();
    setShowSpinner(true);
    if(btn == "Add Plate"){
      let plate = JSON.parse(localStorage.getItem('plates'));
      if(plate !== null){
        plate.push(inputPlateField['plate'])
        localStorage.setItem('plates', JSON.stringify(plate));
      }else{
        plate = [];
        plate.push(inputPlateField['plate'])
        localStorage.setItem('plates', JSON.stringify(plate));
      }
    }else{
      let plate = JSON.parse(localStorage.getItem('plates'));
      plate[inputPlateField.id] = inputPlateField.plate
      localStorage.setItem('plates', JSON.stringify(plate));
    }
    setShowSpinner(false);
    confirmZone();
  }

  return (
    <>
      <Layout>
        {drawerComponent === 0 && <SelectTariff 
          tarif = {tarif}
          onTarifSelect = {(e)=>onTarifSelect(e)}
          back = {()=>setDrawerComponent(2)}
          />}
        {drawerComponent === 1 && <AddPlateForm
          inputPlateField = {inputPlateField}
          btn = {btn}

          handlePlateChange = {(e)=>handlePlateChange(e)}
          handlePlateSubmit = {(e)=>handlePlateSubmit(e)}
          back = {()=>setDrawerComponent(2)}
        />}
        {drawerComponent === 2 && <SelectPlateForm 
          plates = {plates}

          onPlateSelect = {(e)=>onPlateSelect(e)}
          onPlateEdit = {(e, index)=>onPlateEdit(e, index)}
          onPlateDel = {(e)=>onPlateDel(e)}
          addPlateDrawer = {()=>{setDrawerComponent(1)}}
          />}
        <Elements stripe={stripePromise}>
          {drawerComponent === 3 && rateCycle.length > 0 && <ParkingRateForm 
            steps = {steps}
            rateCycle = {rateCycle}
            plate = {selectedPlate}
            zone = {zones[0]._id}
            city = {zones[0].city_id}
            tarif = {tarif}

            handleChange = {(e)=>handleChange(e)}
            back = {()=>setDrawerComponent(0)}
            showReciept = {()=>setDrawerComponent(4)}
            setParking = {(e)=>setParking(e)}
            />}
        </Elements>
        {drawerComponent === 4 && <Receipt 
            steps = {steps}
            rateCycle = {rateCycle}
            plate = {selectedPlate}
            zone = {zones[0]}
            tarif = {tarif}
            parking = {parking}

          />}
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