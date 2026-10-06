import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "../../../entities/event/model";
import type { EventsState } from "./Types";

const initialState: EventsState = {
    events: [],
    selectedEvent: null,
    loading: false,
    error: null,
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        fetchEventsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess(state, action: PayloadAction<Event[]>) {
            state.loading = false;
            state.events = action.payload;
        },
        fetchEventsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchEventByIdRequest(state, action: PayloadAction<number>) {
            void action;
            state.loading = true;
            state.error = null;
        },
        fetchEventByIdSuccess(state, action: PayloadAction<Event>) {
            state.loading = false;
            state.selectedEvent = action.payload;
        },
        fetchEventByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.selectedEvent = null;
        },
    },
});

export const {
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
} = eventsSlice.actions;

export const eventsReducer = eventsSlice.reducer;
