import {
  Home,
  Lock,
  Explore,
  Portrait,
  Group,
  Assessment,
  Person,
} from "@mui/icons-material/";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Collapse } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCanView } from "../common/reduxSlices/permissionSlice";
import { getAll } from "../pages/client/reduxSlices/clientsSlice";
import { getAllUsers } from "../pages/securityAdmin/user/reduxSlices/userSlice";
import Logo from "./Logo";

//Add to this for any additions to the sidebar.
const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home fontSize="large" sx={{ mr: 2 }} />,
    permission: "MENU_Dashboard",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: <Assessment fontSize="large" sx={{ mr: 2 }} />,
    permission: "MENU_Client",
    loadGrid: getAll(),
  },
  //Everything Below is Security Admin Tabs
  {
    title: "Security Admin",
    icon: <Lock fontSize="large" sx={{ mr: 2 }} />,
    items: [
      {
        title: "Control Points",
        href: "/control-points",
        icon: <Explore fontSize="large" sx={{ mr: 2 }} />,
      },
      {
        title: "Functional Abilities",
        href: "/functional-abilities",
        icon: <Portrait fontSize="large" sx={{ mr: 2 }} />,
      },
      {
        title: "Roles",
        href: "/roles",
        icon: <Group fontSize="large" sx={{ mr: 2 }} />,
      },
      {
        title: "Users",
        href: "/users",
        icon: <Person fontSize="large" sx={{ mr: 2 }} />,
        loadGrid: getAllUsers(),
      },
    ],
  },
];

export function Sidebar() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [expandSecurity, setExpandSecurity] = useState(false);
  let securityAdminPermission = useAppSelector(state => selectCanView(state, "MENU_Security_Admin"));

  return (
    //SideBar Sizing
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#004976",
          color: "#fafafa",
        },
      }}
      sx={{
        "flexShrink": 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Kingsmen Logo */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Logo />
      </Toolbar>

      <Divider/>

      {/* Sidebar Content */}
      <List className="sidenav-bg">
        {React.Children.toArray(
          navigation.map((item, index) =>

            !item.items ? (

              <ListItem
                key={index}
                hidden={!(useAppSelector(state => selectCanView(state, item.permission)))}
                disablePadding >
                <ListItemButton
                  sx={{ mb: 2 }}
                  onClick={() => {
                    history.push(item.href);

                    if (item.loadGrid != undefined) {dispatch((item.loadGrid));}
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.title}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem
                  disablePadding
                  hidden={!securityAdminPermission}
                  onClick={() => setExpandSecurity(!expandSecurity)}
                >
                  <ListItemButton sx={{ mb: 2 }}>
                    {item.icon}
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>

                {/* Everything Nested */}
                <Collapse isOpen={expandSecurity}>
                  <Divider sx={{ mb: 2, background: "white" }} />
                  {React.Children.toArray(
                    item.items.map((child) => (
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ mb: 2 }}
                          onClick={() => {
                            history.push(child.href);
                            if (child.loadGrid != undefined) {dispatch((child.loadGrid));}
                          }}
                        >
                          {child.icon}
                          <ListItemText primary={child.title} />
                          <Link to={!child.href ? "404" : child.href} />
                        </ListItemButton>
                      </ListItem>
                    )),
                  )}
                  <Divider sx={{ mb: 2, background: "white" }} />
                </Collapse>
              </>
            ),
          ),
        )}
      </List>
    </Drawer>
  );
}
