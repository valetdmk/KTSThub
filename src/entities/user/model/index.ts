export interface User {
    id: number;
    username: string;
    lastname?: string;
    lastName?: string;
    birthday?: string;
    name: string;
    email: string;
    phone?: string | null;
    telegram?: string | null;
    role?: string;
    status?: string;
    job?: string | null;
    level?: string | null;
}
