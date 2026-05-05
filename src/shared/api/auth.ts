import axios from "axios";
import type { User } from "../../entities/user/model";
import { getUserIdFromToken } from "../lib/auth";
import { api } from "./base";
import { apiPaths, legacyApiPaths } from "./endpoints";

export interface SignupPayload {
    name: string;
    lastname: string;
    username: string;
    birthday: string;
    email: string;
    password: string;
}

export interface SigninPayload {
    username: string;
    password: string;
}

export interface JwtResponse {
    token: string;
}

export interface ResponseMessage {
    message: string;
}

export const authApi = {
    signup: async (data: SignupPayload): Promise<ResponseMessage> => {
        const response = await api.post<ResponseMessage>(apiPaths.auth.signup, data);
        return response.data;
    },

    signin: async (data: SigninPayload): Promise<JwtResponse> => {
        const response = await api.post<JwtResponse>(apiPaths.auth.signin, data);
        return response.data;
    },

    getProfile: async (token?: string): Promise<User> => {
        try {
            const response = await api.get<User>(apiPaths.users.me);
            return response.data;
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error;
            }

            if (error.response?.status !== 404) {
                throw error;
            }

            try {
                const legacyResponse = await api.get<User>(legacyApiPaths.users.me);
                return legacyResponse.data;
            } catch (legacyError) {
                if (!axios.isAxiosError(legacyError) || legacyError.response?.status !== 404) {
                    throw legacyError;
                }
            }

            const userId = token ? getUserIdFromToken(token) : null;

            if (userId === null) {
                throw error;
            }

            try {
                const response = await api.get<User>(apiPaths.users.byId(userId));
                return response.data;
            } catch (profileError) {
                if (!axios.isAxiosError(profileError) || profileError.response?.status !== 404) {
                    throw profileError;
                }

                const legacyResponse = await api.get<User>(legacyApiPaths.users.byId(userId));
                return legacyResponse.data;
            }
        }
    },
};
