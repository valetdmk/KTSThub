import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "./authTypes";

interface User {
    id: number;
    username: string;
}

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    user: User | null;
};

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


        registerRequest(state, _action: PayloadAction<LoginPayload>) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state) {
            state.loading = false;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },


        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },

        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});