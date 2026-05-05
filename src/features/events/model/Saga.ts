import { call, put, takeLatest, all } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { eventsApi } from "../../../shared/api/events";
import type { Event } from "../../../entities/event/model";
import {
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
} from "./Slice";

function* handleFetchEvents(): Generator {
    try {
        const events: Event[] = yield call(eventsApi.getEvents);
        yield put(fetchEventsSuccess(events));
    } catch {
        yield put(fetchEventsFailure("Ошибка загрузки событий"));
    }
}

function* handleFetchEventById(action: PayloadAction<number>): Generator {
    try {
        const event: Event = yield call(eventsApi.getEventById, action.payload);
        yield put(fetchEventByIdSuccess(event));
    } catch {
        yield put(fetchEventByIdFailure("Ошибка загрузки события"));
    }
}

export function* eventsSaga() {
    yield all([
        takeLatest(fetchEventsRequest.type, handleFetchEvents),
        takeLatest(fetchEventByIdRequest.type, handleFetchEventById),
    ]);
}
