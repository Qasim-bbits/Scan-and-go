import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import SnackAlert from "../../../shared/SnackAlert";
import Spinner from "../../../shared/Spinner";
import ReportingView from "./ReportingView";
import Filter from "./Filter";
import { Drawer } from "@mui/material";
import reportingServices from "../../../services/reporting-service";
import { commonOperator, dateOperator, objectIDOperator, parking, tickets_issued } from "../../../data/filterKeys";
import cityServices from "../../../services/city-service";
import userServices from "../../../services/user-service";
import moment from "moment";

export default function Reporting() {
  const [openDialog, setOpenDialog] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const [inputField, setInputField] = useState({});
  const [report, setReport] = useState([])
  const [total, setTotal] = useState({amount: 0, service_fee: 0})
  const [value, setValue] = useState({});
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedKey, setSelectedKey] = useState(null)
  const [filterBy, setFilterBy] = useState('parking')
  const [operator, setOperator] = useState({
    commonOperator: commonOperator,
    dateOperator: dateOperator,
    objectIDOperator: objectIDOperator
  });
  const [selectedOperator, setSelectedOperator] = useState(null)

  const inputObj = {key: null, operator: null, value: null, condition: ''}
  const inputsArr = [inputObj]
  const [inputs, setInputs] = useState(inputsArr);
  const status = ['paid', 'unpaid']

  useEffect(()=>{
  },[])
  
  const getCities = async()=>{
    setSpinner(true);
    const res = await cityServices.getCities();
    setValue({...value, city: res.data})
    setSpinner(false);
  }

  const getZones = async()=>{
    setSpinner(true);
    const res = await cityServices.getZones();
    setValue({...value, zone: res.data})
    setSpinner(false);
  }

  const getUsers = async()=>{
    setSpinner(true);
    const res = await userServices.getUsers();
    setValue({...value, user: res.data})
    setSpinner(false);
  }

  const getAgents = async()=>{
    setSpinner(true);
    const res = await userServices.getAgents();
    setValue({...value, issued_by: res.data})
    setSpinner(false);
  }

  const generateReport = async(e)=>{
    e.preventDefault();
    setSpinner(true);
    let res;
    if(filterBy == 'parking'){
      res = await reportingServices.generateReport(inputs);
    }else{
      res = await reportingServices.generateTicketIssuedReport(inputs);
    }
    setReport(res.data.report)
    setTotal(res.data.total)
    setOpenDrawer(false);
    setSpinner(false);
  }

  const exportPDF = async()=>{
    setSpinner(true);
    if(filterBy == 'parking'){
      createParkingReport();
    }else{
      createTicketingReport();
    }
  }

  const createTicketingReport = () => {
    let table = report.map(function(item){
      return {
        city: item.city?.city_name,
        zone: item.zone?.zone_name,
        issued_by: item.issued_by?.email,
        ticket: item.ticket?.ticket_name,
        plate: item.plate,
        ticket_num: item.ticket_num,
        amount: (item.amount) ? '$ '+(item.amount/100).toFixed(2) : '',
        parking_status: item.parking_status,
        ticket_status: item.ticket_status,
        issued_at: moment(item.issued_at).format('MMM Do YY, hh:mm a'),
        paid_at: (item.paid_at !== undefined) ? moment(item.paid_at).format('MMM Do YY, hh:mm a') : '',
      }
    })
    Object.keys(total).forEach(function(key, index) {
      let label = key.replace(/_/g, ' ');
      label = label[0].toUpperCase() + label.slice(1);
      table = [...table, ...[{
        parking_status: { content: label, colspan: 2 },
        issued_at: { content: total[key], colspan: 1, styles: { halign: 'right' } }
      }]]
    });
    let columns = [
      { dataKey: 'city', header: 'City' },
      { dataKey: 'zone', header: 'Zone' },
      { dataKey: 'ticket', header: 'Ticket' },
      { dataKey: 'issued_by', header: 'Issued By' },
      { dataKey: 'plate', header: 'Plate' },
      { dataKey: 'ticket_num', header: 'Ticket Number' },
      { dataKey: 'amount', header: 'Amount' },
      { dataKey: 'paid_at', header: 'Paid At' },
      { dataKey: 'parking_status', header: 'Parking Status' },
      { dataKey: 'ticket_status', header: 'Ticket Status' },
      { dataKey: 'issued_at', header: 'Issued At' },
    ];
    let filename = 'Tickets Issued Report'
    generatePdf(table, columns, filename)
  }

  const createParkingReport = () => {
    let table = report.map(function(item){
      return {
        city: item.city?.city_name,
        zone: item.zone?.zone_name,
        user: item.user?.email,
        parking_id: item.parking_id,
        plate: item.plate,
        service_fee: '$ '+(parseInt(item.service_fee)/100).toFixed(2),
        amount: '$ '+(item.amount/100).toFixed(2),
        dateTime: moment(item.from).format('MMM Do YY, hh:mm a')+' - '+moment(item.to).format('MMM Do YY, hh:mm a'),
      }
    })
    table = [...table, ...[
      {
        amount: 'Total parkings',
        dateTime: { content: total.total_parkings, colspan: 1, styles: { halign: 'right' } }
      },
      {
        amount: 'Total plates',
        dateTime: { content: total.total_plates, colspan: 1, styles: { halign: 'right' } }
      },
      {
        amount: 'Service fee',
        dateTime: { content: '$ '+(parseInt(total.service_fee)/100).toFixed(2), colspan: 1, styles: { halign: 'right' } }
      },
      {
        amount: 'Amount',
        dateTime: { content: '$ '+(parseInt(total.amount)/100).toFixed(2), colspan: 1, styles: { halign: 'right' } }
      },
    ]]
    let columns = [
      { dataKey: 'city', header: 'City' },
      { dataKey: 'zone', header: 'Zone' },
      { dataKey: 'user', header: 'Email' },
      { dataKey: 'parking_id', header: 'Parking Id' },
      { dataKey: 'plate', header: 'Plate' },
      { dataKey: 'service_fee', header: 'Service Fee' },
      { dataKey: 'amount', header: 'Amount' },
      { dataKey: 'dateTime', header: 'Start Date/Time - End Date/Time' },
    ];
    let filename = 'Parking Report'
    generatePdf(table, columns, filename)
  }

  const generatePdf = async(table, columns, filename)=>{
    var doc = new jsPDF({
      orientation: "landscape",
      format: "A3",
    });

    doc.autoTable({
      headStyles :{fillColor : [44, 54, 128], textColor: [255,255,255]},
      body: [...table],
      columnStyles: {
        2: {cellWidth: 50},
      },
      columns: columns,
      didDrawPage: function (data) {
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        // Header
        doc.setFontSize(20);
        doc.setTextColor('#2c3680');
        var img = new Image(); //this mount a variable to img
        img.src = require('../../../assets/images/Logos/logo_hd.png')
        doc.addImage(img, 'JPEG', data.settings.margin.left, 10, 50, 20);
        doc.text(filename, (pageWidth - 50)/2, 20);

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages()
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, pageHeight - 10);
        doc.text(moment().format('MMM Do YY, hh:mm a'), pageWidth - 50, pageHeight - 10);
        doc.text('© 2023 Connected Parking', (pageWidth - 50)/2, pageHeight - 10);
      },
      margin: {top: 40}
    });
    doc.save(filename+'.pdf', { returnPromise: true }).then(() => {
      setSpinner(false)
    });
  }

  const onKeySelect = async(e, index)=>{
    if(e?.key == 'city'){
      getCities();
    }else if(e?.key == 'zone'){
      getZones();
    }else if(e?.key == 'user'){
      getUsers();
    }else if(e?.key == 'issued_by'){
      getAgents();
    }else if(e?.key == 'ticket_status'){
      setValue({...value, ticket_status: status})
    }else 
    setSelectedKey(e);
    if(e){
      setInputs(s => {
        const newArr = s.slice();
        newArr[index].key =  e;
        newArr[index].operator =  null;
        newArr[index].value =  null;
        newArr[index].condition =  null;
        return newArr;
      });
    }
  }

  const onOperatorSelect = async(e, index)=>{
    console.log(e)
    setInputs(s => {
      const newArr = s.slice();
      newArr[index].operator =  e;
      return newArr;
    });
    setSelectedOperator(e)
  }

  const onValueSelect = async(e, index)=>{
    console.log(e);
    setSelectedValue(e);
    setInputs(s => {
      const newArr = s.slice();
      newArr[index].value =  e;
      return newArr;
    });
    console.log(inputs)
  }

  const addInput = (e, index) => {
    setInputs(s => {
      const newArr = s.slice();
      newArr[index].condition =  e;
      return newArr;
    });
    console.log(inputs,index)
    if(inputs.length-1 == index){
      setInputs(s => {return [ ...s, inputObj]});
    }
  };

  const delInput = (index)=>{
    let clone = [...inputs];
    clone.splice(index , 1);
    setInputs(clone);
  }

  const handleInputChange = (e) => {
    const index = e.target.id;
    setInputs(s => {
      const newArr = s.slice();
      newArr[index][e.target.name] =  e.target.checked || e.target.value;
      return newArr;
    });
  };

  const onFilterChange = (e) =>{
    setFilterBy(e);
    setInputs(inputsArr);
    setReport([]);
    setTotal({amount: 0, service_fee: 0});
  }

  return (
    <>
      <ReportingView
        filterBy={filterBy}
        report = {report}
        total = {total}

        setOpenDrawer={()=>{setOpenDrawer(!openDrawer)}}
        exportPDF={()=>exportPDF()}
      />
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#fff !important",
            width:
              window.innerWidth > 700
                ? "70% !important"
                : "100% !important",
          },
        }}
        anchor={'right'}
        open={openDrawer}
        onClose={()=>setOpenDrawer(false)}
      >
        <Filter
          inputField={inputField}
          // btn={btn}
          value = {value}
          keys={(filterBy === 'parking') ? parking : tickets_issued}
          operator={operator}
          selectedKey={selectedKey}
          selectedOperator={selectedOperator}
          selectedValue={selectedValue}
          inputs={inputs}
          filterBy={filterBy}
          
          onKeySelect={(e, index)=>onKeySelect(e, index)}
          onOperatorSelect={(e, index)=>onOperatorSelect(e, index)}
          onValueSelect={(e, index)=>onValueSelect(e, index)}
          onClose={()=>setOpenDrawer(false)}
          addInput={(e, index)=>addInput(e, index)}
          delInput={(e)=>delInput(e)}
          handleInputChange={(e)=>handleInputChange(e)}
          generateReport={(e)=>generateReport(e)}
          setFilterBy={(e)=>onFilterChange(e.target.value)}
        />
      </Drawer>
      <Spinner
        spinner = {spinner}
      />
      {/* <ConfirmDiallog
        openDialog = {openDialog}

        closeDialog = {()=>setOpenDialog(false)}
        delItem = {()=>delItem()}
      /> */}
    </>
  );
}
