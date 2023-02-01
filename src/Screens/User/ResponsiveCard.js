import React from "react";
import { withStyles, createStyles } from "@mui/styles";
import { Card } from "@mui/material";

import ResponsiveConstants from "./ResponsiveConstant";

const styleSheet = createStyles(theme => ({
  root: {
    margin: 'auto',
    width:'100%',
    [theme.breakpoints.down(ResponsiveConstants.mobileBreakpoint)]: {
      boxShadow: "0px 0px 0px 0px"
    },
    [theme.breakpoints.up(ResponsiveConstants.mobileBreakpoint)]: {
      "max-width": 450
    }
  }
}));

function ResponsiveCard(props) {
  const classes = props.classes;
  const { children } = props;
  return <Card className={classes.root}>{children}</Card>;
}

export default withStyles(styleSheet)(ResponsiveCard);
