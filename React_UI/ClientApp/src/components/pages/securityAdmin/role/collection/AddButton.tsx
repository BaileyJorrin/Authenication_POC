import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../details/styles.scss";

const AddButton = () => {
  return (
    <div className="flexAddButton">
      <Link to={"roles/roles-details"}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#7b9e6b",
            color: "white",
            borderColor: "#646569",
            maxHeight: "30px",
            minWidth: "113px",
            left: "10%",
          }}
        >
          Add Role
        </Button>
      </Link>
    </div>
  );
};

export default AddButton;