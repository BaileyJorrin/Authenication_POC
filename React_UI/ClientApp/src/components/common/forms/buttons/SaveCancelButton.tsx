import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { Fragment } from "react";
import RequriesAuthorization from "../../authorization/RequriesAuthorization";
import { PermissionList } from "../../enumerations/Permissions";

export interface SaveCancelProps {
  controlPoint: string;
  isSaveDisabled: boolean;
  onSave: ()=>void;
  onCancel: ()=>void;
  cancelText?: string;
  backText?: string;
}

function SecuredSaveCancelButton(props: SaveCancelProps): JSX.Element {
  const backButton = () =>{
    return (
      <Button
        className="cancelButton"
        onClick={props.onCancel}
        sx={{
          maxWidth: "200px",
          minWidth: "180px",
          backgroundColor: "#646569",
          fontWeight: "Light",
        }}
        variant="contained"
      >
        {props.backText}
      </Button>);
  };
  return (
    <Stack spacing={2} direction="row">
      <RequriesAuthorization
        controlPoint={props.controlPoint}
        permission={PermissionList.CAN_ADD}
        message=""
        failureElement={backButton()}
      >
        <Fragment>
          <Button
            disabled={
              props.isSaveDisabled
            }
            onClick={props.onSave}
            variant="contained"
            sx={{
              maxWidth: "200px",

              minWidth: "180px",
              backgroundColor: "#7B9E6B",
              fontWeight: "Light",
            }}
          >
                    Save
          </Button>
          <Button
            className="cancelButton"
            onClick={props.onCancel}
            sx={{
              maxWidth: "200px",
              minWidth: "180px",
              backgroundColor: "#646569",
              fontWeight: "Light",
            }}
            variant="contained"
          >
            {props.cancelText}
          </Button>
        </Fragment>
      </ RequriesAuthorization>

    </Stack>
  );
}

export default SecuredSaveCancelButton;