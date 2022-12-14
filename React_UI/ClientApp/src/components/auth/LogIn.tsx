import { useMsal } from "@azure/msal-react";
import { Divider, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import userAPI from "../../apis/implementations/UserApi";
import { loginRequest } from "../../authConfig";
import { useAppDispatch } from "../../redux/hooks";
import { setAuthenticatedUser } from "../common/reduxSlices/AuthenicatedUserSlice";
import { assignPermissions, assignRoles } from "../common/reduxSlices/permissionSlice";
// import { Button, Card, CardBody, CardTitle } from "reactstrap";

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */

export const LogIn = () => {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();

  function handleLogin() {
    instance.loginPopup(loginRequest).then((response:any) => {
      sessionStorage.setItem("idToken", response.idToken);
      populatePermissions(response.account.username);
      populateRoles(response.account.username);
    },
    )
      .catch((e:any) => {
        console.error(e);
      });
  }

  async function handleCustomerLogin() {
    const response = await fetch(
      `${process.env.REACT_APP_API_STRING}/api/users/authenticate`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          Username: "randy.costner@kingsmensoftware.com",
          Password: "Password",
        }), // body data type must match "Content-Type" header
      },
    );

    const data = await response.json();

    dispatch(setAuthenticatedUser(data));
    sessionStorage.setItem("idToken", data.token);
    populatePermissions(data.username);
    populateRoles(data.username);
  }

  function populatePermissions(userName: string) {
    const userApi: any = new userAPI();

    userApi.retrievePermissions(userName).then((response:any) => {
      dispatch(assignPermissions(response));
    }).catch((e:any) => {
      console.error(e);
    });

  }

  function populateRoles(userName: string) {
    const userApi: any = new userAPI();

    userApi.retrieveRoles(userName).then((response:any) => {
      dispatch(assignRoles(response));
    }).catch((e:any) => {
      console.error(e);
    });
  }

  return (

    <Paper variant= "outlined" style={{
      width: "500px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }} sx= {{ boxShadow: 3 }}>

      <Card variant="outlined" style={{
        backgroundColor: "#004976",
        display: "flex",
        flexWrap: "wrap",
        width: "500px",
        justifyContent: "center",
        marginBottom: "25px",
      }} sx={{ boxShadow: 3, borderRadius: 1 }}>

        <Typography sx={{ fontSize: 25, mt: "5px", color: "white" }} gutterBottom>
          Welcome to Auth Demo!

        </Typography>

        <Divider />

      </Card>

      <Typography variant="h5" component="div" sx={{ fontSize: 20, color: "#3b4754" }}>
          Please Login Below Using Azure Active Directory
      </Typography>

      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>

        <Button
          onClick={() => handleCustomerLogin()
          }
        >
          Customer Login
        </Button>

        <Button
          onClick={() => handleLogin()}
        >
            Login
        </Button>
      </CardActions>

    </Paper>

  );
};
