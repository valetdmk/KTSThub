import { api } from "../../entities/api";
import type { User } from "../../entities/user/model";

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

    getProfile: async (id: number): Promise<User> => {
        const response = await api.get<User>(`/user/${id}`);
        return response.data;
    },
};
