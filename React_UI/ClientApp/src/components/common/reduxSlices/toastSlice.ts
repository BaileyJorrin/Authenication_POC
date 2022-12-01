import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

export type Severity = "error" | "warning" | "info" | "success";

export interface ToastState {
  message: string;
  isOpen: boolean;
  severityType: Severity;
}

export interface ToastContent {
  message: string;
  severityType: Severity;
}

const initialState: ToastState = {
  message: "",
  isOpen: false,
  severityType: "info",
};

export const pushToast = createAction(
  "toast/pushToast", (message:any, severityType: Severity) => {
    return {
      payload: {
        message,
        severityType,
        isOpen: true,
      },
    };
  },
);

export const pushToastAsync = createAsyncThunk(
  "toast/pushToastAsycn", async (toastContent: ToastContent) => {
    return {
      toastContent,
      isOpen: true,
    };
  },
);


const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toggleIsOpen: (state, action: PayloadAction<any>) => {
      state.isOpen = action.payload;
      state.severityType = "info";
    },
    setToastOpen: (state) => {
      state.isOpen = true;
    },
    setToastClose: (state) => {
      state.isOpen = false;
    },
    pushToast: (state, action) => {
      if (state.isOpen == true) {
        state.isOpen = false;
        state.message = action.payload.message;
        state.severityType = action.payload.severityType;
        state.isOpen = true;
      } else {
        state.isOpen = action.payload.isOpen;
        state.message = action.payload.message;
        state.severityType = action.payload.severityType;
      }
    },
    pushToastAsync: (state, action) => {
      state.message = action.payload.toastContent.message;
      state.severityType = action.payload.toastContent.severityType;
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { toggleIsOpen, setToastClose, setToastOpen } = toastSlice.actions;

//Selectors Here
export const selectToast = (state: RootState) => state.toast;
export const selectToastOpenState = (state: RootState) =>
  state.toast.isOpen;
export const selectToastMessage = (state: RootState) =>
  state.toast.message;
export const selectToastSeverity = (state: RootState) =>
  state.toast.severityType;

export default toastSlice.reducer;
