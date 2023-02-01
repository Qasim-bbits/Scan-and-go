import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import bgimg from "../../../assets/icons/cross.png";
import goclogo from "../../../assets/images/Backgrounds/receipt_top.png";
import tick from "../../../assets/icons/red_cross.png";
import wave from "../../../assets/images/Backgrounds/receipt_bottom.png";
import { useNavigate } from "react-router-dom";
import { router } from "../../../Routes/routhPaths";

const styles = {
  paperContainer: {
    backgroundImage: `url(${bgimg})`,
    backgroundPosition: "50% 40%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "300px",
  },
};

const NotVerify = () => {
  let navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          overflow: "hidden",
          "& > :not(style)": {
            m: 1,
            width:
              window.innerWidth > 700 ? "600px !important" : "100vw !important",
            height:
              window.innerWidth > 700 ? "94vh !important" : "94vh !important",
          },
        }}
      >
        <Paper
          elevation={2}
          style={styles.paperContainer}
          sx={{
            width:
              window.innerWidth > 700 ? "50% !important" : "100% !important",
            position: "relative",
          }}
        >
          <img src={goclogo} alt="logo" style={{ width: "200px" }} />
          <div
            style={{
              textAlign: "center",
              height: "auto",
            }}
          >
            <img src={tick} alt="" style={{ width: "60px" }} />
            <h3
              style={{
                margin: "0px",
                color: "#990303",
              }}
            >
              ACCOUNT NOT VERIFIED
            </h3>
            <h3
              style={{
                margin: "30px 0px",
                color: "#042e6d",
              }}
            >
              TOKEN HAS BEEN <span style={{ color: "#990303" }}>EXPIRED</span>
            </h3>
          </div>
          <h3
            style={{
              margin: "0px",
              color: "#042e6d",
              textAlign: "center",
            }}
          >
            PLEASE <span style={{ color: "#990303", cursor:'pointer'}} onClick={()=>navigate(router.signUp)}>
              REGISTER AGAIN 
              </span> TO
            CONTINUE
          </h3>
          <img
            src={wave}
            alt="wave"
            style={{
              width: "100%",
              position:'absolute',
              bottom: 0
            }}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default NotVerify;
