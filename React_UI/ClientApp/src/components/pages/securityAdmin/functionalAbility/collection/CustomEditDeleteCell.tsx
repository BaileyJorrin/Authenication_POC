// Core
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// CSS
import "../details/styles.scss";

// Store
import FunctionalAbilityApi from "../../../../../apis/implementations/FunctionalAbilityApi";
import IFunctionalAbilityApi from "../../../../../apis/interfaces/IFunctionalAbilityApi";
import { useAppDispatch } from "../../../../../redux/hooks";

// Third Party
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";
import { composeSortDescriptors } from "@progress/kendo-data-query";

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

interface EditDeleteCellProps {
  dataItem: any;
  removeDeletedRow: (dataItem: any) => void;
}

const FunctionalAbilityEditDeleteCell = (props: EditDeleteCellProps) => {
  const { dataItem } = props;

  const dispatch = useAppDispatch();
  const history = useHistory();
  const functionalAbilityApi: IFunctionalAbilityApi = new FunctionalAbilityApi();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false), setError("");
  };

  const errorMessage = (
    <div>
      {error}
      <hr />
    </div>
  );

  const handleDelete = async (event: any) => {
    event.preventDefault();
    handleClose();

    try {
      const response = await functionalAbilityApi.deleteWithValidations(dataItem);

      if (response !== "Success") throw response;

      dispatch(pushToast("Functional Ability Successfully Deleted!", "success"));

      props.removeDeletedRow.call(undefined, dataItem);

      return response;
    } catch (e: any) {
      if (typeof e === "string") {
        dispatch(pushToast(e, "error"));
      } else {
        dispatch(pushToast("Something Went Wrong", "error"));
      }
    }

  };

  return (
    <td className="k-command-cell">
      <div className="flex">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid  k-grid-edit-command"
          style={{
            backgroundColor: "#699bc5",
            color: "white",
            borderColor: "#ebebeb",
          }}
          onClick={() =>
            history.push(`functional-abilities/functional-abilities-details/${dataItem.id}`)
          }
        >
          Details
        </button>

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
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {errorMessage}

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Are you sure you want to delete {dataItem.name}?
          </Typography>

          <hr />

          <form
            onSubmit={handleDelete}
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

export default FunctionalAbilityEditDeleteCell;
