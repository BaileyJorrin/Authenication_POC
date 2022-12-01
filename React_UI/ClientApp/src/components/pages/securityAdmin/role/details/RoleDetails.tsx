import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { format } from "date-fns";
import { Role } from "../../../../../models/entities/Role";

interface RoleDetailsProps {
  id: string;
  role: Role | undefined;
  severity: string;
  onDetailsChange: (role: Role) => void;
  resetSeverity: () => void;
}

const RoleDetails = (props: RoleDetailsProps) => {

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.severity !== "" && e.target.name === "name") {
      props.resetSeverity();
    }

    props.onDetailsChange({ ...props.role!, [e.target.name]: e.target.value });
  };

  const handleStatusToggle = (e: any) => {
    props.onDetailsChange({ ...props.role!, isActive: !props.role?.isActive });
  };

  return (
    <>
      <FormControl className="grid2x2">
        <FormGroup className="boxAndLabel" style={{ rowGap: "0rem", marginBottom: "-13px" }}>
          <FormLabel>Name</FormLabel>
          <TextField
            error={
              (!props.role?.name && props.severity === "warning") || props.severity === "error"
            }
            fullWidth
            id="role-name"
            label="Name"
            name="name"
            onChange={handleTextFieldChange}
            required
            sx={{ width: "70%", marginLeft: "49px" }}
            value={props.role?.name}
          />
        </FormGroup>

        <FormGroup className="boxAndLabel">
          <FormLabel>Description</FormLabel>
          <TextField
            multiline={true}
            rows={3}
            fullWidth
            id="role-description"
            label="Description"
            name="description"
            onChange={handleTextFieldChange}
            sx={{ width: "70%", marginLeft: "12px" }}
            value={props.role?.description}
            size="medium"
          />
        </FormGroup>

        <FormGroup className="boxAndLabel">
          <FormLabel>Status</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={props.role?.isActive}
                onClick={handleStatusToggle}
              />
            }
            label="Active"
            sx={{ marginTop: "20px", marginLeft: "40px", marginBottom: "30px" }}
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
              sx={{ width: "50%", marginLeft: "6px" }}
              value={format(new Date(props.role!.createDateTime), "MM/dd/yyyy")}
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
              sx={{ width: "50%" }}
              value={format(new Date(props.role!.updateDateTime), "MM/dd/yyyy")}
            ></TextField>
          </FormGroup>
        </LocalizationProvider>
      </FormControl>
    </>
  );
};

export default RoleDetails;