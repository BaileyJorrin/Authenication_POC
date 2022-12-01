import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, SelectChangeEvent, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { format } from "date-fns";
import { FunctionalAbility } from "../../../../../models/entities/FunctionalAbility";

// Styles
import "./styles.scss";

interface FunctionalAbilityDetailsProps {
  id: string;
  functionalAbility: FunctionalAbility | undefined;
  severity: string;
  onDetailsChange: (functionalAbility: FunctionalAbility) => void;
  resetSeverity: () => void;
}

const FunctionalAbilityDetails = (props: FunctionalAbilityDetailsProps) => {

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.severity !== "" && e.target.name === "name") {
      props.resetSeverity();
    }

    props.onDetailsChange({ ...props.functionalAbility!, [e.target.name]: e.target.value });
  };

  const handleStatusToggle = (e: any) => {
    props.onDetailsChange({ ...props.functionalAbility!, isActive: !props.functionalAbility?.isActive });
  };

  return (
    <>
      <FormControl className="grid2x2">
        <FormGroup className="boxAndLabel" style={{ rowGap: "0rem", marginBottom: "-13px" }}>
          <FormLabel>Name</FormLabel>
          <TextField
            error={
              (!props.functionalAbility?.name && props.severity === "warning") || props.severity === "error"
            }
            fullWidth
            id="functionalability-name"
            label="Name"
            name="name"
            onChange={handleTextFieldChange}
            required
            sx={{ width: "70%", marginLeft: "49px" }}
            value={props.functionalAbility?.name}
          />
        </FormGroup>

        <FormGroup className="boxAndLabel">
          <FormLabel>Description</FormLabel>
          <TextField
            multiline={true}
            rows={3}
            fullWidth
            id="functionalability-description"
            label="Description"
            name="description"
            onChange={handleTextFieldChange}
            sx={{ width: "70%", marginLeft: "12px" }}
            value={props.functionalAbility?.description}
            size="medium"
          />
        </FormGroup>

        <FormGroup className="boxAndLabel">
          <FormLabel>Status</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={props.functionalAbility?.isActive}
                onClick={handleStatusToggle}
              />
            }
            label="Active"
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
              sx={{ width: "50%", marginLeft: "6px" }}
              value={format(new Date(props.functionalAbility!.createDateTime), "MM/dd/yyyy")}
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
              value={format(new Date(props.functionalAbility!.updateDateTime), "MM/dd/yyyy")}
            ></TextField>
          </FormGroup>
        </LocalizationProvider>
      </FormControl>
    </>
  );
};

export default FunctionalAbilityDetails;