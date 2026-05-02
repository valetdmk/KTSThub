import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import { actions } from "./Slice";
import type { LoginPayload } from "./Types";
import { authApi, type JwtResponse } from "../../../app/api/auth";
import { getUserIdFromToken } from "../../../shared/lib/auth";
import type { User } from "../../../entities/user/model";

const { loginRequest, loginSuccess, loginFailure, fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure } = actions;

function* loadProfileFromToken(token: string) {
    const userId = getUserIdFromToken(token);

    if (userId === null) {
        throw new Error("Unable to read user id from token");
    }

    const user: User = yield call(authApi.getProfile, userId);
    yield put(fetchProfileSuccess(user));
}

function* handleLogin(action: PayloadAction<LoginPayload>) {
    try {
        const response: JwtResponse = yield call(authApi.signin, action.payload);
        const token = response.token;

        localStorage.setItem("token", token);
        yield put(loginSuccess(token));
        yield* loadProfileFromToken(token);
    } catch (error) {
        yield put(loginFailure("РћС€РёР±РєР° РІС…РѕРґР°"));
    }
}

function* handleFetchProfile() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Missing token");
        }

        yield* loadProfileFromToken(token);
    } catch (error) {
        yield put(fetchProfileFailure("РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РїСЂРѕС„РёР»СЏ"));
    }
}

export function* authSaga(_api: AxiosInstance) {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
}
