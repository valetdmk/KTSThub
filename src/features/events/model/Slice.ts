import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "../../../entities/event/model";

interface EventsState {
    events: Event[];
    selectedEvent: Event | null;
    loading: boolean;
    error: string | null;
}

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
        fetchEventByIdRequest(state, _action: PayloadAction<number>) {
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
