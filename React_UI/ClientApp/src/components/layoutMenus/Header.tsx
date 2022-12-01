
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import React from "react";


import { HeaderAccount } from "./HeaderAccount";
import HeaderBreadcrumbs from "./HeaderBreadCrumbs";

export const Header = (props:any) => {

  return (
    <>

      <AppBar color="primary" position="static">
        <Box maxWidth="x1" display="flex" justifyContent="space-between" sx={{ display: "flex", mb: .4, ml: 2 }} alignItems="center">

          <HeaderBreadcrumbs/>
          <HeaderAccount />

        </Box>
      </AppBar>
      {props.children}
    </>
  );

};