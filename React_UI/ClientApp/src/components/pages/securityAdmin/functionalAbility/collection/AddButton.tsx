import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../details/styles.scss";

const AddButton = () => {
  return (
    <div className="flexAddButton">

      {/* DO NOT USE THIS PATTERN */}
      {/* THE PATTERN SHOULD BE */}
      {/* ENDPOINT-NAME/ENDPOINT-NAME/ */}

      <Link to={"functional-Abilities/functional-abilities-details/new"}>
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
          Add Functional Ability
        </Button>
      </Link>
    </div>
  );
};

export default AddButton;