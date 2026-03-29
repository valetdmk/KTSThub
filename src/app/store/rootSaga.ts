import { all } from "redux-saga/effects";
import { authSaga } from "../../features/auth/model/authSaga";
import { eventsSaga } from "../../features/events/eventsSaga";

export function* rootSaga() {
    yield all([authSaga()]);
    yield all([eventsSaga()]);
}