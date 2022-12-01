import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export interface BackButtonProps {
  onCancel: ()=>void;
  backText?: string;
}

function BackButton(props: BackButtonProps): JSX.Element {
  return (
    <Stack spacing={2} direction="row">
      <Button
        className="backButton"
        onClick={props.onCancel}
        sx={{
          maxWidth: "200px",
          minWidth: "180px",
          backgroundColor: "#646569",
          fontWeight: "Light",
        }}
        variant="contained"
      >
        {props.backText}
      </Button>
    </Stack>
  );
}

export default BackButton;