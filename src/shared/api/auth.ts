import type { User } from "../../entities/user/model";
import { api } from "./base";
import { apiPaths } from "./endpoints";

export interface SignupPayload {
    name: string;
    lastname: string;
    username: string;
    birthday: string;
    email: string;
    password: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
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
        const response = await api.post<ResponseMessage>(apiPaths.auth.signup, {
            ...data,
            gender: data.gender ?? "OTHER",
        });
        return response.data;
    },

    signin: async (data: SigninPayload): Promise<JwtResponse> => {
        const response = await api.post<JwtResponse>(apiPaths.auth.signin, data);
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get<User>(apiPaths.users.me);
        return response.data;
    },
};
