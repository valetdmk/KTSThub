import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";

const root = (state: RootState) => state.events;

const selectEvents = createSelector([root], (eventsState) => eventsState.events);
const selectSelectedEvent = createSelector([root], (eventsState) => eventsState.selectedEvent);
const selectLoading = createSelector([root], (eventsState) => eventsState.loading);
const selectError = createSelector([root], (eventsState) => eventsState.error);

export const selectors = {
    root,
    selectEvents,
    selectSelectedEvent,
    selectLoading,
    selectError,
};
