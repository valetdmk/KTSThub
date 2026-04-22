import { all, fork } from "redux-saga/effects";
import { api as apiInterface } from "../api";
import { authSaga } from "../../features/auth/model/Saga";
import { eventsSaga } from "../../features/events/Saga";

export function* rootSaga() {
    yield all([
        fork(authSaga, apiInterface),
        eventsSaga()
    ]);
}