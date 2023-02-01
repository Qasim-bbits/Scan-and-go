import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SmallCard from "../../../components/SmallCard";
import ParkIn from "../../../assets/icons/park_in.png"
import Amount from "../../../assets/icons/amount.png"
import List from "../../../assets/icons/list.png"
import Clock from "../../../assets/icons/clock.png"
import {router} from "../../../Routes/routhPaths";
import AreaRechart from "../../../components/Charts/AreaChart";

export default function DashboardView(props) {
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item md={3} xs={12} lg={3}>
        <SmallCard
          imageFilename={ParkIn}
          heading="Current"
          caption="Parking"
          quantity={props.dashboard.current}
          path={router.parkings+"/current"}
        />
      </Grid>
      <Grid item md={3} xs={12} lg={3}>
        <SmallCard
          imageFilename={Clock}
          heading="Historical"
          caption="Parking"
          quantity={props.dashboard.all}
          path={router.parkings+"/all"}
        />
      </Grid>
      <Grid item md={3} xs={12} lg={3}>
        <SmallCard
          imageFilename={Amount}
          heading="Paid"
          caption="Parking"
          quantity={props.dashboard.paid}
          path={router.parkings+"/paid"}
        />
      </Grid>
      <Grid item md={3} xs={12} lg={3}>
        <SmallCard
          imageFilename={List}
          heading="Free"
          caption="Parking"
          quantity={props.dashboard.free}
          path={router.parkings+"/free"}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ height: "80vh", p: 2, mb: 8 }}>
          <AreaRechart
              titleColor = {'primary'}
              title = {"Report"}
              height = {400}
              data = {props.dashboard.assetsReport}
              xDataKey = {"_id"}
              yDataKey = {"Amount"}
              stroke = {"#2c3680"}
              fill = {"#2c3680"}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
