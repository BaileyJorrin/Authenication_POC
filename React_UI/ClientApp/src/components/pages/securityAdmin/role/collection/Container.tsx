import { Divider, Typography } from "@mui/material";
import RoleGrid from "./RoleGrid";

export const RolesContainer = () => {
  return <section className="role-list">
    <Typography variant="h2" style={{ paddingBottom: "20px" }}>
            ROLES
      <Divider sx={{ width: "150px" }} />
    </Typography>
    <RoleGrid />
  </section>;
};

export default RolesContainer;