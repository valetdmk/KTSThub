import { createSelector } from "@reduxjs/toolkit";
import { name } from "./Slice";
import type { NavigationState } from "./Types";

type State = {
  [name]: NavigationState;
};

const root = (state: State) => state[name];

const selectActiveBottomItemId = createSelector(
  [root],
  (navigationState) => navigationState.activeBottomItemId,
);

export const selectors = {
  root,
  selectActiveBottomItemId,
};
