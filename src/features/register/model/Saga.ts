import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./Slice";
import type { RegisterPayload } from "./Types";
import { authApi, type JwtResponse } from "../../../shared/api/auth";
import { updateUserProfile, type UpdateUserPayload } from "../../../shared/api/users";
import { USE_MOCK_REGISTER_FLOW } from "../../../shared/config/devFlags";
import type { User } from "../../../entities/user/model";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

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
        if (USE_MOCK_REGISTER_FLOW) {
            const mockToken = "mock-register-token";
            const mockUserId = String(Date.now());

            localStorage.setItem("token", mockToken);
            yield put(registerSuccess({ token: mockToken, userId: mockUserId }));
            return;
        }

        yield call(authApi.signup, action.payload);

        const signinResponse: JwtResponse = yield call(
            authApi.signin,
            { username: action.payload.username, password: action.payload.password }
        );

        const token = signinResponse.token;
        localStorage.setItem("token", token);
        const user: User = yield call(authApi.getProfile, token);
        const userId = user.id;

        if (typeof userId !== "string" || userId.trim() === "") {
            localStorage.removeItem("token");
            yield put(registerFailure("Не удалось завершить вход после регистрации. Повтори попытку."));
            return;
        }

        yield put(registerSuccess({ token, userId }));
    } catch (error) {
        localStorage.removeItem("token");
        yield put(registerFailure(getApiErrorMessage(error, "Ошибка регистрации.")));
    }
}

function* handleUpdateProfile(action: PayloadAction<{ token: string; userId: string; data: Record<string, unknown> }>) {
    try {
        if (USE_MOCK_REGISTER_FLOW) {
            yield put(updateProfileSuccess());
            return;
        }

        yield call(updateUserProfile, action.payload.userId, action.payload.data as UpdateUserPayload);
        yield put(updateProfileSuccess());
    } catch (error) {
        yield put(updateProfileFailure(getApiErrorMessage(error, "Ошибка обновления профиля.")));
    }
}

export function* registerSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}
