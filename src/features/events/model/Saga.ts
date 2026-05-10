import { all, call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "../../../entities/event/model";
import { eventsApi } from "../../../shared/api/events";
import { USE_MOCK_BACKEND } from "../../../shared/config/devFlags";
import { getApiErrorMessage } from "../../../shared/lib/apiError";
import {
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
} from "./Slice";

const mockEvents: Event[] = [
    {
        id: 1,
        title: "Local Frontend Sync",
        type: "MEETUP",
        startDate: "2026-05-10T10:00:00",
        endDate: "2026-05-10T12:00:00",
        stack: ["React", "TypeScript"],
    },
    {
        id: 2,
        title: "UI Polish Session",
        type: "WORKSHOP",
        startDate: "2026-05-11T14:00:00",
        endDate: "2026-05-11T16:00:00",
        stack: ["SCSS", "Vite"],
    },
];

function* handleFetchEvents(): Generator {
    try {
        if (USE_MOCK_BACKEND) {
            yield put(fetchEventsSuccess(mockEvents));
            return;
        }

        // const events: Event[] = yield call(eventsApi.getEvents);
        const events: Event[] = yield call(eventsApi.getEvents);
        yield put(fetchEventsSuccess(events));
    } catch (error) {
        yield put(fetchEventsFailure(getApiErrorMessage(error, "РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё СЃРѕР±С‹С‚РёР№")));
    }
}

function* handleFetchEventById(action: PayloadAction<number>): Generator {
    try {
        if (USE_MOCK_BACKEND) {
            const event = mockEvents.find((item) => item.id === action.payload);

            if (!event) {
                throw new Error("Mock event not found");
            }

            yield put(fetchEventByIdSuccess(event));
            return;
        }

        // const event: Event = yield call(eventsApi.getEventById, action.payload);
        const event: Event = yield call(eventsApi.getEventById, action.payload);
        yield put(fetchEventByIdSuccess(event));
    } catch (error) {
        yield put(fetchEventByIdFailure(getApiErrorMessage(error, "РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё СЃРѕР±С‹С‚РёСЏ")));
    }
}

export function* eventsSaga() {
    yield all([
        takeLatest(fetchEventsRequest.type, handleFetchEvents),
        takeLatest(fetchEventByIdRequest.type, handleFetchEventById),
    ]);
}
