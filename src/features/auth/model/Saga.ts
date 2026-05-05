import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./Slice";
import type { LoginPayload } from "./Types";
import { authApi, type JwtResponse } from "../../../shared/api/auth";
import { getApiErrorMessage } from "../../../shared/lib/apiError";
import type { User } from "../../../entities/user/model";

const {
    loginRequest,
    loginSuccess,
    loginFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
} = actions;

function* loadProfile(token?: string) {
    const user: User = yield call(authApi.getProfile, token);
    yield put(fetchProfileSuccess(user));
}

function* handleLogin(action: PayloadAction<LoginPayload>) {
    try {
        const response: JwtResponse = yield call(authApi.signin, action.payload);
        const token = response.token;

        localStorage.setItem("token", token);
        yield* loadProfile(token);
        yield put(loginSuccess(token));
    } catch (error) {
        localStorage.removeItem("token");
        yield put(loginFailure(getApiErrorMessage(error, "Ошибка входа.")));
    }
}

function* handleFetchProfile() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Missing token");
        }

        yield* loadProfile(token);
    } catch (error) {
        yield put(fetchProfileFailure(getApiErrorMessage(error, "Ошибка загрузки профиля.")));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
}
