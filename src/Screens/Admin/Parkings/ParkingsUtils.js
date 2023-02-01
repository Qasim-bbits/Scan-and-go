import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ParkingsView from "./ParkingsView";
import parkingServices from "../../../services/parking-service";
import moment from 'moment';

export default function ParkingsUtils() {
  let {id} = useParams();
  let navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [inputField, setInputField] = useState({});
  const [parking, setParking] = useState([]);
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(()=>{
    getFilter();
  },[id])

  const getFilter = async()=>{
    let body = {};
    if(id == 'current'){
      body = {
        from: {$lte: new Date()},
        to: {$gte: new Date()}
      }
    }else if(id == 'all'){
      body = {}
    }else if(id == 'paid'){
      body = {
        service_fee: { $ne: '0' }
      }
    }else if(id == 'free'){
      body = {
        service_fee: '0'
      }
    }
    setFilter(body);
    getParkings(body);
  }
  const getParkings = async(e)=>{
    setSpinner(true);
    const res = await parkingServices.getParkings(e);
    setParking(res.data)
    setRows(res.data);
    setSpinner(false);
  }

  const handleChange = (e)=> {
    setInputField({...inputField, [e.target.name] : e.target.value});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setSpinner(true);
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.zone?.zone_name.toLowerCase().includes(searchedVal.toLowerCase()) 
      // || (row.parking_id !== undefined)? '' : row.parking_id.includes(searchedVal)
      || row.city?.city_name.toLowerCase().includes(searchedVal.toLowerCase())
      || row.user?.fname.toLowerCase().includes(searchedVal.toLowerCase())
      || row.user?.email.toLowerCase().includes(searchedVal.toLowerCase())
      || row.plate.toLowerCase().includes(searchedVal.toLowerCase())
      || row.amount.toLowerCase().includes(searchedVal.toLowerCase())
      || (moment(row.from).format('ll hh:mm a')).toLowerCase().includes(searchedVal.toLowerCase())
      || (moment(row.to).format('ll hh:mm a')).toLowerCase().includes(searchedVal.toLowerCase())
    });
    setSearched(searchedVal);
    setParking(filteredRows);
};

const handleParkings = (e)=>{
  console.log(filter);
  let body = filter;
  body["parking_type"] = e;
  getParkings(body);
}

  return (
    <>
      {/* <div className="text-end mt-2">
        <Button 
          type="submit"
          color="secondary"
          variant="contained"
          onClick={()=>setOpenDrawer(true)}>
          Add Parking
        </Button>
      </div> */}
      <ParkingsView
        inputField = {inputField}        
        parking = {parking}
        searched = {searched}

        requestSearch = {(e)=>requestSearch(e)}
        handleParkings = {(e)=>handleParkings(e)}
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
    </>
  );
}
