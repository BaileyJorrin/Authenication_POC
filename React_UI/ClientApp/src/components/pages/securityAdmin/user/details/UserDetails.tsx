import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { format } from "date-fns";
import { User } from "../../../../../models/entities/User";

interface UserDetailsProps {
  id: string;
  user: User | undefined;
}

const UserDetails = (props: UserDetailsProps) => {
  return (
    <>
      <FormControl className="grid2x2">
        <FormGroup
          className="boxAndLabel"
          style={{ rowGap: "0rem", marginBottom: "-5px", marginTop: "0px" }}
        >
          <FormLabel>First Name</FormLabel>
          <TextField
            fullWidth
            id="user-first-name"
            label="FirstName"
            name="firstName"
            disabled
            required
            sx={{ width: "70%", marginLeft: "17px" }}
            value={props.user?.firstName}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormGroup>

        <FormGroup
          className="boxAndLabel"
          style={{ rowGap: "0rem", marginBottom: "0px" }}
        >
          <FormLabel>Last Name</FormLabel>
          <TextField
            fullWidth
            id="user-last-name"
            label="LastName"
            name="LastName"
            disabled
            required
            sx={{ width: "70%", marginLeft: "19px" }}
            value={props.user?.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormGroup>

        <FormGroup className="boxAndLabel">
          <FormLabel>Status</FormLabel>
          <FormControlLabel
            style={{ marginTop: "20px" }}
            label="Active"
            control={
              <Checkbox className="checkbox" disabled={true} checked={props.user?.isActive} />
            }

            sx={{ marginLeft: "40px", marginBottom: "30px" }}
          />
        </FormGroup>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormGroup className="boxAndLabel" style={{ marginBottom: "25px" }}>
            <FormLabel>Created Date</FormLabel>
            <TextField
              variant="outlined"
              disabled
              label="Created Date"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "50%", marginLeft: "3px", paddingRight: "0px" }}
              value={format(new Date(props.user!.createDateTime), "MM/dd/yyyy")}
            ></TextField>
          </FormGroup>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormGroup className="boxAndLabel">
            <FormLabel>Updated Date</FormLabel>
            <TextField
              variant="outlined"
              disabled
              label="Updated Date"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "50%", marginLeft: "-3px" }}
              value={format(new Date(props.user!.updateDateTime), "MM/dd/yyyy")}
            ></TextField>
          </FormGroup>
        </LocalizationProvider>
      </FormControl>
    </>
  );
};

export default UserDetails;
