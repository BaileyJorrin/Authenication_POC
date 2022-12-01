//GeneralImports
import { State, DataResult, process } from "@progress/kendo-data-query";
import { Grid, GridDataStateChangeEvent, GridRowClickEvent } from "@progress/kendo-react-grid";
import React from "react";
import { DataLoader } from "./DataLoader";

interface DataGridProps {
  children: JSX.Element|JSX.Element[];
  handleDataStateChange: (e: GridDataStateChangeEvent) => void;
  handleDataLoaderError: () => void;
  onRowClick: (e:GridRowClickEvent) => void;
  gridDataState: State;
  dataSource: Promise<unknown>;
}

const DataGrid = (props:DataGridProps) => {

  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);
  const handleOnDataStateChange = (e: GridDataStateChangeEvent) => {
    if (props.handleDataStateChange != null) {
      props.handleDataStateChange(e);
    }
  };

  const [gridData, setGridData] = React.useState<DataResult>({
    data: [],
    total: 10,
  });

  const dataReceived = (gridDataResult: DataResult) => {
    setGridData(gridDataResult);
  };

  const dataLoaderError = () => {
    setDataLoadError(true);
    props.handleDataLoaderError();
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Grid
        filterable={true}
        sortable={{ mode: "multiple" }}
        onRowClick={(e:GridRowClickEvent) => (props.onRowClick(e))}
        {...props.gridDataState}
        data={process(gridData.data, props.gridDataState)}
        onDataStateChange={handleOnDataStateChange}
      >
        {props.children}
      </Grid>
      {!dataLoadError && <DataLoader dataApi={props.dataSource} onError={dataLoaderError} onDataReceived={dataReceived} />}
    </div>
  );

};


export default DataGrid;