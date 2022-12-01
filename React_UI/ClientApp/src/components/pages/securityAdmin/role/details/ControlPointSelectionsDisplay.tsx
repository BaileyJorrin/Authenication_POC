import { Backdrop, Box, Button, Checkbox, Fade, FormControlLabel, FormGroup, Modal } from "@mui/material";
import { DataResult, State, process } from "@progress/kendo-data-query";
import { Grid, GridCellProps, GridColumn as Column } from "@progress/kendo-react-grid";
import * as React from "react";
import { FunctionalAbility } from "../../../../../models/entities/FunctionalAbility";
import { useAppDispatch } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import { DataLoader } from "../../functionalAbility/details/DataLoader";
import { ModalProps } from "./FunctionalAbilitySelections";
import "./modalStyles.scss";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 600,
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  paddingBottom: "0px",
};

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
  return <></>;
};

interface DisplayProps {
  modalProps: ModalProps;
  close: () => void;
}

export const ControlPointSelectionsDisplay = (props: DisplayProps) => {
  const dispatch = useAppDispatch();

  const [functionalAbilityControlPoints, setFunctionalAbilityControlPoints] = React.useState<DataResult>({ data: [], total: 10 });
  const [dataState, setDataState] = React.useState<State>({ sort: [{ field: "friendlyName", dir: "asc" }] });

  const gridWidth = 900;
  const setPercentage = (percentage: number) => {
    return Math.round(gridWidth / 100) * percentage;
  };

  const dataReceived = (functionalAbility: FunctionalAbility) => {
    const assignedFACPs = functionalAbility.functionalAbilityControlPoints.filter(
      cp => cp.canAddUpdate === true || cp.canDelete === true || cp.canExecute === true || cp.canView === true,
    );
    setFunctionalAbilityControlPoints({ data: assignedFACPs, total: assignedFACPs.length });
  };

  const [dataLoadError, setDataLoadError] = React.useState<boolean>(false);
  const dataLoaderError = () => {
    setDataLoadError(true);
    dispatch(pushToast("Error Fetching Data, please refresh and try again.", "warning"));
  };

  const CheckboxCell = (gridProps: GridCellProps) => {
    return (
      <td>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox disabled name={gridProps.field} checked={gridProps.dataItem[gridProps.field!]} />
            }
            label={setDisplayName(gridProps.field)}/>
        </FormGroup>
      </td>
    );
  };

  return (
    <Modal
      open={props.modalProps.isOpen}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.modalProps.isOpen}>
        <Box sx={style}>
          <h3 id="modal-modal-title" style={{ fontWeight: "lighter", marginLeft: "5px" }}>{props.modalProps.name} - Control Points</h3>
          {/* @ts-ignore */}
          <Grid
            filterable={false}
            sortable={false}
            {...dataState}
            data={process(functionalAbilityControlPoints.data, dataState)}
            className={"hideHeaderCells"}
            scrollable={"scrollable"}
            style={{ height: "400px" }}
          >
            <Column
              width={setPercentage(25)}
              headerCell={EmptyHeaderCell}
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
              editable={false}
            />
            <Column
              field="canAddUpdate"
              headerCell={EmptyHeaderCell}
              cell={CheckboxCell}
              filterable={false}
              sortable={false}
              editable={false}
            />
            <Column
              field="canDelete"
              headerCell={EmptyHeaderCell}
              cell={CheckboxCell}
              filterable={false}
              sortable={false}
              editable={false}
            />
            <Column
              field="canExecute"
              title="Execute"
              headerCell={EmptyHeaderCell}
              cell={CheckboxCell}
              filterable={false}
              sortable={false}
              editable={false}
            />
          </Grid>
          <Button
            variant="contained"
            color="info"
            style={{ minWidth: "150px", float: "right", marginTop: "30px", width: "200px", height: "50px", fontSize: "20px" }}
            onClick={props.close}
          >
            Close
          </Button>
          {!dataLoadError && <DataLoader id={props.modalProps.id!} onDataReceived={dataReceived} onError={dataLoaderError} />}
        </Box>
      </Fade>
    </Modal>
  );
};