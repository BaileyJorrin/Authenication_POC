import { State } from "@progress/kendo-data-query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../redux/store";

export interface GridState {
  dataState: State;
}

const createDataState = (dataState: State) => {
  return {
    dataState: dataState,
  };
};
const initialState : GridState = createDataState(
  {
    sort:
        [
          { field: "lastName", dir: "asc" },
          { field: "firstName", dir: "asc" },
        ],
  },
);

const userGridSlice = createSlice({
  name: "userGrid",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<GridState>)=> {
      state.dataState = action.payload.dataState;
    },
  },
});

export const { update } = userGridSlice.actions;
export const selectGrid = (state: RootState) => state.userGrid;

export default userGridSlice.reducer;