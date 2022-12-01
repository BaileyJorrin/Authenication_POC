import { useMsal } from "@azure/msal-react";
import { AccountCircle, Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setAuthenticatedUser } from "../common/reduxSlices/AuthenicatedUserSlice";


export function HeaderAccount() {
  const dispatch = useAppDispatch();

  const { accounts, instance } = useMsal();
  const name = accounts[0] && accounts[0].name;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (accounts[0]) {
      const logoutRequest = {
        account: instance.getAccountByHomeId(accounts[0].homeAccountId),
        mainWindowRedirectUri: process.env.REACT_APP_URL_STRING,
        postLogoutRedirectUri: process.env.REACT_APP_URL_STRING,
      };
      //@ts-ignore
      await instance.logoutPopup(logoutRequest);
      return;
    }

    dispatch(setAuthenticatedUser(null));
    sessionStorage.removeItem("idToken");
    useHistory().push("/login");
  };

  return (
    <React.Fragment>

      <Box sx={{ mr: 2 }} alignItems="center">
        <Button size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}>

          <Typography sx={{ fontSize: 20 }}>{name}</Typography>

          <AccountCircle fontSize="large" sx={{ ml: 2 }} />

        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            "overflow": "visible",
            "filter": "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "mt": 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 23,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={() => handleLogout( )}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
}