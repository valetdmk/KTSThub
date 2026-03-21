import { call, put, takeLatest } from "redux-saga/effects";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
} from "./authSlice";
import { authService } from "./authService";

function* loginSaga(action: any): any {
    try {
        const res = yield call(authService.signin, action.payload);

        const token = res.data.token;
        localStorage.setItem("token", token);

        yield put(loginSuccess(token));
    } catch (err: any) {
        yield put(loginFailure("Ошибка входа"));
    }
}

function* registerSaga(action: any): any {
    try {
        yield call(authService.signup, action.payload);
        yield put(registerSuccess());
    } catch (err: any) {
        yield put(registerFailure("Ошибка авторизации"));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, loginSaga);
    yield takeLatest(registerRequest.type, registerSaga);
}