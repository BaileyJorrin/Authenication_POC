import { AppBar, Typography } from "@mui/material";
import React from "react";
import { Navbar } from "reactstrap";
//@ts-ignore
import { ReactComponent as KSLogo } from "../../../assets/logos/ks_stacklogo_fordarkbg.svg";
import { LogIn } from "../../auth/index";


export const Landing = () => {
  return (
    <div>
      {/* Top Bar */}

      <AppBar
        color="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
        }}>

        <Typography variant="h1">
          Kingsmen Auth Demo
        </Typography>

      </AppBar>


      {/* Login Form */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "95vh",
        }}
      >
        {/* Login Component */}
        <LogIn />
      </div>

      {/* Bottom Bar */}
      <Navbar
        fixed="bottom"
        expand="md"
        style={{
          backgroundColor: "#004976",
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "172px",
        }}>

        <KSLogo style={{ position: "fixed", bottom: "10px", right: "50px", height: 149, width: 278 }} />

      </Navbar>

    </div>
  );
};
