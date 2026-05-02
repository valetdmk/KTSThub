import axios from "axios";
import { api } from "../../entities/api";
import type { User } from "../../entities/user/model";

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
};

export type UpdateUserPayload = {
    name: string;
    lastName: string;
    username: string;
    birthday: string;
    email: string;
    phone: string | null;
    telegram: string | null;
    job: string | null;
    level: string | null;
    skills: { skillId: number; level: number }[];
};

function shouldTryNextEndpoint(error: unknown) {
    if (!axios.isAxiosError(error)) {
        return false;
    }

    const responseData = error.response?.data;
    const detailedMessage =
        responseData && typeof responseData === "object" && "detailedMessage" in responseData
            ? responseData.detailedMessage
            : null;

    if (typeof detailedMessage === "string" && detailedMessage.includes("No static resource")) {
        return true;
    }

    return error.response?.status === 404;
}

export const updateUserProfile = async (id: number, data: UpdateUserPayload): Promise<User> => {
    const candidates: Array<{ method: "post" | "put"; url: string }> = [
        { method: "post", url: `/user/${id}` },
        { method: "put", url: `/user/${id}` },
        { method: "post", url: `/users/${id}` },
        { method: "put", url: `/users/${id}` },
    ];

    let lastError: unknown = null;

    for (const candidate of candidates) {
        try {
            const response =
                candidate.method === "post"
                    ? await api.post<User>(candidate.url, data)
                    : await api.put<User>(candidate.url, data);

            return response.data;
        } catch (error) {
            lastError = error;

            if (!shouldTryNextEndpoint(error)) {
                throw error;
            }
        }
    }

    throw lastError ?? new Error("Unable to update user profile");
};
