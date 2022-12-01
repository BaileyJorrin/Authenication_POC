import { Divider, Typography } from "@mui/material";
import FunctionalAbilityGrid from "./FunctionalAbilityGrid";

export const FunctionalAbilitiesContainer = () => {
  return <section className="functional-abilities-list">
    <Typography variant="h2" style={{ paddingBottom: "30px" }}>
            FUNCTIONAL ABILITIES
      <Divider sx={{ width: "350px" }}/>
    </Typography>
    <FunctionalAbilityGrid />
  </section>;
};

export default FunctionalAbilitiesContainer;