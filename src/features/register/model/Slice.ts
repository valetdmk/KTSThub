import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RegisterPayload } from "./Types";

interface RegisterState {
    step: number;
    loading: boolean;
    error: string | null;
    token: string | null;
    userId: number | null;
};

const initialState: RegisterState = {
    step: 1,
    loading: false,
    error: null,
    token: null,
    userId: null,
};

export const {name, reducer, actions} = createSlice({
    name: "register",
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<number>) {
            state.step = action.payload;
        },
        registerRequest(state, _action: PayloadAction<RegisterPayload>) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<{ token: string; userId: number }>) {
            state.loading = false;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state) {
            state.loading = false;
            state.step = 3;
        },
        updateProfileFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.step = 3;
        },
        resetRegister(state) {
            state.step = 1;
            state.loading = false;
            state.error = null;
            state.token = null;
            state.userId = null;
        },
    },
});