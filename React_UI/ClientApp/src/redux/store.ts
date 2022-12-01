// Core
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// Reducers
import AuthenicatedUserReducer from "../components/common/reduxSlices/AuthenicatedUserSlice";
import gridReducer from "../components/common/reduxSlices/gridSlice";
import permissionReducer from "../components/common/reduxSlices/permissionSlice";
import toastReducer from "../components/common/reduxSlices/toastSlice";
import clientReducer from "../components/pages/client/reduxSlices/clientsSlice";
import userGridReducer from "../components/pages/securityAdmin/user/reduxSlices/userGridSlice";
import userReducer from "../components/pages/securityAdmin/user/reduxSlices/userSlice";

import { loadState } from "./persistance";

export const store = configureStore({
  reducer: {
    client: clientReducer,
    grid: gridReducer,
    toast: toastReducer,
    userPermissions: permissionReducer,
    user: userReducer,
    userGrid: userGridReducer,
    authenticatedUser: AuthenicatedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: loadState(),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
export type RootState = ReturnType<typeof store.getState>;
