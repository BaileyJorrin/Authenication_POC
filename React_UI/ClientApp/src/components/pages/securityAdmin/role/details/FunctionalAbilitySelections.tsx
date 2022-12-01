import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { DataResult, State, process } from "@progress/kendo-data-query";
import { Grid, GridCellProps, GridColumn as Column, GridDataStateChangeEvent } from "@progress/kendo-react-grid";
import * as React from "react";
import { ControlPointSelectionsDisplay } from "./ControlPointSelectionsDisplay";

interface FunctionalAbilitySelectionsProps {
  id: string;
  roleFunctionalAbilities: DataResult;
  onRoleFunctionalAbilitiesChange: (roleFunctionalAbilities: DataResult) => void;
}

export interface ModalProps {
  isOpen: boolean;
  id: string | undefined;
  name: string | undefined;
}

const FunctionalAbilitySelections = (props: FunctionalAbilitySelectionsProps) => {

  const [dataState, setDataState] = React.useState<State>({ sort: [{ field: "name", dir: "asc" }] });
  const [modalProps, setModalProps] = React.useState<ModalProps>({ isOpen: false, id: undefined, name: undefined });

  const onDetailClick = (detailProps: {id: string; name: string}) => {
    setModalProps({ isOpen: true, id: detailProps.id, name: detailProps.name });
  };

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  const gridWidth = 900;
  const setPercentage = (percentage: number) => {
    return Math.round(gridWidth / 100) * percentage;
  };

  const DetailButtonCell = (gridProps: GridCellProps) => {
    return (
      <td>
        <div className="flex">
          <Button
            className="k-button k-button-lg k-rounded-md k-button-solid k-grid-edit-command"
            style={{
              backgroundColor: "#699bc5",
              color: "white",
              borderColor: "#ebebeb",
              width: "70%",
              fontSize: "16px",
            }}
            onClick={() => {onDetailClick({ id: gridProps.dataItem.functionalAbility_Id, name: gridProps.dataItem.name });}}
          >
                        Details
          </Button>
        </div>
      </td>
    );
  };

  const setData = (change: any) => {
    const rFAs = [...props.roleFunctionalAbilities!.data];
    const index = rFAs.findIndex(x => x.functionalAbility_Id === change.functionalAbility_Id);
    rFAs[index] = { ...rFAs[index], selected: change.value };
    props.onRoleFunctionalAbilitiesChange({ data: [...rFAs], total: rFAs.length });
  };


  const CheckboxCell = (checkboxProps: GridCellProps) => {
    const flipAbility = (e: any) => {
      setData(
        {
          functionalAbility_Id: checkboxProps.dataItem.functionalAbility_Id,
          field: checkboxProps.field!,
          value: !checkboxProps.dataItem.selected,
        });
    };

    return (
      <td>
        <FormGroup>
          <FormControlLabel
            label={checkboxProps.dataItem.name}
            control={
              <Checkbox
                name={checkboxProps.field}
                onChange={flipAbility}
                checked={checkboxProps.dataItem.selected}
              />}
          />
        </FormGroup>
      </td>
    );
  };

  return (
    <>
      <h2 style={{ fontWeight: "lighter", marginLeft: "5px" }}>Select Functional Abilities</h2>
      {/* @ts-ignore */}
      <Grid
        filterable={true}
        sortable={true}
        scrollable={"scrollable"}
        {...dataState}
        data={process(props.roleFunctionalAbilities!.data, dataState)}
        onDataStateChange={dataStateChange}
        style={{ width: gridWidth, marginLeft: "15px", height: "415px" }}
      >
        <Column
          width={setPercentage(80)}
          field="name"
          title="Functional Ability Name"
          cell= {CheckboxCell}
          editable={false}
        />
        <Column
          cell={DetailButtonCell}
          filterable={false}
          sortable={false}
        />
      </Grid>

      <ControlPointSelectionsDisplay modalProps={modalProps} close={() => setModalProps({ isOpen: false, id: undefined, name: undefined })} />
    </>
  );
};

export default FunctionalAbilitySelections;