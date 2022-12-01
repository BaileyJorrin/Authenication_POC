//Core
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

//Components
import RequriesAuthorization from "../../../common/authorization/RequriesAuthorization";
import { PermissionList } from "../../../common/enumerations/Permissions";
import { ScreenControlPoints } from "../../../common/enumerations/ScreenControlPoints";
import ClientGrid from "./ClientGrid";

//Helpers


export const ClientsContainer = () => {
  return (
    <RequriesAuthorization controlPoint={ScreenControlPoints.Client} permission={PermissionList.CAN_VIEW} message="You do not have permission to view this page">
      <section className="clients-list">
        <Typography variant="h2" style={{ paddingBottom: "30px" }}>
          CLIENTS
          <Divider sx={{ width: "150px" }}/>
        </Typography>

        <ClientGrid/>
      </section>
    </RequriesAuthorization>

  );
};

export default ClientsContainer;
