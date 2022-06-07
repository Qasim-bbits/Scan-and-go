import React from "react";
import { withStyles, createStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import ResponsiveConstants from "./ResponsiveConstant";

const styleSheet = createStyles(theme => ({
  root: {
    [theme.breakpoints.up(ResponsiveConstants.mobileBreakpoint)]: {
      "min-height": 500
    }
  }
}));

function ResponsiveContainerGrid(props) {
  const classes = props.classes;
  const { children } = props;
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justifyContent='space-around'
      sx={{marginTop: '4%'}}
    >
      {children}
    </Grid>
  );
}

export default withStyles(styleSheet)(ResponsiveContainerGrid);
