import type { User } from "../../entities/user/model";
import { api } from "./base";
import { apiPaths } from "./endpoints";

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>(apiPaths.users.collection);
    return response.data;
};

export type UpdateUserPayload = {
    name: string;
    lastName: string;
    username: string;
    birthday: string;
    avatar: string;
    email: string;
    bio: string;
    gender: "MALE" | "FEMALE";
    phone: string;
    telegram: string;
    github: string | null;
    job: string;
    level: string;
    skills?: { skillId: number; level: number }[];
};
export const updateUserProfile = async (id: string, data: UpdateUserPayload): Promise<User> => {
    const response = await api.post<User>(apiPaths.users.byId(id), data);
    return response.data;
};
