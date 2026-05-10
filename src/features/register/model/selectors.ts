import { createSelector } from "@reduxjs/toolkit";
import type { RegisterState } from "./Types";

type State = {
  register: RegisterState;
};

const root = (state: State) => state.register;

const selectStep = createSelector([root], (registerState) => registerState.step);
const selectLoading = createSelector([root], (registerState) => registerState.loading);
const selectError = createSelector([root], (registerState) => registerState.error);
const selectToken = createSelector([root], (registerState) => registerState.token);
const selectUserId = createSelector([root], (registerState) => registerState.userId);

export const selectors = {
    root,
    selectStep,
    selectLoading,
    selectError,
    selectToken,
    selectUserId,
};
