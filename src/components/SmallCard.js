import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, CardContent, Typography, Button } from "@mui/material";

export default function SmallCard(prop) {
  const navigate = useNavigate();
  return (
    <Paper elevation={3} sx={{ display: "flex", p: 1, my: 1, cursor: "pointer" }} onClick={()=>navigate(prop.path)}>
      <div className="row">
        <div className="col-8 align-self-center">
          <CardContent sx={{ p: 0, pb: '0 !important' }}>
            <Typography
              color="secondary"
              component="div"
              variant="h5"
              className="font-bold"
            >
              {prop.heading}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              className="font-bold"
            >
              {prop.caption}
            </Typography>
            <Typography
              color="secondary"
              component="div"
              variant="h5"
              className="font-bold"
            >
              {prop.quantity}
            </Typography>
          </CardContent>
        </div>
        <div className="col-4 align-self-center text-end">
          <img src={prop.imageFilename} alt="icon" width={"100px"}/>
        </div>
      </div>
    </Paper>
  );
}
