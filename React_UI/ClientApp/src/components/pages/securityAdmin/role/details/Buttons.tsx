import { Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../../../redux/hooks";
import { pushToast } from "../../../../common/reduxSlices/toastSlice";

interface ButtonProps{
  nameField: string;
  disableEditSave: boolean;
  warn: (severity: string) => void;
  submit: () => void;
}

const Buttons = (props: ButtonProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSave = async () => {
    if (/^ *$/.test(props.nameField)) {
      dispatch(pushToast("Failure: Please Enter a Role Name", "warning"));
      props.warn("warning");
      return;
    }

    await props.submit();
  };

  return (
    <>
      <br />
      <hr style={{ marginTop: "20px" }} />
      <Stack spacing={2} direction="row">
        <Button
          onClick={handleSave}
          disabled={props.disableEditSave}
          variant="contained"
          sx={{
            maxWidth: "200px",
            minWidth: "180px",
            backgroundColor: "#7B9E6B",
            fontWeight: "Light",
          }}
        >
                    Save
        </Button>

        <Button
          className="cancelButton"
          onClick={() => history.goBack()}
          sx={{
            maxWidth: "200px",
            minWidth: "180px",
            backgroundColor: "#646569",
            fontWeight: "Light",
          }}
          variant="contained"
        >
                    Cancel
        </Button>
      </Stack>
    </>
  );
};

export default Buttons;