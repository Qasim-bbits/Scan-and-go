import React, {useState, useEffect} from "react";
import Spinner from "../../../shared/Spinner";
import DashboardView from "./DashboardView";

export default function Dashboard() {
    const [spinner, setSpinner] = React.useState(false);

    useEffect(()=>{
        
    },[])

    return (
        <div>
            <DashboardView 
            />
            <Spinner
                spinner = {spinner}
            />
        </div>
    );
}
