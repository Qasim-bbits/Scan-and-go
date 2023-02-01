import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../Common/Alerts";
import Spinner from "../../../Common/Spinner";
import ConfirmDiallog from "../../../shared/ConfirmDiallog";
import EditRate from "./EditRate";
import AddRate from "./AddRate";
import RatesView from "./RatesView";
import mainServices from "../../../services/main-service";
import rateServices from "../../../services/rate-service";

export default function RatesUtils() {
  const [spinner, setSpinner] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [alertMessage, setMsg] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [inputField, setInputField] = useState({});
  const [inputAddField, setInputAddField] = useState({});
  const [inputRateSteps, setInputRateSteps] = useState({});
  const [zones, setZones] = useState([]);
  const [rates, setRates] = useState([]);
  const [rateDetail, setRateDetail] = useState([]);
  const [rateSteps, setRateSteps] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [zoneId, setZoneId] = useState("");
  const [btn, setBtn] = useState("Add");
  const [rateType, setRateType] = useState('regular');
  const [editId, setEditId] = useState('');

  useEffect(()=>{
    getZones();
  },[])

  const getZones = async()=>{
    setSpinner(true);
    const res = await mainServices.getZones();
    setZones(res.data)
    setSpinner(false);
  }

  const onZoneSelected = async (e)=>{
    setSelectedZone(e);
    setSelectedRate(null);
    setSpinner(true);
    const res = await rateServices.getRateByZone({id: e._id});
    setRates(res.data)
    if(res.data.length === 1){
      setSelectedRate(res.data[0])
    }
    setSpinner(false);
  }

  const getRateDetail = async(e)=>{
    setSpinner(true);
    setZoneId(e);
    const res = await rateServices.getRateDetail({zone_id : e});
    setRateDetail(res.data);
    setSpinner(false);
  }

  const onRateType = (e)=>{
    setRateType(e.target.value);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleAddChange = (e)=> {
    setInputAddField({...inputAddField, [e.target.name] : e.target.value});
  }

  const handleCheck =  (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.checked});
  }

  const handleAddCheck =  (e)=> {
    setInputAddField({...inputAddField, [e.target.name] : e.target.checked});
  }

  const handleRateChange = (e, index)=> {
    let clone = [...rateSteps];
    let obj = clone[index];
    obj[e.target.name] = parseInt(e.target.value);
    clone[index] = obj;
    setRateSteps([...clone])
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setSpinner(true);
    let obj = {...inputField};
    const rate_step = rateSteps.map((y)=>{
      return{
        _id : y._id,
        rate : y[y._id+"_rate"],
        time : y[y._id+"_time"]
      }
    })
    obj['rate_step'] = rate_step
    const stepRes = await rateServices.bulkEditSteps(obj);
    console.log(stepRes.data)
    setMsg("Rate Updated Successfully");
    setSeverity('success');
    setAlert(true);
    getRateDetail(zoneId);
    setOpenDrawer(false)
    setSpinner(false);
  }

  const handleAddSubmit = async(e, steps)=> {
    e.preventDefault();
    setSpinner(true);
    let body = {};
    body['rate_name']= inputAddField["rate_name"];
    body['zone_id']= selectedZone._id;
    body['rate_type']= 0;
    body['qr_code']= false;
    body['service_fee']=parseInt(inputAddField['service_fee']);
    body['rates'] = steps;
    if(rateType == 'special'){
      body['rates'].map(x=>{
        x['start_date'] = inputAddField['start_date']
        x['end_date'] = inputAddField['end_date']
        x['special_rate'] = true;
        x['rate_type_id'] = selectedRate._id;
      })
      const res = rateServices.addSpecialRate(body);
      console.log(res.data);
    }else{
      body['rates'].map(x=>{
        x['special_rate'] = false;
        const res = rateServices.addCompleteRate(body);
        console.log(res.data);
      })
    }
    setMsg("Rate Added Successfully");
    setSeverity('success');
    setAlert(true);
    setOpenDrawer(false)
    setSpinner(false);
  }
  
  const editItem = async(e)=> {
    const rate_step = e.rate_step.map((y)=>{
      return{
        _id : y._id,
        [y._id+"_rate"] : y.rate,
        [y._id+"_time"] : y.time
      }
    })
    e.start_date = convertToDatetime(e.start_date);
    e.end_date = convertToDatetime(e.end_date);
    setRateSteps(rate_step);
    setInputRateSteps(rate_step)
    setInputField(e);
    setBtn("Edit")
    setOpenDrawer(true)
  }

  const convertToDatetime = (dt) =>{
    var now = new Date(dt);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0,16);
  }

  const delItem = async ()=>{
    setSpinner(true);
    const res = await rateServices.delRateType({id: editId});
    if(res.data.deletedCount > 0){
      getRateDetail(zoneId);
      setMsg('Rate deleted successfuly')
      setSeverity('success')
    }else{
      setMsg('Unable to delete. Contact Support')
      setSeverity('error')
      setSpinner(false);
    }
    setOpenDialog(false);
    setAlert(true)
  }

  return (
    <>
      {zones.length > 0 && <RatesView
        inputField = {inputField}        
        zones = {zones}
        rateDetail = {rateDetail}

        setOpenAddDrawer = {()=> setOpenAddDrawer(!openAddDrawer)}
        getRateDetail = {(e)=>getRateDetail(e)}
        editItem = {(e)=>editItem(e)}
        delItem={(id) => {setEditId(id); setOpenDialog(true)}}
        setOpenDrawer={()=>setOpenDrawer(!openDrawer)}
      />}
      <EditRate
        zones = {zones}
        selectedZone = {selectedZone}
        openDrawer = {openDrawer}
        inputField = {inputField}
        inputRateSteps = {inputRateSteps}
        btn = {btn}
        rateSteps = {rateSteps}

        handleChange = {(e)=>handleChange(e)}
        handleCheck = {(e)=>handleCheck(e)}
        handleRateChange = {(e, index)=>handleRateChange(e, index)}
        handleSubmit = {(e)=>handleSubmit(e)}
        setOpenDrawer = {()=> setOpenDrawer(!openDrawer)}
        setSelectedZone = {(e)=> setSelectedZone(e)}
      />
      <AddRate
        zones = {zones}
        selectedZone = {selectedZone}
        openAddDrawer = {openAddDrawer}
        inputAddField = {inputAddField}
        btn = {btn}
        rateType = {rateType}
        rates = {rates}
        selectedRate = {selectedRate}

        handleAddChange = {(e)=>handleAddChange(e)}
        handleAddCheck = {(e)=>handleAddCheck(e)}
        handleAddSubmit = {(e, steps)=>handleAddSubmit(e, steps)}
        setOpenAddDrawer = {()=> setOpenAddDrawer(!openAddDrawer)}
        onZoneSelected = {(e)=> onZoneSelected(e)}
        setSelectedRate = {(e)=> setSelectedRate(e)}
        onRateType = {(e)=> onRateType(e)}
      />
      <Alert
        alertMessage = {alertMessage}
        showAlert = {showAlert}
        severity = {severity}
        
        closeAlert = {()=>setAlert(!showAlert)}
      />
      <Spinner
        spinner = {spinner}
      />
      <ConfirmDiallog
        openDialog = {openDialog}

        closeDialog = {()=>setOpenDialog(false)}
        delItem = {()=>delItem()}
      />
    </>
  );
}
