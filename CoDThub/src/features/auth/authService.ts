import { api } from "../../app/api/api";

export const authService = {
    signup: (data: any) => api.post("/auth/signup", data),

    signin: (data: { usernamw: string; password: string }) =>
        api.post("/auth/signin", data),

    getProfile: (id: number) => api.get(`/user/${id}`),
};