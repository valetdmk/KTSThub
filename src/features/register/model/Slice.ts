import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RegisterPayload, RegisterState } from "./Types";

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
        registerRequest(state, action: PayloadAction<RegisterPayload>) {
            void action;
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<{ token: string; userId: string }>) {
            state.loading = false;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.step = 2;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.step = 1;
        },
        updateProfileRequest(state, action: PayloadAction<{ token: string; userId: string; data: Record<string, unknown> }>) {
            void action;
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
            state.step = 2;
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

export const {
    setStep,
    registerRequest,
    registerSuccess,
    registerFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    resetRegister,
} = actions;
