import React, {useState, useEffect} from "react";
import Spinner from "../../../shared/Spinner";
import ProductsView from "./ProductsView";

export default function Products() {
    const [spinner, setSpinner] = React.useState(false);

    useEffect(()=>{
        
    },[])

    return (
        <div>
            <ProductsView 
            />
            <Spinner
                spinner = {spinner}
            />
        </div>
    );
}
