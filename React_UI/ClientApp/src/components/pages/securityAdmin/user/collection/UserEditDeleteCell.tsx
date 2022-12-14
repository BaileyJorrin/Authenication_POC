// Core
import { useMsal } from "@azure/msal-react";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../../../../models/entities/User";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import { update, selectGrid } from "../reduxSlices/userGridSlice";

// CSS
import "../details/styles.scss";
import { getAllUsers } from "../reduxSlices/userSlice";

// Store
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserEditDeleteCell = (props: any) => {
  const { accounts } = useMsal();
  const userName = accounts[0] && accounts[0].username;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectGrid);
  const { dataItem } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <td className="k-command-cell">
      <div className="flex justify-content-xl-between">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid  k-grid-edit-command"
          style={{
            backgroundColor: "#699bc5",
            color: "white",
            borderColor: "#ebebeb",
            marginLeft: "10px",
          }}
          onClick={() => history.push(`users/users-details/${dataItem.id}`)}
        >
          Details
        </button>
      </div>

    </td>
  );
};

export default UserEditDeleteCell;
