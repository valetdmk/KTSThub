import type { User } from "../../entities/user/model";
import { getUserIdFromToken } from "../lib/auth";
import { api } from "./base";

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
        const response = await api.post<ResponseMessage>("/auth/signup", data);
        return response.data;
    },

    signin: async (data: SigninPayload): Promise<JwtResponse> => {
        const response = await api.post<JwtResponse>("/auth/signin", data);
        return response.data;
    },

    getProfile: async (token?: string): Promise<User> => {
        try {
            const response = await api.get<User>("/user/me");
            return response.data;
        } catch (error) {
            const userId = token ? getUserIdFromToken(token) : null;

            if (userId === null) {
                throw error;
            }

            const response = await api.get<User>(`/user/${userId}`);
            return response.data;
        }
    },
};
