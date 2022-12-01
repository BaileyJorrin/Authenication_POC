import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  toggleIsOpen,
  selectToastOpenState,
  selectToastSeverity,
  selectToastMessage,
  setToastClose,
} from "../reduxSlices/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectToastOpenState);
  const severity = useAppSelector(selectToastSeverity);
  const message = useAppSelector(selectToastMessage);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      dispatch(setToastClose());
      return;
    }

    dispatch(setToastClose());
  };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionProps={{}}
        sx={{
          marginTop: "50px",
          width: "50%",
          display: "inline",
          p: 2,
        }}
      >
        <Alert severity={severity} color={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
