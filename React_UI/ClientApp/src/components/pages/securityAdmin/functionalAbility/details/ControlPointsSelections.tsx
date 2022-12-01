import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { DataResult, State, process } from "@progress/kendo-data-query";
import { Grid, GridCellProps, GridColumn as Column, GridDataStateChangeEvent } from "@progress/kendo-react-grid";
import * as React from "react";
import { useAppDispatch } from "../../../../../redux/hooks";

const setDisplayName = (selector: string | undefined) => {
  switch (selector) {
    case "canView":
      return "View";
    case "canAddUpdate":
      return "Add/Update";
    case "canDelete":
      return "Delete";
    case "canExecute":
      return "Execute";
    default:
      return "";
  }
};

const EmptyHeaderCell = () => {
  return <div></div>;
};

interface ControlPointSelectionsProps{
  id: string;
  functionalAbilityControlPoints: DataResult;
  onFunctionalAbilityControlPointsChange: (functionalAbilityControlPoints: DataResult) => void;
}

interface AbilityChangeProps{
  controlPoint_Id: string;
  field: string;
  value: boolean;
}

const ControlPointSelections = (props: ControlPointSelectionsProps) => {

  const [dataState, setDataState] = React.useState<State>({ sort: [{ field: "friendlyName", dir: "asc" }] });

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  const gridWidth = 900;
  const setPercentage = (percentage: number) => {
    return Math.round(gridWidth / 100) * percentage;
  };

  const setData = (change: AbilityChangeProps) => {
    const faCPs = [...props.functionalAbilityControlPoints!.data];
    const index = faCPs.findIndex(x => x.controlPoint_Id === change.controlPoint_Id);
    faCPs[index] = { ...faCPs[index], [change.field]: change.value };
    props.onFunctionalAbilityControlPointsChange({ data: [...faCPs], total: faCPs.length });
  };

  const CheckboxCell = (gridProps: GridCellProps) => {
    const flipAbility = (e: any) => {
      setData({ controlPoint_Id: gridProps.dataItem.controlPoint_Id, field: gridProps.field!, value: !gridProps.dataItem[gridProps.field!] });
    };

    return (
      <td>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name={gridProps.field}
              onChange={flipAbility}
              checked={gridProps.dataItem[gridProps.field!]} />}
            label={setDisplayName(gridProps.field)}/>
        </FormGroup>
      </td>
    );
  };

  return (
    <>
      <h2 style={{ fontWeight: "lighter", marginLeft: "5px" }}>Select Control Points</h2>
      {/*@ts-ignore*/}
      <Grid
        filterable={true}
        sortable={true}
        scrollable={"scrollable"}
        {...dataState}
        data={process(props.functionalAbilityControlPoints!.data, dataState)}
        onDataStateChange={dataStateChange}
        style={{ width: gridWidth, marginLeft: "15px", height: "415px" }}
      >
        <Column
          width={setPercentage(25)}
          field="friendlyName"
          title="Control Point Friendly Name"
          editable={false}
        />
        <Column
          field="canView"
          headerCell={EmptyHeaderCell}
          cell={CheckboxCell}
          filterable={false}
          sortable={false}
        />
        <Column
          field="canAddUpdate"
          headerCell={EmptyHeaderCell}
          cell={CheckboxCell}
          filterable={false}
          sortable={false}
        />
        <Column
          field="canDelete"
          headerCell={EmptyHeaderCell}
          cell={CheckboxCell}
          filterable={false}
          sortable={false}
        />
        <Column
          field="canExecute"
          title="Execute"
          headerCell={EmptyHeaderCell}
          cell={CheckboxCell}
          filterable={false}
          sortable={false}
        />
      </Grid>
    </>
  );
};

export default ControlPointSelections;