import React, { useState, useEffect } from "react";
import dashboardService from "../../../services/dashboard-service";
import Spinner from "../../../shared/Spinner";
import DashboardView from "./DashboardView";

export default function Dashboard() {
  const [spinner, setSpinner] = React.useState(false);
  const [dashboard, setDashboard] = React.useState(false);

  useEffect(() => {
    getDashboardData()
  }, []);

  const getDashboardData = async ()=>{
    setSpinner(true);
    const res = await dashboardService.getDashboard();
    setDashboard(res.data)
    setSpinner(false);
  }
  return (
    <div>
      <DashboardView 
        dashboard = {dashboard}
      />
      <Spinner spinner={spinner} />
    </div>
  );
}
