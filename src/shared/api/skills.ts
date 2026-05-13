import { api } from "./base";
import { apiPaths } from "./endpoints";

export type BackendSkill = {
    id: number;
    name: string;
    category: string;
};

export const skillsApi = {
    getAllSkills: async (): Promise<BackendSkill[]> => {
        const response = await api.get<BackendSkill[]>(apiPaths.skills.collection);
        return response.data;
    },
};
