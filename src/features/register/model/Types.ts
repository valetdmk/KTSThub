export interface RegisterPayload {
    name: string;
    lastname: string;
    username: string;
    birthday: string;
    email: string;
    password: string;
    gender: "MALE" | "FEMALE";
}

export interface RegisterState {
    step: number;
    loading: boolean;
    error: string | null;
    token: string | null;
    userId: string | null;
    gender: "MALE" | "FEMALE" | null;
}
