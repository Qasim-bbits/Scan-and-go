import * as React from "react";
import {Box, Autocomplete, IconButton} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";

export default function EditTicketIssued(props) {

  return (
    <div>
      <Drawer
        className="drawer-width"
        PaperProps={{
          sx: {
            backgroundColor: "#fff !important",
            width:
              window.innerWidth > 700
                ? "35% !important"
                : "100% !important",
          },
        }}
        anchor={'right'}
        open={props.openDrawer}
        onClose={props.setOpenDrawer}
      >
        <Box
          sx={{
            px: 3
          }}
        >
          <form onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="col-6 mt-3 align-self-center">
                <h5 style={{ color: "#2C3680"}}> Edit Plate</h5>              
              </div>
              <div className="col-6 mt-3 align-self-center text-end">
                <IconButton onClick={props.setOpenDrawer}>
                  <Close/>
                </IconButton>
              </div>
              <div className="col-md-12 mt-3">
                <TextField
                  id="standard-error-helper-text"
                  label="Plate"
                  color="secondary"
                  type="text"
                  name="plate"
                  value={props.inputField["plate"]}
                  onChange={props.handleChange}
                  size="small"
                  required
                  fullWidth
                />
              </div>
              <div className="col-md-12 text-end mt-3">
                <Button 
                  type="submit"
                  color="primary"
                  variant="contained">
                  Update
                </Button>
              </div>
            </div>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                color="secondary"
                label="Pick Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    color="secondary"
                    className="drawer-input-width"
                    style={{ width: "25vw" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>{" "}
            <br />
            <TextField
              color="secondary"
              className="drawer-input-width"
              style={{ margin: "30px 0px 0px 0px", width: "25vw" }}
              id="demo-helper-text-aligned"
              label="First Name"
            />{" "}
            <br />
            <TextField
              color="secondary"
              className="drawer-input-width"
              style={{ margin: "30px 0px 0px 0px", width: "25vw" }}
              id="demo-helper-text-aligned"
              label="Last Name"
            />{" "}
            <br />
            <TextField
              color="secondary"
              className="drawer-input-width"
              style={{ margin: "30px 0px 0px 0px", width: "25vw" }}
              id="demo-helper-text-aligned"
              label="UDID"
            />{" "}
            <br />
            <TextField
              color="secondary"
              className="drawer-input-width"
              style={{ margin: "30px 0px 30px 0px", width: "25vw" }}
              id="demo-helper-text-aligned"
              label="Position"
            />{" "}
            <br />
            <TextField
              color="secondary"
              className="drawer-input-width"
              style={{ width: "25vw" }}
              id="demo-helper-text-aligned"
              label="Working Hours"
            />{" "}
            <br />
            <Button
              color="secondary"
              sx={{ margin: "30px 0px" }}
              variant="contained"
            >
              Submit
            </Button> */}
          </form>
        </Box>
      </Drawer>
    </div>
  );
}
