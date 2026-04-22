import { api } from "../../entities/api"

export interface SignupPayload {
    username: string;
    password: string;
}

export interface SigninPayload {
    username: string;
    password: string;
}

export const authApi = {
    signup: (data: SignupPayload) => api.post("/auth/signup", data),

    signin: (data: SigninPayload) => api.post("/auth/signin", data),

    getProfile: (id: number) => api.get(`/user/${id}`),
}