import { createSelector } from "@reduxjs/toolkit";
import { name } from "./Slice";
import type { AuthState } from "./Types";

interface State {
    [name]: AuthState;
}

const root = (state: State) => state[name];

const selectUser = createSelector([root], (rootData) => rootData.user);

export const selectors = {
    root,
    selectUser,
};
