import * as React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { hasRoles } from "../reduxSlices/permissionSlice";

import "./authorization.scss";

export interface NoPermissionsProps {
  children: JSX.Element ;
}

function NoPermissionMessage () : JSX.Element {
  const securityHasRoles = useAppSelector(state => hasRoles(state));
  if (!securityHasRoles) {

    return (
      <section>
        <div className="noRolesMsg" >
                    You do not have any roles assigned.  Please see your manager for access to Demo.
        </div>
      </section>
    );


  }

  return <span> </span>;
}


export default NoPermissionMessage;