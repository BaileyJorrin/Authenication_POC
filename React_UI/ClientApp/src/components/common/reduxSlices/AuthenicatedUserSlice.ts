import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticatedUser } from "../../../models/dto/authenicatedUser";
import { RootState } from "../../../redux/store";

export interface AuthenticatedUserState {
  authenticatedUser: AuthenticatedUser | null;
}

const initialState: AuthenticatedUserState = {
  authenticatedUser: null,
};

const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<AuthenticatedUser | null>) => {
      state.authenticatedUser = action.payload;
    },
  },
});

export const { setAuthenticatedUser } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;