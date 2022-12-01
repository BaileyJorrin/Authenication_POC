import { Divider, Typography } from "@mui/material";
import UserGrid from "./UserGrid";

export const UsersContainer = () => {
  return <section className="user-list">
    <Typography variant="h2" style={{ paddingBottom: "20px" }}>
            USERS
      <Divider sx={{ width: "130px" }} />
    </Typography>
    <UserGrid />
  </section>;
};

export default UsersContainer;
