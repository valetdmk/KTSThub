export interface RegisterPayload {
    name: string;
    lastname: string;
    username: string;
    birthday: string;
    email: string;
    password: string;
}

export interface RegisterState {
    step: number;
    loading: boolean;
    error: string | null;
    token: string | null;
    userId: number | null;
}
