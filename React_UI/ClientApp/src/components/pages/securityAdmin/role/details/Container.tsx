import { Grid } from "@mui/material";
import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import RoleApi from "../../../../../apis/implementations/RoleApi";
import IRoleApi from "../../../../../apis/interfaces/IRoleApi";
import { Role } from "../../../../../models/entities/Role";
import { createNewRole } from "../../../../../models/helpers/entityHelpers/roleHelper";
import { IdParameter } from "../../../../../models/parameters/idParameter";
import { useAppDispatch } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import Buttons from "./Buttons";
import { DataLoader } from "./DataLoader";
import FunctionalAbilitySelections from "./FunctionalAbilitySelections";
import RoleDetails from "./RoleDetails";

const Container = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<IdParameter>();
  const roleApi: IRoleApi = new RoleApi();

  const [role, setRole] = React.useState<Role>(createNewRole());
  const [initialStateRole, setInitialStateRole] = React.useState<Role>(createNewRole());

  const [roleFunctionalAbilities, setRoleFunctionalAbilities] = React.useState<DataResult>({ data: [], total: 10 });
  const [initialStateRFAs, setInitialStateRFAs] = React.useState<DataResult>({ data: [], total: 10 });

  const [severity, setSeverity] = React.useState<string>("");
  const [disableEditSave, setDisableEditSave] = React.useState<boolean>(id === undefined ? false : true);

  const dataReceived = (role: Role) => {
    setRole(role);
    setRoleFunctionalAbilities({ data: role.roleFunctionalAbilities, total: role.roleFunctionalAbilities.length });

    setInitialStateRole(role);
    setInitialStateRFAs({ data: role.roleFunctionalAbilities, total: role.roleFunctionalAbilities.length });

    setDisableEditSave(true);
  };

  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);
  const dataLoaderError = () => {
    setDataLoadError(true);
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  const createUpdateRole = async () => {
    let response: any;

    if (id === undefined) {
      response = await roleApi.addWithValidations({
        ...role,
        roleFunctionalAbilities: roleFunctionalAbilities.data
          .filter(rfa => rfa.selected === true),
      })
        .catch(() => {
          dispatch(pushToast("Something Went Wrong", "error"));
        });

      if (((await response.wasSuccessful) === true)) {
        dispatch(pushToast("Application Role Saved Successfully!", "success"));
        history.goBack();
      } else {
        dispatch(pushToast(response.statusMessages[0], "error"));
        setSeverity("error");
      }
    } else {
      response = await roleApi.updateWithValidations({
        ...role,
        roleFunctionalAbilities: roleFunctionalAbilities.data
          .filter(rfa => rfa.selected === true),
      })
        .catch(() => {
          dispatch(pushToast("Something Went Wrong", "error"));
        });

      if ((await response) == "Success") {
        dispatch(pushToast("Application Role Saved Successfully!", "success"));
        history.goBack();
      } else {
        dispatch(pushToast("Failure: Role Name Already Exists", "error"));
      }
    }
  };

  React.useEffect(() => {

    if ((JSON.stringify(role) !== JSON.stringify(initialStateRole)) || (JSON.stringify(roleFunctionalAbilities) !== JSON.stringify(initialStateRFAs))) {setDisableEditSave(false);} else {
      setDisableEditSave(true);
    }
  }, [role, roleFunctionalAbilities]);

  return (
    <section className="role-list">
      <h1 style={{ fontWeight: "lighter" }}>Role Details</h1>
      <hr />
      <Grid container>
        <Grid item xs={5} md={5} style={{ borderRight: "1px solid rgba(0,0,0,0.1)", paddingBottom: "100px" }}>
          <RoleDetails
            id={id}
            role={role}
            severity={severity}
            onDetailsChange={setRole}
            resetSeverity={() => setSeverity("")}
          />
        </Grid>
        <Grid item xs={7} md={7}>
          <FunctionalAbilitySelections
            id={id}
            roleFunctionalAbilities={roleFunctionalAbilities}
            onRoleFunctionalAbilitiesChange={setRoleFunctionalAbilities}
          />
        </Grid>
      </Grid>

      <Buttons
        nameField={role.name}
        disableEditSave={disableEditSave}
        warn={setSeverity}
        submit={createUpdateRole}
      />
      {!dataLoadError && <DataLoader id={id} onDataReceived={dataReceived} onError={dataLoaderError} />}
    </section>
  );
};

export default Container;