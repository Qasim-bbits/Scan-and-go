import React, {useState, useEffect} from 'react';
import { Drawer } from '@mui/material';
import moment from 'moment';
import AddPlateForm from './addPlateForm';
import MainView from './main.view';
import ParkingRateForm from './parkingRateForm';
import SelectPlateForm from './selectPlateForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {getCenterOfBounds, isPointInPolygon} from 'geolib';
import SelectTariff from './SelectTariff';
import mainService from '../../services/main-service';
import SnackAlert from '../../Common/Alerts';
import Spinner from '../../Common/Spinner';
import Receipt from './receipt';

const stripePromise = loadStripe('pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA')
export default function MainUtils() {
  var current_time = moment();
  const [showSpinner, setShowSpinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [center,setCenter] = useState({lat: -3.745,lng: -38.523});
  const [zoom,setZoom] = useState(12);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [cityPolygon, setCityPolygon] = useState([]);
  const [selectedPlate, setSelectedPlate] = useState([]);
  const [plates, setPlates] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [drawerComponent, setDrawerComponent] = useState(0);
  const [cities, setCities] = useState([]);
  const [steps, setSteps] = useState(0);
  const [rateCycle, setRateCycle] = useState([]);
  const [zones, setZones] = useState([]);
  const [inputPlateField, setInputPlateField] = useState({});
  const [btn, setBtn] = useState("Add Plate")
  const [inPolygon, setInPolygon] = useState(false);

  const tarifdata = [
    {id: 0, tar_desc: 'Regular Rate', zone_id: 0},
    {id: 1, tar_desc: 'Residant Rate', zone_id: 0},
    {id: 2, tar_desc: 'Regular Rate', zone_id: 1},
  ]

  const [tarif, setTarif] = useState([])

  const rateTypeData = [
    {
      id:0, rate_name: 'day', start_time: '06:00', end_time: '18:00', tarif_id: 0,
      Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 0, Sunday: 0
    },
    {
      id:1, rate_name: 'weekend', start_time: '06:00', end_time: '18:00', tarif_id: 0,
      Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 1, Sunday: 1
    },
    {
      id:2, rate_name: 'night', start_time: '18:00', end_time: '06:00', tarif_id: 0,
      Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 1, Sunday: 1
    },
    {
      id:3, rate_name: 'day', start_time: '05:00', end_time: '17:00', tarif_id: 1,
      Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 0, Sunday: 0
    },
    {
      id:4, rate_name: 'weekend', start_time: '05:00', end_time: '17:00', tarif_id: 1,
      Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 1, Sunday: 1
    },
    {
      id:5, rate_name: 'night', start_time: '17:00', end_time: '05:00', tarif_id: 1,
      Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 1, Sunday: 1
    },
    {
      id:6, rate_name: 'day', start_time: '07:00', end_time: '19:00', tarif_id: 2,
      Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 0, Sunday: 0
    },
    {
      id:7, rate_name: 'weekend', start_time: '07:00', end_time: '19:00', tarif_id: 2,
      Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 1, Sunday: 1
    },
    {
      id:8, rate_name: 'night', start_time: '19:00', end_time: '07:00', tarif_id: 2,
      Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 1, Sunday: 1
    },
  ]
  const [rateType, setRateType] = useState([]);

  const ratestepdata = [
    {id: 0, rate: 100, time: 240, order: 1, rate_type_id: 0},
    {id: 1, rate: 200, time: 480, order: 2, rate_type_id: 0},
    {id: 2, rate: 300, time: 720, order: 3, rate_type_id: 0},
    {id: 3, rate: 400, time: 720, order: 1, rate_type_id: 1},
    {id: 4, rate: 200, time: 720, order: 1, rate_type_id: 2},
    {id: 5, rate: 100, time: 60, order: 1, rate_type_id: 3},
    {id: 6, rate: 200, time: 120, order: 2, rate_type_id: 3},
    {id: 7, rate: 300, time: 720, order: 3, rate_type_id: 3},
    {id: 8, rate: 300, time: 720, order: 1, rate_type_id: 4},
    {id: 9, rate: 500, time: 720, order: 1, rate_type_id: 5},
    {id: 5, rate: 100, time: 60, order: 1, rate_type_id: 6},
    {id: 6, rate: 200, time: 120, order: 2, rate_type_id: 6},
    {id: 7, rate: 300, time: 720, order: 3, rate_type_id: 6},
    {id: 8, rate: 300, time: 720, order: 1, rate_type_id: 7},
    {id: 9, rate: 500, time: 720, order: 1, rate_type_id: 8},
  ]
  const [rateSteps, setRateSteps] = useState([]);

  useEffect(()=>{
    getCities();
    // let time_increased = 0;
    // let date_now = moment().format('dddd')
    // let rate_cycle = [];
    // for(let i = 0; time_increased <= 1440; i++) {
    //   let steps = selectRate(date_now);
    //   var end = moment(steps[steps.length-1].time_desc, 'MMMM Do YYYY, hh:mm a').format();
    //   var duration = moment.duration(moment().diff(end));
    //   time_increased = parseInt(Math.abs(duration.asMinutes()));
    //   date_now = moment(current_time).format('dddd')
    //   let total_price = rate_cycle.length > 0 ? rate_cycle[rate_cycle.length-1].rate : 0;
    //   steps.map(x=>{
    //     x['rate'] = x['rate'] + total_price;
    //   })
    //   Array.prototype.push.apply(rate_cycle,steps)
    //   time_increased = rate_cycle.reduce((n, {time}) => (n + parseInt(time)), 0)
    //   if(time_increased > 1440){
    //     rate_cycle.splice(-1);
    //   }
    //   }
    // console.log(rate_cycle)
    // setRateCycle(rate_cycle);
  },[])

  const getCities = async()=>{
    const res = await mainService.getCities();
    setCities(res.data)
  }

  const toggleDrawer = ()=>setDrawer(true);

  const onSelectedCity = async(e)=>{
    setSelectedCity(e);
    setCityPolygon(e.polygon);
    setCenter(getCenterOfPolygon(e.polygon))
    setZoom(16);
    const res = await mainService.getZonesById({id: e._id});
    setZones(res.data)
  }

  const onSelectedZone = (e)=>{
    setSelectedZone(e);
    console.log(getCenterOfPolygon(e.polygon));
    setCenter(getCenterOfPolygon(e.polygon))
    setZoom(20);
    setTarif(tarifdata.filter(x=>x.zone_id == e.id))
  }

  const handleMapCenter = (center)=>{
    if(selectedZone !== null){
      const options = selectedZone.polygon.map(function(row) {
        return { latitude : row.lat, longitude : row.lng }
      })
      setInPolygon(isPointInPolygon({latitude: center.lat, longitude: center.lng}, options))
    }
  }

  const getCenterOfPolygon = (polygon) =>{
    const options = polygon.map(function(row) {
      return { latitude : row.lat, longitude : row.lng }
    })
    let center =  getCenterOfBounds(options);
    return {lat: center.latitude, lng: center.longitude};
  }

  const confirmZone=async()=>{
    if(selectedCity == null || selectedZone == null){
      setAlertMessage("Please select city and zone");
      setSeverity('error');
      setShowAlert(true);
      return;
    }
    setShowSpinner(true);
    let user = JSON.parse(sessionStorage.getItem('userLogged'));
    const res = await mainService.getPlatesByUser({id: user.result._id});
    setPlates(res.data)
    setDrawerComponent(2);
    toggleDrawer();
    setShowSpinner(false);
    setBtn("Add Plate");
  }

  const onTarifSelect = async(e)=>{
    setSteps(0);
    const res = await mainService.getRateSteps({id: e._id, plate: selectedPlate, rate_type: e.rate_type})
    setRateCycle(res.data);
    if(res.data.length > 0){
      setDrawerComponent(3);
    }else{
      setAlertMessage(res.data.msg);
      setSeverity("error");
      setShowAlert(true);
    }
    return;
    let rateTypeFilter = rateTypeData.filter(x=>x.tarif_id == e.id);
    setRateType(rateTypeFilter)
    console.log(rateTypeFilter)
    const rate_steps = ratestepdata.filter((el) => {
      return rateTypeFilter.some((f) => {
        return f.id === el.rate_type_id;
      });
    });
    setRateSteps(rate_steps)
  }

  const onPlateSelect = async(e)=>{
    setSelectedPlate(e);
    setShowSpinner(true);
    const res = await mainService.getRateById({id: selectedZone._id, plate: e});
    setTarif(res.data);
    setDrawerComponent(0);
    setShowSpinner(false);
    return;
    let time_increased = 0;
    let date_now = moment().format('dddd')
    let rate_cycle = [];
    for(let i = 0; time_increased <= 1440; i++) {
      let steps = selectRate(date_now);
      console.log(steps);
      var end = moment(steps[steps.length-1].time_desc, 'MMMM Do YYYY, hh:mm a').format();
      var duration = moment.duration(moment().diff(end));
      time_increased = parseInt(Math.abs(duration.asMinutes()));
      date_now = moment(current_time).format('dddd')
      let total_price = rate_cycle.length > 0 ? rate_cycle[rate_cycle.length-1].rate : 0;
      steps.map(x=>{
        x['rate'] = x['rate'] + total_price;
      })
      Array.prototype.push.apply(rate_cycle,steps)
      time_increased = rate_cycle.reduce((n, {time}) => (n + parseInt(time)), 0)
      if(time_increased > 1440){
        rate_cycle.splice(-1);
      }
      }
    console.log(rate_cycle)
    setRateCycle(rate_cycle);
  }

  
  const selectRate = (date_now) =>{
    console.log(rateType)
    let rate_start;
    for(let i = 0; i < rateType.length; i++){
      let now = moment(current_time).format("L");
      let date_between = moment(current_time).format();
      let start_time = moment(now +" "+ rateType[i].start_time, "L HH:mm").format();
      let end_time = moment(now +" "+ rateType[i].end_time, "L HH:mm").format();
      if(moment(rateType[i].start_time, "HH:mm") > moment(rateType[i].end_time, "HH:mm")){
        end_time = moment(now +" "+ rateType[i].end_time, "L HH:mm").add(1,"days").format();
        if(moment(current_time).format("a") == 'am'){
          date_between = moment(current_time).add(1,"days").format();
        }
      }
      const condition1 = moment(date_between) >= moment(start_time);
      const condition2 = moment(date_between) < moment(end_time);
      const condition3 = rateType[i][date_now] === 1;
      if( condition1 && condition2 && condition3){
        rate_start = rateType[i];
      }
    }
    let rate_step_start = rateSteps.filter(x=> x.rate_type_id === rate_start.id);
    let steps = generateStep(rate_start,rate_step_start);
    return steps;
  }

  const generateStep = (type, step)=>{
    let rates = [];
    let time_reached = false;
    let time = current_time;
    step.map(x=>{
      let added_date = moment(time).add(x.time, 'minutes').format('MMMM Do YYYY, hh:mm a');
      let last_step = moment(time).add(x.time, 'minutes').format('HH:mm') >= moment(type.end_time, 'HH:mm').format('HH:mm');
      if(last_step){
        let days = (type.start_time > type.end_time) ? 1 : 0
        added_date = moment(moment(time).format("L") + " " + type.end_time, 'L HH:mm').add(days,'days').format('MMMM Do YYYY, hh:mm a');
      }
      let obj={
        time: x.time,
        rate: x.rate,
        time_desc: added_date,
        time_diff: showDiff(added_date),
        day: calculateDay(moment(added_date, 'MMMM Do YYYY, hh:mm a' ).format())
      }
      current_time = moment(added_date, 'MMMM Do YYYY, hh:mm a').format();
      if(!time_reached){
        rates.push(obj);
      }
      if(last_step){
        time_reached = true;
      }
    })
    return rates;
  }

  const showDiff = (added_date)=>{
    var date1 = new Date();    
    var date2 = new Date(moment(added_date, 'MMMM Do YYYY, hh:mm a').format());
    //Customise date2 for your required future time

    var diff = (date2 - date1)/1000;
    var diff = Math.abs(Math.floor(diff));

    var days = Math.floor(diff/(24*60*60));
    var leftSec = diff - days * 24*60*60;

    var hrs = Math.floor(leftSec/(60*60));
    var leftSec = leftSec - hrs * 60*60;

    var min = Math.floor(leftSec/(60));
    var leftSec = leftSec - min * 60;
    days = (days == 0) ? '' : (days + "d ");
    hrs = (hrs == 0) ? '' : (hrs + "h ");
    min = min + "m "
    return days + hrs + min;
  }

  const calculateDay = (added_date)=>{
    var fromNow = moment(added_date ).fromNow();    
      return moment(added_date).calendar( null, {
          lastWeek: '[Last] dddd',
          lastDay:  '[Yesterday]',
          sameDay:  '[Today]',
          nextDay:  '[Tomorrow]',
          nextWeek: 'dddd',             
          sameElse: function () {
              return "[" + fromNow + "]";
          }
      });
  }
  
  const handleChange = (value) => {
    setSteps(value);
  };

  const onPlateDel = async(e) => {
    const res = await mainService.delPlate({id: e});
    if(res.data.deletedCount == 1){
      confirmZone();
    }else{
      setAlertMessage("Unable to delete this plate");
      setSeverity("error");
      setShowAlert(true);
    }
  }

  const onPlateEdit = async(e) => {
    console.log(e)
    inputPlateField['id'] = e._id;
    inputPlateField['plate'] = e.plate;
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
      let user = JSON.parse(sessionStorage.getItem('userLogged'))
      inputPlateField['user_id'] = user.result._id
      await mainService.addPlate(inputPlateField);
    }else{
      await mainService.editPlate(inputPlateField);
    }
    setShowSpinner(false);
    confirmZone();
  }

  return (
    <>
      <MainView
        center = {center}
        zoom = {zoom}
        cities = {cities}
        zones = {zones}
        selectedCity = {selectedCity}
        selectedZone = {selectedZone}
        cityPolygon = {cityPolygon}
        inPolygon = {inPolygon}

        onSelectedCity = {(e)=>onSelectedCity(e)}
        onSelectedZone = {(e)=>onSelectedZone(e)}
        confirmZone = {()=>confirmZone()}
        handleMapCenter = {(e)=>handleMapCenter(e)}
      />
      <Drawer
        variant='temporary'
        open={drawer}
        onClose={toggleDrawer}
        anchor='right'
      >
        {drawerComponent === 0 && <SelectTariff 
          tarif = {tarif}
          setDrawerOpen = {toggleDrawer}
          onTarifSelect = {(e)=>onTarifSelect(e)}
          back = {()=>setDrawerComponent(2)}
          />}
        {drawerComponent === 1 && <AddPlateForm
          setDrawerOpen = {toggleDrawer}
          inputPlateField = {inputPlateField}
          btn = {btn}

          handlePlateChange = {(e)=>handlePlateChange(e)}
          handlePlateSubmit = {(e)=>handlePlateSubmit(e)}
          back = {()=>setDrawerComponent(2)}
        />}
        {drawerComponent === 2 && <SelectPlateForm 
          setDrawerOpen = {toggleDrawer}
          plates = {plates}

          onPlateSelect = {(e)=>onPlateSelect(e)}
          onPlateEdit = {(e)=>onPlateEdit(e)}
          onPlateDel = {(e)=>onPlateDel(e)}
          addPlateDrawer = {()=>{setDrawerComponent(1)}}
          back = {()=>setDrawer(false)}
          />}
        <Elements stripe={stripePromise}>
          {drawerComponent === 3 && rateCycle.length > 0 && <ParkingRateForm 
            steps = {steps}
            rateCycle = {rateCycle}
            user = {JSON.parse(sessionStorage.getItem('userLogged'))}
            plate = {selectedPlate}
            zone = {selectedZone._id}
            city = {selectedCity._id}

            setDrawerOpen={toggleDrawer} 
            handleChange = {(e)=>handleChange(e)}
            back = {()=>setDrawerComponent(0)}
            showReciept = {()=>setDrawerComponent(4)}
          />}
        </Elements>
        {drawerComponent === 4 && <Receipt 
            steps = {steps}
            rateCycle = {rateCycle}
            plate = {selectedPlate}

            setDrawerOpen={toggleDrawer}
            back = {()=>setDrawer(false)}
          />}
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
    </>
  );
}