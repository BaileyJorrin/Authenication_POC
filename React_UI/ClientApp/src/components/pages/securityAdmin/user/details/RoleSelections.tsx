import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { DataResult, State, process } from "@progress/kendo-data-query";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import * as React from "react";
import { FunctionalAbilitySelectionsDisplay } from "./FunctionalAbilitySelectionsDisplay";

interface RoleProps {
  id: string;
  userRoles: DataResult;
  onUserRolesChange: (userRoles: DataResult) => void;
}

export interface ModalProps {
  isOpen: boolean;
  id: string | undefined;
  name: string | undefined;
  functionalAbilities: DataResult;
}

const RoleSelections = (props: RoleProps) => {
  const [dataState, setDataState] = React.useState<State>({
    sort: [{ field: "name", dir: "asc" }],
  });
  const [changes, setChanges] = React.useState<boolean>(false);

  const [functionalAbilities, setFunctionalAbilities] =
    React.useState<DataResult>({ data: [], total: 10 });

  const [modalProps, setModalProps] = React.useState<ModalProps>({
    isOpen: false,
    id: undefined,
    name: undefined,
    functionalAbilities,
  });

  const onDetailClick = (detailProps: {
    id: string;
    name: string;
    functionalAbilities: Array<any>;
  }) => {
    setFunctionalAbilities({
      data: detailProps.functionalAbilities,
      total: detailProps.functionalAbilities.length,
    });
    setModalProps({
      isOpen: true,
      id: detailProps.id,
      name: detailProps.name,
      functionalAbilities: {
        data: detailProps.functionalAbilities,
        total: detailProps.functionalAbilities.length,
      },
    });
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
            onClick={() => {
              onDetailClick({
                id: gridProps.dataItem.id,
                name: gridProps.dataItem.name,
                functionalAbilities: gridProps.dataItem.functionalAbilities,
              });
            }}
          >
            Details
          </Button>
        </div>
      </td>
    );
  };

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  const gridWidth = 900;
  const setPercentage = (percentage: number) => {
    return Math.round(gridWidth / 100) * percentage;
  };

  const setData = (change: any) => {
    const roles = [...props.userRoles.data];
    const index = roles.findIndex((x) => x.id === change.id);
    roles[index] = { ...roles[index], isAssociatedWithUser: change.value };
    props.onUserRolesChange({ data: [...roles], total: roles.length });
  };

  const CheckboxCell = (checkProps: GridCellProps) => {
    const toggleRole = (e: any) => {
      setData({
        id: checkProps.dataItem.id,
        field: checkProps.field!,
        value: !checkProps.dataItem.isAssociatedWithUser,
      });
    };

    return (
      <td>
        <FormGroup>
          <FormControlLabel
            label={checkProps.dataItem.name}
            control={
              <Checkbox
                name="name"
                onChange={toggleRole}
                checked={checkProps.dataItem.isAssociatedWithUser}
              />
            }
          />
        </FormGroup>
      </td>
    );
  };

  return (
    <>
      <h2 style={{ fontWeight: "lighter", marginLeft: "5px" }}>Select Roles</h2>
      {/* @ts-ignore */}
      <Grid
        filterable={true}
        sortable={true}
        scrollable={"scrollable"}
        {...dataState}
        data={process(props.userRoles!.data, dataState)}
        onDataStateChange={dataStateChange}
        style={{ width: gridWidth, marginLeft: "15px", height: "415px" }}
      >
        <Column
          width={setPercentage(80)}
          field="name"
          title="Role Name"
          cell={CheckboxCell}
          editable={false}
        />
        <Column cell={DetailButtonCell} filterable={false} sortable={false} />
      </Grid>

      <FunctionalAbilitySelectionsDisplay
        modalProps={modalProps}
        close={() =>
          setModalProps({
            isOpen: false,
            id: undefined,
            name: undefined,
            functionalAbilities: { data: [], total: 10 },
          })
        }
      />
    </>
  );
};

export default RoleSelections;
