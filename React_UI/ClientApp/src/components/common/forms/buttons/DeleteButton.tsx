import React from "react";

import RequriesAuthorization from "../../authorization/RequriesAuthorization";
import { PermissionList } from "../../enumerations/Permissions";

function SecuredDeleteButton(props: any): JSX.Element {
  return (
    <RequriesAuthorization controlPoint={props.controlPoint} permission={PermissionList.CAN_DELETE} message="">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        style={{
          backgroundColor: "#646569",
          color: "white",
          borderColor: "#646569",
        }}
        onClick={props.handleOpen}
      >
                Delete
      </button>
    </RequriesAuthorization>
  );
}

export default SecuredDeleteButton;