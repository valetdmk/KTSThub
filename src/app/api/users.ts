import { api } from ".";
import type { User } from "../../entities/user/model";

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
};