import { Grid } from "@mui/material";
import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import UserApi from "../../../../../apis/implementations/UserApi";
import IUserApi from "../../../../../apis/interfaces/IUserApi";
import { User } from "../../../../../models/entities/User";
import { createNewUser } from "../../../../../models/helpers/entityHelpers/userHelper";
import { IdParameter } from "../../../../../models/parameters/idParameter";
import { useAppDispatch } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import { getAllUsers } from "../reduxSlices/userSlice";
import Buttons from "./Buttons";
import { DataLoader } from "./DataLoader";
import RoleSelections from "./RoleSelections";
import UserDetails from "./UserDetails";

const Container = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<IdParameter>();
  const userApi: IUserApi = new UserApi();

  const [user, setUser] = React.useState<User>(createNewUser());
  const [userRoles, setUserRoles] = React.useState<DataResult>({
    data: [],
    total: 10,
  });
  const [initialStateUserRoles, setInitialStateUserRoles] =
    React.useState<DataResult>({ data: [], total: 10 });

  const [severity, setSeverity] = React.useState<string>("");
  const [disableEditSave, setDisableEditSave] = React.useState<boolean>(true);

  const dataReceived = (userProps: User) => {
    setUser(userProps);
    setUserRoles({ data: userProps.roles, total: userProps.roles.length });
    setInitialStateUserRoles({ data: userProps.roles, total: userProps.roles.length });
    setDisableEditSave(true);
  };

  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);

  const dataLoaderError = () => {
    setDataLoadError(true);
    dispatch(
      pushToast("Error Fetching Data, please refresh and try again.", "warning"),
    );
  };

  //Call API
  const createUpdateUserRole = async () => {

    const response = await userApi
      .updateWithValidations({
        ...user,
        roles: userRoles.data.filter((ur) => ur.isAssociatedWithUser === true),
      })
      .catch(() => {
        dispatch(pushToast("Something Went Wrong", "error"));
      });

    if ((await response) == "Success") {
      dispatch(pushToast("User Saved Successfully!", "success"));
      dispatch(getAllUsers());
      history.goBack();
    } else {
      dispatch(pushToast("Failure: Something Went Wrong", "error"));
    }
  };

  React.useEffect(() => {
    if (JSON.stringify(userRoles) !== JSON.stringify(initialStateUserRoles)) {
      setDisableEditSave(false);
    } else {
      setDisableEditSave(true);
    }
  }, [userRoles]);

  return (
    <section className="user-list">
      <h1 style={{ fontWeight: "lighter" }}>User Details</h1>
      <hr />
      <Grid container>
        <Grid
          item
          xs={5}
          md={5}
          style={{
            borderRight: "1px solid rgba(0,0,0,0.1)",
            paddingBottom: "100px",
          }}
        >
          <UserDetails id={id} user={user} />
        </Grid>

        <Grid item xs={7} md={7}>
          <RoleSelections
            id={id}
            userRoles={userRoles}
            onUserRolesChange={setUserRoles}
          />
        </Grid>
      </Grid>

      <Buttons
        disableEditSave={disableEditSave}
        warn={setSeverity}
        submit={createUpdateUserRole}
      />

      {!dataLoadError && (
        <DataLoader
          id={id}
          onDataReceived={dataReceived}
          onError={dataLoaderError}
        />
      )}
    </section>
  );
};

export default Container;
