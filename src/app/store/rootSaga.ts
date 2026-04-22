import { all, fork } from "redux-saga/effects";
import { api as apiInterface } from "../api";
import { authSaga } from "../../features/auth/model/authSaga";
import { eventsSaga } from "../../features/events/eventsSaga";

export function* rootSaga() {
    yield all([
        fork(authSaga, apiInterface),
        eventsSaga()
    ]);
}