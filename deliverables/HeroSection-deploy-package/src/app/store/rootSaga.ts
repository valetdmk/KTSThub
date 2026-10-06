import { all, fork } from "redux-saga/effects";
import { authSaga } from "../../features/auth";
import { registerSaga } from "../../features/register";
import { eventsSaga } from "../../features/events";

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(registerSaga),
        fork(eventsSaga)
    ]);
}
