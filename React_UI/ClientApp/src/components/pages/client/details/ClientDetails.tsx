// //Core
// import { useMsal } from "@azure/msal-react";
// import {
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   FormLabel,
//   TextField,
//   FormControl,
// } from "@mui/material/";
// import { format } from "date-fns";
// import React, { useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";

// //Store
// import { Form } from "reactstrap";
// import { IdParameter } from "../../../../models/parameters/idParameter";
// import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
// import { ScreenControlPoints } from "../../../common/enumerations/ScreenControlPoints";
// import SecuredSaveCancelButton from "../../../common/forms/buttons/SaveCancelButton";
// import { pushToast, selectToastSeverity } from "../../../common/reduxSlices/toastSlice";
// import {
//   addClient,
//   createClient,
//   getClientById,
//   getDetailsClientById,
//   resetClientToSave,
//   selectClient,
//   selectDetailsClient,
//   updateClient,
//   updateCreatedByUserName,
//   updateNameProperty,
//   updatePrefixProperty,
//   updateStatusProperty,
// } from "../reduxSlices/clientsSlice";

//Third Party

//Style
import "./client-details.scss";

// Models
import { selectCanAdd } from "../../../common/reduxSlices/permissionSlice";

const ClientDetails = () => {
  const { id } = useParams<IdParameter>();
  const history = useHistory();

  /* MSAL Username Stuff*/
  const { accounts } = useMsal();
  const userName = accounts[0] && accounts[0].username;

  /* REDUX STATE MANAGEMENT */
  const dispatch = useAppDispatch();
  const client = useAppSelector(selectDetailsClient);
  const severity = useAppSelector(selectToastSeverity);
  const selectedClient = useAppSelector(selectClient);
  const canEdit = (): boolean => {
    return useAppSelector(state => selectCanAdd(state, ScreenControlPoints.Client));
  };


  useEffect(() => {
    //If Adding
    if (id === undefined) {
      dispatch(createClient);
      dispatch(updateCreatedByUserName(client, userName));
    } else {
      dispatch(getDetailsClientById(id));
      dispatch(getClientById(id));
    }
  }, [id]);

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();

    if (/^ *$/.test(client.name)) {
      dispatch(pushToast("Failure: Please Enter a Client Name", "warning"));
      return;
    }

    if (/^ *$/.test(client.clientPrefix)) {
      dispatch(pushToast("Failure: Please Enter a Client Prefix", "warning"));
      return;
    }

    let response: any;

    if (id === undefined) {
      response = await dispatch(addClient(client));
    } else {
      response = await dispatch(updateClient({ client, userName }));
    }

    try {
      //IF SUCCESSFUL
      if (((await response.payload) == "Success") == true) {
        dispatch(pushToast("Client Saved Successfully", "success"));
        history.goBack();
      } else {
        throw response.payload;
      }
    } catch (e: any) {
      if (typeof e === "string") {dispatch(pushToast(e, "error"));} else {dispatch(pushToast("Something Went Wrong", "error"));}
    }
  };

  const handleCancel = () => {
    history.goBack();
    dispatch(resetClientToSave());
  };


  return (
    <>
      <Form onSubmit={handleSubmit} id="clientForm">
        <FormControl
          style={{
            minHeight: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
          className="grid2x2"
        >
          {/* Client Name */}
          <FormGroup className="buttonGroup">
            <FormLabel>Client Name</FormLabel>
            <TextField
              fullWidth
              disabled={!canEdit()}
              error={severity=="warning" || severity =="error"}
              variant="outlined"
              label="Client Name"
              id="client-name"
              name="name"
              sx={{ width: "40%" }}
              value={client.name}
              onChange={(e) => dispatch(updateNameProperty(e))}
            ></TextField>
          </FormGroup>

          {/* Create Date */}
          <FormGroup className="buttonGroup">
            <FormLabel>Created Date</FormLabel>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              label="Created Date"
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "40%", paddingLeft: "5px" }}
              value={format(new Date(client.createDateTime), "MM/dd/yyyy")}
            ></TextField>
          </FormGroup>

          {/* Client Prefix */}
          <FormGroup className="buttonGroup">
            <FormLabel>Client Prefix</FormLabel>
            <TextField
              fullWidth
              disabled={!canEdit()}
              error={severity=="warning" || severity =="error"}
              variant="outlined"
              label="Client Prefix"
              id="client-prefix"
              name="client-prefix"
              sx={{ width: "40%" }}
              value={client.clientPrefix}
              inputProps={{ maxLength: 4 }}
              onChange={(e) => dispatch(updatePrefixProperty(e))}
            ></TextField>
          </FormGroup>

          {/* Updated Date */}
          <FormGroup className="buttonGroup">
            <FormLabel>Updated Date</FormLabel>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              label="Updated Date"
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "40%", paddingRight: "5px" }}
              value={format(new Date(client.updateDateTime), "MM/dd/yyyy")}
            ></TextField>
          </FormGroup>


          {/* Client Status */}
          <FormGroup className="buttonGroup">
            <FormLabel> Client Status </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!canEdit()}
                  checked={client.isActive}
                  onClick={() => dispatch(updateStatusProperty(client))}
                />
              }
              label="Active"
            />
          </FormGroup>

        </FormControl>

        <hr />

        <SecuredSaveCancelButton
          isSaveDisabled = {(client.name == selectedClient?.name && client.isActive == selectedClient?.isActive && client.clientPrefix == selectedClient?.clientPrefix) ? true: false}
          onCancel={handleCancel}
          controlPoint= {ScreenControlPoints.Client }
          onSave={() => {
            const element: HTMLElement | null = document.getElementById("clientForm");

            if (element instanceof HTMLFormElement) {
              element.submit();
            }
          }}
          cancelText= "Cancel"
          backText="Back"
        />
      </Form>
    </>
  );
};

export default ClientDetails;
