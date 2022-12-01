
//GeneralImports
import { GridColumn as Column, GridDataStateChangeEvent, GridRowClickEvent } from "@progress/kendo-react-grid";
import React from "react";
import { useHistory } from "react-router-dom";
import UserApi from "../../../../../apis/implementations/UserApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import DataGrid from "../../../../common/forms/grids/DataGrid";
//Store

//Helpers
import CustomDateCell from "../../../../common/helpers/CustomDateCell";
import { isActiveCell } from "../../../../common/helpers/isActiveHelper";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import { update, selectGrid } from "../reduxSlices/userGridSlice";
import UserEditCell from "./UserEditDeleteCell";


const UserGrid = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const grid = useAppSelector(selectGrid);

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    dispatch( update({ dataState: e.dataState }));
  };

  const dataLoaderError = () => {
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  return (
    <div>
      {/* @ts-ignore */}
      <DataGrid
        handleDataStateChange={dataStateChange}
        dataSource={new UserApi().loadGrid()}
        handleDataLoaderError={dataLoaderError}
        gridDataState={grid.dataState}
        onRowClick={(e:GridRowClickEvent) => {
          history.push(`users/users-details/${e.dataItem.id}`);
        }}
      >
        <Column field="firstName" title="First Name" />
        <Column field="lastName" title="Last Name" />
        <Column
          cell={isActiveCell}
          field="isActive"
          filter="boolean"
          title="Status" />

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
          cell={UserEditCell}
          filterable={false}
          sortable={false}
          width="240px"
        />
      </DataGrid>


    </div>
  );
};

export default UserGrid;
