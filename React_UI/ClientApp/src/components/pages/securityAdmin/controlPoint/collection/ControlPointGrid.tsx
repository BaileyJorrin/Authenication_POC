/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataResult, State, process } from "@progress/kendo-data-query";
import { Grid, GridColumn as Column, GridDataStateChangeEvent } from "@progress/kendo-react-grid";
import * as React from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import { DataLoader } from "./DataLoader";

const ControlPointGrid = (controlPointData: any) => {
  const dispatch = useAppDispatch();

  const [dataState, setDataState] = React.useState<State>({ sort: [{ field: "friendlyName", dir: "asc" }] });
  const [controlPoints, setControlPoints] = React.useState<DataResult>({
    data: [],
    total: 10,
  });
  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  const dataReceived = (controlPoints: DataResult) => {
    setControlPoints(controlPoints);
  };

  const dataLoaderError = () => {
    setDataLoadError(true);
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Grid
        filterable={true}
        sortable={{ mode: "multiple" }}
        {...dataState}
        data={process(controlPoints.data, dataState)}
        onDataStateChange={dataStateChange}
      >
        <Column field="name" title="Control Point Name" />
        <Column field="friendlyName" title="Friendly Name" />
      </Grid>
      {!dataLoadError && <DataLoader onError={dataLoaderError} onDataReceived={dataReceived} />}
    </div>
  );
};

export default ControlPointGrid;
