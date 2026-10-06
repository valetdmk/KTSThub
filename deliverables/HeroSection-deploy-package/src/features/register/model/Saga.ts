import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./Slice";
import type { RegisterPayload } from "./Types";
import { authApi, type JwtResponse } from "../../../shared/api/auth";
import { updateUserProfile, type UpdateUserPayload } from "../../../shared/api/users";
import { skillsApi, type BackendSkill } from "../../../shared/api/skills";
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

type UpdateProfileRequestData = UpdateUserPayload & {
    skillNames?: string[];
    skillLevelsByName?: Record<string, number>;
};

function resolveProfileSkills(
    availableSkills: BackendSkill[],
    skillNames: string[] = [],
    skillLevelsByName: Record<string, number> = {}
) {
    const uniqueSkillNames = Array.from(
        new Set(
            skillNames
                .map((skillName) => skillName.trim())
                .filter(Boolean)
        )
    );

    if (uniqueSkillNames.length === 0) {
        return undefined;
    }

    const skillIdByName = new Map(
        availableSkills.map((skill) => [skill.name.trim().toLowerCase(), skill.id])
    );

    const resolvedSkills = uniqueSkillNames.flatMap((skillName) => {
        const normalizedName = skillName.toLowerCase();
        const skillId = skillIdByName.get(normalizedName);

        if (!skillId) {
            return [];
        }

        return [{
            skillId,
            level: skillLevelsByName[normalizedName] ?? 1,
        }];
    });

    return resolvedSkills.length > 0 ? resolvedSkills : undefined;
}

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
        const user: User = yield call(authApi.getProfile);
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

        const profileData = action.payload.data as UpdateProfileRequestData;
        const availableSkills: BackendSkill[] = yield call(skillsApi.getAllSkills);
        const resolvedSkills = resolveProfileSkills(
            availableSkills,
            profileData.skillNames,
            profileData.skillLevelsByName
        );
        const { skillNames: _skillNames, skillLevelsByName: _skillLevelsByName, ...baseData } = profileData;
        void _skillNames;
        void _skillLevelsByName;
        const payload: UpdateUserPayload = resolvedSkills
            ? { ...baseData, skills: resolvedSkills }
            : baseData;

        yield call(updateUserProfile, action.payload.userId, payload);
        yield put(updateProfileSuccess());
    } catch (error) {
        yield put(updateProfileFailure(getApiErrorMessage(error, "Ошибка обновления профиля.")));
    }
}

export function* registerSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}
