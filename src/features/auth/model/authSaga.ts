import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
} from "./authSlice";
import { authApi } from "../../../app/api/auth";
import type { LoginPayload } from "./authTypes";

function* handleLogin(action: PayloadAction<LoginPayload>) {
    try {
        const response: { token: string } = yield call(
            authApi.signin,
            action.payload
        )

        const token = response.token;
        localStorage.setItem("token", token);

        yield put(loginSuccess(token));
    } catch (error) {
        yield put(loginFailure("Ошибка входа"));
    }
}

function* handleRegister(action: PayloadAction<LoginPayload>) {
    try {
        yield call(authApi.signup, action.payload);
        yield put(registerSuccess());
    } catch (error) {
        yield put(registerFailure("Ошибка авторизации"));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
}