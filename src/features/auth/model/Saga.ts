import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./Slice";
import type { LoginPayload } from "./Types";
import { authApi, type JwtResponse } from "../../../shared/api/auth";
import { getApiErrorMessage } from "../../../shared/lib/apiError";
import type { User } from "../../../entities/user/model";
import { USE_MOCK_BACKEND } from "../../../shared/config/devFlags";
import { readSavedUser } from "../../../shared/lib/userProfile";

const {
    loginRequest,
    loginSuccess,
    loginFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
} = actions;

function getMockUser(): User {
    const savedUser = readSavedUser();

    return {
        id: "1",
        name: savedUser.firstName || "Frontend",
        lastName: savedUser.lastName || "Developer",
        username: savedUser.username || "local.dev",
        email: savedUser.email || "frontend@local.dev",
        birthday: savedUser.birthday || "2000-01-01",
        phone: savedUser.phone || "+79000000000",
        telegram: savedUser.social || "https://t.me/localdev",
        avatar: savedUser.avatar || null,
        bio: savedUser.description || null,
        gender: savedUser.gender || "OTHER",
        role: savedUser.role || "PARTICIPANT",
        status: savedUser.status || "ACTIVE",
        job: savedUser.job || "FRONT",
        level: savedUser.level || "INTERMEDIATE",
    };
}

function* loadProfile(token?: string) {
    if (USE_MOCK_BACKEND) {
        yield put(fetchProfileSuccess(getMockUser()));
        return;
    }

    // const user: User = yield call(authApi.getProfile, token);
    const user: User = yield call(authApi.getProfile, token);
    yield put(fetchProfileSuccess(user));
}

function* handleLogin(action: PayloadAction<LoginPayload>) {
    try {
        if (USE_MOCK_BACKEND) {
            const mockToken = "mock-auth-token";

            localStorage.setItem("token", mockToken);
            yield* loadProfile(mockToken);
            yield put(loginSuccess(mockToken));
            return;
        }

        // const response: JwtResponse = yield call(authApi.signin, action.payload);
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
    const token = localStorage.getItem("token");

    if (!token) {
        yield put(fetchProfileFailure("Сессия не найдена. Войдите заново."));
        return;
    }

    try {
        yield* loadProfile(token);
    } catch (error) {
        yield put(fetchProfileFailure(getApiErrorMessage(error, "Ошибка загрузки профиля.")));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
}
