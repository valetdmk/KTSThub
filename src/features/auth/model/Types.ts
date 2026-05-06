import type { User } from "../../../entities/user/model"

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    user: User | null;
}