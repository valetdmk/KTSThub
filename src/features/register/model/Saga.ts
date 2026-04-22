import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./Slice";
import { api } from "../../../entities/api";
import type { RegisterPayload } from "./Types";

const {
    registerRequest,
    registerSuccess,
    registerFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
} = actions;

function* handleRegister(action: PayloadAction<RegisterPayload>) {
    try {
        const response: { token: string } = yield call(
            api.post,
            "/auth/signup",
            action.payload
        );

        const signinResponse: { token: string } = yield call(
            api.post,
            "/auth/signin",
            { username: action.payload.username, password: action.payload.password }
        );

        const token = signinResponse.token;
        localStorage.setItem("token", token);

        yield put(registerSuccess({ token, userId: 1 }));
    } catch (error) {
        yield put(registerFailure("Ошибка регистрации"));
    }
}

function* handleUpdateProfile(action: PayloadAction<{ token: string; userId: number; data: Record<string, unknown> }>) {
    try {
        yield call(
            api.post,
            `/user/${action.payload.userId}`,
            action.payload.data,
            { headers: { Authorization: `Bearer ${action.payload.token}` } }
        );
        yield put(updateProfileSuccess());
    } catch (error) {
        yield put(updateProfileFailure("Ошибка обновления профиля"));
    }
}

export function* registerSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}