import { apiClient } from "./apiClient";
import type { User } from "../../shared/types/user";

export const getUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
};