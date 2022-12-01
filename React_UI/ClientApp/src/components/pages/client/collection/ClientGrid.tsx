//Core
import { State } from "@progress/kendo-data-query";
import {
  GridColumn,
  GridDataStateChangeEvent,
  GridRowClickEvent,
} from "@progress/kendo-react-grid";
import { useHistory } from "react-router-dom";
import ClientApi from "../../../../apis/implementations/ClientApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

//Components
//import AddButton from "./AddButton";
import { ScreenControlPoints } from "../../../common/enumerations/ScreenControlPoints";
import SecuredAddButton from "../../../common/forms/buttons/AddButton";
import DataGrid from "../../../common/forms/grids/DataGrid";
import { isActiveCell } from "../../../common/helpers/isActiveHelper";
import { update, selectGrid } from "../../../common/reduxSlices/gridSlice";
import { pushToast } from "../../../common/reduxSlices/toastSlice";
import { resetClientToSave } from "../reduxSlices/clientsSlice";
import CustomEditDeleteCell from "./ClientEditDeleteCell";

//Third Party Components


const ClientGrid = () => {

  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectGrid);

  const history = useHistory();

  const createDataState = (dataState: State) => {
    return {
      dataState: dataState,
    };
  };

  const createAddButton = () => {
    return SecuredAddButton({ title: "Add Client", link: "clients/client-details", controlPoint: ScreenControlPoints.Client, handleOnClick: () => dispatch(resetClientToSave()) });
  };

  const handleDataStateChange = (event: GridDataStateChangeEvent) => {
    const updatedState = createDataState(event.dataState);
    dispatch(update(updatedState)); //Call to Redux
  };

  const dataLoaderError = () => {
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  return (
    <DataGrid
      handleDataStateChange={handleDataStateChange}
      dataSource={new ClientApi().loadGrid()}
      handleDataLoaderError={dataLoaderError}
      gridDataState={grid.dataState}
      onRowClick={(e:GridRowClickEvent) => (history.push(`clients/client-details/${e.dataItem.id}`))}
    >

      <GridColumn field="name" title="Client Name" />
      <GridColumn field="clientPrefix" title="Client Prefix"/>
      <GridColumn
        field="isActive"
        title="Status"
        filter="boolean"
        cell={isActiveCell}
      />
      <GridColumn
        field="createDateTime"
        title="Created Date"
        filter="date"
        format="{0:d}"
      />
      <GridColumn
        field="updateDateTime"
        title="Updated Date"
        filter="date"
        format="{0:d}"
      />
      <GridColumn
        filterable={false}
        cell={CustomEditDeleteCell}
        headerCell={createAddButton}
        width="240px"
      />

    </DataGrid>
  );
};

export default ClientGrid;
