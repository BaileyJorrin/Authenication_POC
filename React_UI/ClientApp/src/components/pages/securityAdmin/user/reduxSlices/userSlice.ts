//Helpers
import {
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import UserApi from "../../../../../apis/implementations/UserApi";
import IUserApi from "../../../../../apis/interfaces/IUserApi";
import { User } from "../../../../../models/entities/User";
import AppStatus from "../../../../../models/helpers/AppStatus";
import { createNewUser } from "../../../../../models/helpers/entityHelpers/userHelper";

//Redux

import { RootState } from "../../../../../redux/store";

const userApi: IUserApi = new UserApi();

export interface userstate {
  userToSave: User;
  users: User[];
  error: string | undefined;
  isNewUser: boolean;
  selectedUser?: User;
  status: AppStatus;
}

const initialState: userstate = {
  userToSave: createNewUser(),
  users: [],
  error: "",
  isNewUser: true,
  selectedUser: undefined,
  status: AppStatus.Idle,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await userApi.getAll();
  response.forEach((c: User) => {
    c.createDateTime = new Date(c.createDateTime);
    c.createDateTime.setHours(0, 0, 0, 0);
    c.updateDateTime = new Date(c.updateDateTime);
    c.updateDateTime.setHours(0, 0, 0, 0);
  });
  return response;
});

export const getAll = createAsyncThunk("users/getAll", async () => {
  const response = await userApi.getAll();
  response.forEach((c: User) => {
    c.createDateTime = new Date(c.createDateTime);
    c.createDateTime.setHours(0, 0, 0, 0);
    c.updateDateTime = new Date(c.updateDateTime);
    c.updateDateTime.setHours(0, 0, 0, 0);
  });
  return response;
});

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string) => {
    const response = await userApi.getById(id);
    return response;
  },
);

export const getDetailsUserById = createAsyncThunk(
  "users/getDetailsUserById",
  async (id: string) => {
    const response = await userApi.getByIdWithDetails(id);
    return response;
  },
);

export const resetUserToSave = createAction(
  "client/resetClientToSave",
  () => {
    return {
      payload: {
        userToSave: initialState.userToSave,
        selectedUser: initialState.selectedUser,
      },
    };
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAll
      .addCase(getAllUsers.pending, (state, action) => {
        state.status = AppStatus.Loading;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = [];
        state.status = AppStatus.Succeeded;
        state.users = state.users.concat(action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = AppStatus.Failed;
      })
      //GET SINGELE
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      //DETAILS
      .addCase(getDetailsUserById.fulfilled, (state, action) => {
        state.status = AppStatus.Idle;
        state.userToSave = action.payload;
      })
      .addCase(getDetailsUserById.rejected, (state, action: any) => {
        state.status = AppStatus.Failed;
        state.error = action.payload;
      })
      //ResetUserForDetailsScreen
      .addCase(resetUserToSave, (state, action) => {
        state.userToSave = action.payload.userToSave;
        state.selectedUser = action.payload.selectedUser;
      });
  },
});

//----------Selectors----------
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectUser = (state: RootState) => state.user.selectedUser;
export const selectDetailsUser = (state: RootState) =>state.user.userToSave;

export function selectIdByUserName(state: RootState, id: string): any {
  return state.user.users.find((searchUser) => searchUser.id == id);
}

export default usersSlice.reducer;
