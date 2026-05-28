export interface User {
    id: string;
    username: string;
    lastname?: string;
    lastName?: string;
    fullName?: string;
    birthday?: string;
    name: string;
    email: string;
    avatar?: string | null;
    bio?: string | null;
    phone?: string | null;
    telegram?: string | null;
    github?: string | null;
    role?: string;
    status?: string;
    gender?: string | null;
    job?: string | null;
    level?: string | null;
    points?: number;
    projectsCount?: number;
    createdAt?: string;
    skills?: Array<{
        id: number;
        level: number;
        skill: {
            id: number;
            name: string;
            category: string;
        };
    }>;
    achievements?: Array<{
        id: number;
        achievements: {
            id: number;
            name: string;
            description: string;
            icon: string;
            pointsRequired: number;
        };
    }>;
}
