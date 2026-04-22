import { all, fork } from "redux-saga/effects";
import { api as apiInterface } from "../../entities/api";
import { authSaga } from "../../features/auth";
import { registerSaga } from "../../features/register";
import { eventsSaga } from "../../features/events/Saga";

export function* rootSaga() {
    yield all([
        fork(authSaga, apiInterface),
        fork(registerSaga),
        fork(eventsSaga)
    ]);
}