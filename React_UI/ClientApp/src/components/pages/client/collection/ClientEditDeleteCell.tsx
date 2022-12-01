//Core

//ThirdParty
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { useHistory } from "react-router-dom";

//Redux
import { useAppDispatch } from "../../../../redux/hooks";
import {
  pushToast,
  //ToastContent,
  ToastState,
} from "../../../common/reduxSlices/toastSlice";

// Styles
import "../details/client-details.scss";
import RequriesAuthorization from "../../../common/authorization/RequriesAuthorization";
import { PermissionList } from "../../../common/enumerations/Permissions";
import { ScreenControlPoints } from "../../../common/enumerations/ScreenControlPoints";
import { deleteClient } from "../reduxSlices/clientsSlice";

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

const ClientEditDeleteCell = (props: any) => {
  const { dataItem } = props;

  const dispatch = useAppDispatch();

  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let response;

    try {
      response = await dispatch(deleteClient(dataItem));

      //If Redux Informs us that the Call was Not Successful
      if (response.payload != "Success") {
        throw response.payload;
      }

      dispatch(pushToast("Client Successfully Deleted!", "success"));
      return response.payload;
    } catch (e: any) {
      if (typeof e === "string") {dispatch(pushToast(e, "error"));} else {dispatch(pushToast("Something Went Wrong", "error"));}
    }
  };

  return (
    <td className="k-command-cell">
      {/* DETAILS BUTTON */}
      <div className="flex">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid  k-grid-edit-command"
          style={{
            backgroundColor: "#699bc5",
            color: "white",
            borderColor: "#ebebeb",
          }}
          onClick={() => history.push(`clients/client-details/${dataItem.id}`)}
        >
          Details
        </button>

        {/* DELETE BUTTON */}
        <RequriesAuthorization controlPoint={ScreenControlPoints.Client} permission={PermissionList.CAN_DELETE} message="">
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
            style={{
              backgroundColor: "#646569",
              color: "white",
              borderColor: "#646569",
            }}
            onClick={handleOpen}
          >
            Delete
          </button>
        </RequriesAuthorization>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete Client {dataItem.name}?
          </Typography>

          <hr />

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="error"
              style={{ minWidth: "150px" }}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              color="info"
              style={{ minWidth: "150px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </td>
  );
};

export default ClientEditDeleteCell;
