import { process, State } from "@progress/kendo-data-query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";


export interface GridState {
  dataState: State;
}

const createDataState = (dataState: State) => {
  return {
    resultGrid: process([], dataState),
    dataState: dataState,
  };
};
const initialState : GridState = createDataState(
  {
    sort: [{ field: "name", dir: "asc" }],
  },
);

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<GridState>)=> void{
      ...state,
      dataState: {
        ...state.dataState = action.payload.dataState,
      },
    },
  },
});
export const { update } = gridSlice.actions;
export const selectGrid = (state: RootState) => state.grid;

export default gridSlice.reducer;