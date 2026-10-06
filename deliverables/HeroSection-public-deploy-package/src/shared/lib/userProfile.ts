import type { User } from "../../entities/user/model";

export const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='40' fill='%23500f72'/%3E%3Ccircle cx='40' cy='29' r='13' fill='%23fff'/%3E%3Cpath d='M15 72c2-15 12-23 25-23s23 8 25 23' fill='%23fff'/%3E%3C/svg%3E";

export type PlatformUserData = {
    lastName: string;
    firstName: string;
    avatar: string;
    username: string;
    email: string;
    birthday?: string;
    age?: string;
    gender?: string;
    phone?: string;
    social?: string;
    github?: string;
    description?: string;
    role?: string;
    status?: string;
    job?: string;
    level?: string;
    points?: number;
    projectsCount?: number;
};

export const fallbackUser: PlatformUserData = {
    lastName: "Фамилия",
    firstName: "Имя",
    avatar: DEFAULT_AVATAR,
    username: "",
    email: "email@example.com",
    birthday: "",
    age: "",
    gender: "",
    phone: "",
    social: "",
    github: "",
    description: "",
    role: "",
    status: "",
    job: "",
    level: "",
    points: 0,
    projectsCount: 0,
};

function calculateAge(birthday?: string) {
    if (!birthday) {
        return "";
    }

    const today = new Date();
    const birthDate = new Date(birthday);

    if (Number.isNaN(birthDate.getTime())) {
        return "";
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }

    return String(age);
}

export function readSavedUser() {
    const savedUser = localStorage.getItem("platformUser");

    if (!savedUser) {
        return fallbackUser;
    }

    try {
        return { ...fallbackUser, ...JSON.parse(savedUser) } as PlatformUserData;
    } catch {
        localStorage.removeItem("platformUser");
        return fallbackUser;
    }
}

export function mapBackendUserToPlatformUser(user: User | null, savedUser = readSavedUser()): PlatformUserData {
    if (!user) {
        return savedUser;
    }

    return {
        ...savedUser,
        lastName: user.lastName ?? user.lastname ?? savedUser.lastName,
        firstName: user.name ?? savedUser.firstName,
        avatar: user.avatar ?? savedUser.avatar,
        username: user.username ?? savedUser.username,
        email: user.email ?? savedUser.email,
        birthday: user.birthday ?? savedUser.birthday,
        age: calculateAge(user.birthday) || savedUser.age,
        gender: user.gender ?? savedUser.gender,
        phone: user.phone ?? savedUser.phone,
        social: user.telegram ?? savedUser.social,
        github: user.github ?? savedUser.github,
        description: user.bio ?? savedUser.description,
        role: user.role ?? savedUser.role,
        status: user.status ?? savedUser.status,
        job: user.job ?? savedUser.job,
        level: user.level ?? savedUser.level,
        points: user.points ?? savedUser.points,
        projectsCount: user.projectsCount ?? savedUser.projectsCount,
    };
}
