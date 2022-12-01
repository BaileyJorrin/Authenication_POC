import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignedPermission } from "../../../models/dto/assignedPermission";
import { RootState } from "../../../redux/store";

export interface UserPermissionState {
  userAssignedPermissions: [assignedPermission];
  userAssignedRoles: Array<string>;
}

const createIntialPermission= (intialPermission: [assignedPermission]) => {
  return {
    userAssignedPermissions: intialPermission,
    userAssignedRoles: [],
  };
};

const initialState: UserPermissionState = createIntialPermission(
  [{
    controlPointName: "NO_ACCESS",
    canView: false,
    canAddUpdate: false,
    canDelete: false,
    canExecute: false,
  }],
) ;

const userPermissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    assignPermissions: (state, action: PayloadAction<[assignedPermission]> ) => {
      state.userAssignedPermissions = action.payload;
    },
    assignRoles: (state, action: PayloadAction<Array<string>> ) => {
      state.userAssignedRoles = action.payload;
    },
  },
});

export const hasRoles = (state: RootState) => {
  if (state.userPermissions.userAssignedRoles && state.userPermissions.userAssignedRoles.length > 0) {
    return true;
  }
  return false;
};

const findPermission = (controlPointName: string, permissions: [assignedPermission]) => {
  return permissions.find(permission => permission.controlPointName.toLowerCase() === controlPointName.toLowerCase());
};

export const selectCanView = (state: RootState, controlPointName: string) => {
  if (state.userPermissions == undefined) { return false;}
  const permission = findPermission(controlPointName, state.userPermissions.userAssignedPermissions);
  return permission === undefined? false: permission.canView;
};

export const selectCanAdd = (state: RootState, controlPointName: string) => {
  if (state.userPermissions == undefined) { return false;}
  const permission = findPermission(controlPointName, state.userPermissions.userAssignedPermissions);
  return permission === undefined? false: permission?.canAddUpdate;
};

export const selectCanDelete = (state: RootState, controlPointName: string) => {
  if (state.userPermissions == undefined) { return false;}
  const permission = findPermission(controlPointName, state.userPermissions.userAssignedPermissions);
  return permission === undefined? false: permission?.canDelete;
};

export const { assignPermissions, assignRoles } = userPermissionSlice.actions;

export default userPermissionSlice.reducer;