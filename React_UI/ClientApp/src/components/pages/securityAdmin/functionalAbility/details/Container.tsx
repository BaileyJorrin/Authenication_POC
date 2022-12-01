//Core

//Components

//Helpers

import { Grid } from "@mui/material";
import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import FunctionalAbilityApi from "../../../../../apis/implementations/FunctionalAbilityApi";
import IFunctionalAbilityApi from "../../../../../apis/interfaces/IFunctionalAbilityApi";
import { FunctionalAbility } from "../../../../../models/entities/FunctionalAbility";
import { createNewFunctionalAbility } from "../../../../../models/helpers/entityHelpers/functionalAbilityHelper";
import { IdParameter } from "../../../../../models/parameters/idParameter";
import { useAppDispatch } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import Buttons from "./Buttons";
import ControlPointSelections from "./ControlPointsSelections";
import { DataLoader } from "./DataLoader";
import FunctionalAbilityDetails from "./FunctionalAbilityDetails";

const Container = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<IdParameter>();
  const functionalAbilityApi: IFunctionalAbilityApi = new FunctionalAbilityApi();
  const history = useHistory();

  const [functionalAbility, setFunctionalAbility] = React.useState<FunctionalAbility>(createNewFunctionalAbility());
  const [initialStateFA, setInitialStateFA] = React.useState<FunctionalAbility>(createNewFunctionalAbility());

  const [functionalAbilityControlPoints, setFunctionalAbilityControlPoints] = React.useState<DataResult>({ data: [], total: 10 });
  const [initialStateFACPs, setInitialStateFACPs] = React.useState<DataResult>({ data: [], total: 10 });

  const [severity, setSeverity] = React.useState<string>("");
  const [disableEditSave, setDisableEditSave] = React.useState<boolean>(true);

  const dataReceived = (ability: FunctionalAbility) => {
    setFunctionalAbility(ability);
    setFunctionalAbilityControlPoints({
      data: ability.functionalAbilityControlPoints,
      total: ability.functionalAbilityControlPoints.length,
    });

    setInitialStateFA(ability);
    setInitialStateFACPs({ data: ability.functionalAbilityControlPoints, total: ability.functionalAbilityControlPoints.length });

    //needed b/c the useEffect is triggered before the intialState hooks finish updating
    setDisableEditSave(true);

  };

  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);

  const dataLoaderError = () => {
    setDataLoadError(true);
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  const createUpdateFunctionalAbility = async () => {
    let response: any;

    if (id === "new") {
      response = await functionalAbilityApi.addWithValidations({
        ...functionalAbility,
        functionalAbilityControlPoints: functionalAbilityControlPoints.data
          .filter(cp => cp.canAddUpdate === true
                    || cp.canDelete === true
                    || cp.canExecute === true
                    || cp.canView === true),
      })
        .catch(() => {
          dispatch(pushToast("Something Went Wrong", "error"));
          //throw response;
        });

      if (((await response.wasSuccessful) === true)) {
        dispatch(pushToast("Functional Ability Saved Successfully", "success"));
        history.goBack();
      } else {
        dispatch(pushToast(response.statusMessages[0], "error"));
        setSeverity("error");
      }
    } else {
      response = await functionalAbilityApi.updateWithValidations({
        ...functionalAbility,
        functionalAbilityControlPoints: functionalAbilityControlPoints.data
          .filter(cp => cp.canAddUpdate === true
                    || cp.canDelete === true
                    || cp.canExecute === true
                    || cp.canView === true),
      })
        .catch(() => {
          dispatch(pushToast("Something Went Wrong", "error"));
          //throw response;
        });
      if ((await response) == "Success") {
        dispatch(pushToast("Functional Ability Saved Successfully", "success"));
        history.goBack();
      } else {
        dispatch(pushToast("Failure: Functional Ability Name Already Exists", "error"));
      }
    }
  };

  React.useEffect(() => {

    setDisableEditSave(true);

    if ((JSON.stringify(functionalAbility) !== JSON.stringify(initialStateFA))
      || (JSON.stringify(functionalAbilityControlPoints) !== JSON.stringify(initialStateFACPs))) {setDisableEditSave(false);}

  }, [functionalAbility, functionalAbilityControlPoints]);

  return (
    <section className="functionalabilities-list">
      <h1 style={{ fontWeight: "lighter" }}>Functional Ability Details</h1>
      <hr />
      <Grid container>
        <Grid item xs={5} md={5} style={{ borderRight: "1px solid rgba(0,0,0, 0.1)", paddingBottom: "100px" }}>
          <FunctionalAbilityDetails
            id={id}
            functionalAbility={functionalAbility}
            severity={severity}
            onDetailsChange={setFunctionalAbility}
            resetSeverity={() => setSeverity("")}
          />
        </Grid>
        <Grid item xs={7} md={7}>
          <ControlPointSelections
            id={id}
            functionalAbilityControlPoints={functionalAbilityControlPoints}
            onFunctionalAbilityControlPointsChange={setFunctionalAbilityControlPoints}
          />
        </Grid>
      </Grid>
      <Buttons
        nameField={functionalAbility.name}
        disableEditSave={disableEditSave}
        warn={setSeverity}
        submit={createUpdateFunctionalAbility}
      />
      {!dataLoadError && <DataLoader id={id} onDataReceived={dataReceived} onError={dataLoaderError} />}
    </section>
  );
};

export default Container;