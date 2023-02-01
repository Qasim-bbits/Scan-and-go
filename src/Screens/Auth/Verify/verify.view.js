import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import bgimg from "../../../assets/icons/tick.png";
import goclogo from "../../../assets/images/Backgrounds/receipt_top.png";
import tick from "../../../assets/icons/blue_tick.png";
import wave from "../../../assets/images/Backgrounds/receipt_bottom.png";
import { router } from "../../../Routes/routhPaths";
import { useNavigate } from "react-router-dom";

const styles = {
  paperContainer: {
    backgroundImage: `url(${bgimg})`,
    backgroundPosition: "50% 40%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "300px",
  },
};

const Verified = () => {
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
              window.innerWidth > 700 ? "700px !important" : "94vh !important",
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
                color: "#042e6d",
              }}
            >
              YOUR ACCOUNT HAS BEEN{" "}
              <span style={{ color: "green" }}>VERIFIED</span>
            </h3>
            <p
              style={{
                margin: window.innerWidth > 700 ? "25px 130px" : "25px 30px",
                lineHeight: "1.5",
                color: "#042e6d",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              CONGRATULATION! YOUR NEW ACCOUNT HAS BEEN{" "}
              <span style={{ color: "green" }}>VERIFIED</span> SUCCESSFULLY
            </p>
          </div>
          <h3
            style={{
              margin: "0px",
              color: "#042e6d",
              textAlign: "center",
            }}
          >
            PLEASE <span style={{ color: "green", cursor:'pointer'}} onClick={()=>navigate(router.login)}>
              SIGN IN 
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

export default Verified;
