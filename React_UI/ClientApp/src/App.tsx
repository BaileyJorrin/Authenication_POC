//Azure Auth
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
} from "@azure/msal-react";

//MaterialUI Theme Imports
import { CssBaseline, ThemeProvider } from "@mui/material";

// Core
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import RequiresAuthorization from "./components/common/authorization/RequriesAuthorization";
import { MenuControlPoints } from "./components/common/enumerations/MenuControlPoints";
import { PermissionList } from "./components/common/enumerations/Permissions";
import { ScreenControlPoints } from "./components/common/enumerations/ScreenControlPoints";
import Toast from "./components/common/helpers/Toast";
import { Landing } from "./components/layoutMenus/landing/Landing";
import { Layout } from "./components/layoutMenus/Layout";
import { ClientsContainer } from "./components/pages/client/collection/Container";
import ClientDetails from "./components/pages/client/details/Container";
import ControlPointsContainer from "./components/pages/securityAdmin/controlPoint/collection/Container";
import FunctionalAbilitiesContainer from "./components/pages/securityAdmin/functionalAbility/collection/Container";
import FunctionalAbilityDetails from "./components/pages/securityAdmin/functionalAbility/details/Container";
import RolesContainer from "./components/pages/securityAdmin/role/collection/Container";

// CSS
import "@progress/kendo-theme-default/dist/all.css";


import RoleDetails from "./components/pages/securityAdmin/role/details/Container";
import UsersContainer from "./components/pages/securityAdmin/user/collection/Container";
import UserDetails from "./components/pages/securityAdmin/user/details/Container";
import { AuthProvider } from "./context/authContext";
import { AuthenticatedUser } from "./models/dto/authenicatedUser";
import { useAppSelector } from "./redux/hooks";
import { theme } from "./styling/materialUi/kingsbookTheme";

export interface Authrops {
  message: string;
}

export const AuthLayout = (props:Authrops) => {
  return (
    <Layout>
      <Toast />

      <Route exact path="/clients" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Client} message={props.message} permission={PermissionList.CAN_VIEW} >
          <ClientsContainer />
        </RequiresAuthorization>
      </Route>

      <Route exact path="/clients/client-details" >
        <RequiresAuthorization controlPoint={ScreenControlPoints.Client} message={props.message} permission={PermissionList.CAN_VIEW} >
          <ClientDetails />
        </RequiresAuthorization>
      </Route>

      <Route exact path="/clients/client-details/:id" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Client} message={props.message} permission={PermissionList.CAN_VIEW} >
          <ClientDetails />
        </RequiresAuthorization>
      </Route>

      <Route exact path="/control-points">
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <ControlPointsContainer />
        </RequiresAuthorization>
      </Route>
      <Route exact path="/functional-abilities" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <FunctionalAbilitiesContainer />
        </RequiresAuthorization>
      </Route>
      <Route exact path="/functional-abilities/functional-abilities-details/:id" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <FunctionalAbilityDetails />
        </RequiresAuthorization>
      </Route>
      <Route exact path="/roles" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <RolesContainer />
        </RequiresAuthorization>
      </Route>
      <Route exact path="/roles/roles-details">
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <RoleDetails />
        </RequiresAuthorization>
      </Route>
      <Route exact path="/roles/roles-details/:id" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <RoleDetails />
        </RequiresAuthorization>
      </Route>

      <Route exact path="/users" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <UsersContainer />
        </RequiresAuthorization>
      </Route>

      <Route exact path="/users/users-details/:id" >
        <RequiresAuthorization controlPoint={MenuControlPoints.MENU_Security_Admin} message={props.message} permission={PermissionList.CAN_VIEW} >
          <UserDetails />
        </RequiresAuthorization>
      </Route>
    </Layout>
  );
};

export const UnAuthLayout = () => {
  return (
    <React.Fragment>
      <Route exact path='/landing'component={Landing}/>
      <Landing />
    </React.Fragment>
  );
};

export const App = () => {
  const authUser = useAppSelector((state) => state.authenticatedUser);
  const displayName = App.name;
  const msg = "You do not have permission to view this page";

  const isAuthenticated = (useIsAuthenticated())?true: (authUser.authenticatedUser != null);

  return (
    <>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuthenticated ? <AuthLayout message={msg}/> : <UnAuthLayout />}
        </ThemeProvider>
      </React.Fragment>
    </>
  );

};

export default App;