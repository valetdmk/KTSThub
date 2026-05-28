import { createSelector } from "@reduxjs/toolkit";
import type { EventsState } from "./Types";

type State = {
  events: EventsState;
};

const root = (state: State) => state.events;

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
