import { Divider, Typography } from "@mui/material";
import ControlPointGrid from "./ControlPointGrid";

export const ControlPointsContainer = () => {
  return <section className="control-points-list">
    <Typography variant="h2" style={{ paddingBottom: "30px" }}>
            CONTROL POINTS
      <Divider sx={{ width: "280px" }} />
    </Typography>
    <ControlPointGrid />
  </section>;
};

export default ControlPointsContainer;