/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataResult, State, process } from "@progress/kendo-data-query";
import { Grid, GridColumn as Column, GridDataStateChangeEvent } from "@progress/kendo-react-grid";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../../../redux/hooks";
import CustomDateCell from "../../../../common/helpers/CustomDateCell";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import AddButton from "./AddButton";
import CustomEditDeleteCell from "./CustomEditDeleteCell";
import { DataLoader } from "./DataLoader";

const FunctionalAbilityGrid = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dataState, setDataState] = React.useState<State>({ sort: [{ field: "name", dir: "asc" }] });
  const [functionalAbilities, setFunctionalAbilities] = React.useState<DataResult>({
    data: [],
    total: 10,
  });
  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  const dataReceived = (functionalAbilities: DataResult) => {
    setFunctionalAbilities(functionalAbilities);
  };

  const dataLoaderError = () => {
    setDataLoadError(true);
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  const removeDeletedRow = (dataItem: any) => {
    setFunctionalAbilities({ data: functionalAbilities.data.filter(x => x.id !== dataItem.id), total: functionalAbilities.total - 1 });
  };

  const FunctionalAbilityEditDeleteCell = (props: any) => (
    <CustomEditDeleteCell {...props} removeDeletedRow={removeDeletedRow} />
  );

  return (
    <div>
      {/* @ts-ignore */}
      <Grid
        filterable={true}
        sortable={{ mode: "multiple" }}
        onRowClick={(e:any) => (history.push(`functional-abilities/functional-abilities-details/${e.dataItem.id}`))}
        {...dataState}
        data={process(functionalAbilities.data, dataState)}
        onDataStateChange={dataStateChange}
      >
        <Column field="name" title="Name" />
        <Column
          cell={CustomDateCell}
          field="createDateTime"
          filter="date"
          title="Created Date"
        />
        <Column
          cell={CustomDateCell}
          field="updateDateTime"
          filter="date"
          title="Updated Date"
        />
        <Column
          cell={FunctionalAbilityEditDeleteCell}
          filterable={false}
          headerCell={AddButton}
          sortable={false}
          width="240px"
        />
      </Grid>
      {!dataLoadError && <DataLoader onError={dataLoaderError} onDataReceived={dataReceived} />}
    </div>
  );
};

export default FunctionalAbilityGrid;
