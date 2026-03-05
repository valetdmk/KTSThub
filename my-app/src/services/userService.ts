import { apiClient } from "../api/apiClient";
import type { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
};