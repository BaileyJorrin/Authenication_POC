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