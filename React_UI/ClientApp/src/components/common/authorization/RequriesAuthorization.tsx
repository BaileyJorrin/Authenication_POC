import * as React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { PermissionList } from "../enumerations/Permissions";
import { selectCanView, selectCanAdd, selectCanDelete } from "../reduxSlices/permissionSlice";

export interface RequiresAuthorizationProps {
  children: JSX.Element ;
  failureElement?: JSX.Element;
  controlPoint: string;
  message?: string;
  permission?: string;
}

function DetermineHasPermission(permission : string, controlPoint : string) : boolean {
  switch (permission) {
    case PermissionList.CAN_VIEW:
      return useAppSelector(state => selectCanView(state, controlPoint));
      break;
    case PermissionList.CAN_ADD:
      return useAppSelector(state => selectCanAdd(state, controlPoint));
      break;
    case PermissionList.CAN_DELETE:
      return useAppSelector(state => selectCanDelete(state, controlPoint));
      break;
    default:
      return false;
      break;
  }
}

function RequriesAuthorization ({ children, controlPoint, failureElement, message="", permission= PermissionList.NO_ACCESS }: RequiresAuthorizationProps) : JSX.Element {
  const hasPermission = DetermineHasPermission(permission, controlPoint);
  if (hasPermission) {
    return children;
  } else {
    if (failureElement) {
      return failureElement;
    }

    return <div>{message}</div>;
  }
}


export default RequriesAuthorization;