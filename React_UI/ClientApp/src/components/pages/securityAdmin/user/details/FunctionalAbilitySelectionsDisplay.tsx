import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
} from "@mui/material";
import { State, process } from "@progress/kendo-data-query";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
} from "@progress/kendo-react-grid";
import * as React from "react";
import { useAppDispatch } from "../../../../../redux/hooks";

import { ControlPointSelectionsDisplay } from "./ControlPointSelectionsDisplay";
import { ModalProps } from "./RoleSelections";

import "./modalStyles.scss";
const style = {
  position: "absolute" as const,
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

const EmptyHeaderCell = () => {
  return <></>;
};

interface FunctionalAbilityProps {
  modalProps: ModalProps;
  close: () => void;
}

export interface ControlPointProps {
  isOpen: boolean;
  id: string | undefined;
  name: string | undefined;
}

export const FunctionalAbilitySelectionsDisplay = (
  props: FunctionalAbilityProps,
) => {
  const dispatch = useAppDispatch();

  const [dataState, setDataState] = React.useState<State>({
    sort: [{ field: "name", dir: "asc" }],
  });
  const [controlPointProps, setControlPointProps] =
    React.useState<ControlPointProps>({
      isOpen: false,
      id: undefined,
      name: undefined,
    });

  const gridWidth = 900;
  const setPercentage = (percentage: number) => {
    return Math.round(gridWidth / 100) * percentage;
  };

  const onDetailClick = (detailProps: { id: string; name: string }) => {
    setControlPointProps({ isOpen: true, id: detailProps.id, name: detailProps.name });
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
              width: "50%",
              marginTop: "5px",
              marginBottom: "5px",
              fontSize: "16px",
            }}
            onClick={() => {
              onDetailClick({
                id: gridProps.dataItem.id,
                name: gridProps.dataItem.name,
              });
            }}
          >
            Details
          </Button>
        </div>
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
      {/* @ts-ignore */}
      <Fade in={props.modalProps.isOpen}>
        <Box sx={style}>
          <h3
            id="modal-modal-title"
            style={{ fontWeight: "lighter", marginLeft: "5px" }}
          >
            {props.modalProps.name} - Functional Abilities
          </h3>
          {/* @ts-ignore */}
          <Grid
            filterable={false}
            sortable={false}
            {...dataState}
            data={process(props.modalProps.functionalAbilities.data, dataState)}
            className={"hideHeaderCells"}
            scrollable={"scrollable"}
            style={{ height: "400px" }}
          >
            <Column
              width={setPercentage(75)}
              headerCell={EmptyHeaderCell}
              field="name"
              title="Name"
              editable={false}
            />
            <Column
              cell={DetailButtonCell}
              filterable={false}
              sortable={false}
            />
          </Grid>
          <Button
            variant="contained"
            color="info"
            style={{
              minWidth: "150px",
              float: "right",
              marginTop: "30px",
              width: "200px",
              height: "50px",
              fontSize: "20px",
            }}
            onClick={props.close}
          >
            Close
          </Button>

          <ControlPointSelectionsDisplay
            modalProps={controlPointProps}
            close={() =>
              setControlPointProps({
                isOpen: false,
                id: undefined,
                name: undefined,
              })
            }
          />
        </Box>
      </Fade>
    </Modal>
  );
};
