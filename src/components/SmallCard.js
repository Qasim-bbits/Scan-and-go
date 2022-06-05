import React from "react";
import { useNavigate  } from "react-router-dom";
import {
    Paper, CardContent, Typography, Button
} from '@mui/material';


export default function SmallCard(prop) {
const navigate = useNavigate ();
return (
        <Paper elevation={3} sx={{ display: 'flex', p: 1, my:1}}>
            <div className="row">
                <div className="col-4 align-self-center">
                    {prop.icon}
                </div>
                <div className="col-8 align-self-center text-end">
                    <CardContent sx={{p: 0}}>
                        <Typography component="div" variant="h5" className="text-green font-bold">
                            {prop.heading}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="div">
                            {prop.caption}
                        </Typography>
                    </CardContent>
                    <Button className="font-bold font-para p-0" onClick={()=>navigate(prop.router)}>
                        {prop.buttonText}
                    </Button>
                </div>
            </div>
        </Paper> 
    );
}
