import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload, AuthState } from "./Types";
import type { User } from "../../../entities/user/model";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    user: null,
};

export const {name, reducer, actions} = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest(state, _action: PayloadAction<LoginPayload>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.token = action.payload;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },


        fetchProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.user = action.payload;
        },
        fetchProfileFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        logout(state) {
            state.token = null;
            state.user = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("platformUser");
        },
    },
});
