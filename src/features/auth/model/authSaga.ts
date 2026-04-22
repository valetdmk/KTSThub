import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./authSlice";
import type { LoginPayload } from "./authTypes";
import type { AxiosInstance } from "axios";
import { authApi } from "../../../app/api/auth";

const { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure } = actions;

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

export function* authSaga(api: AxiosInstance) {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
}