import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NavigationState } from "./Types";

const initialState: NavigationState = {
  activeBottomItemId: "support",
};

export const { name, reducer, actions } = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveBottomItemId(state, action: PayloadAction<string>) {
      state.activeBottomItemId = action.payload;
    },
  },
});
