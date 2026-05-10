const DEFAULT_API_ORIGIN = "http://localhost:8080";
const DEFAULT_API_BASE_PATH = "/api";

function normalizePathSegment(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
        return "";
    }

    return trimmed.replace(/^\/+|\/+$/g, "");
}

function buildApiBaseUrl() {
    const origin = (import.meta.env.VITE_API_ORIGIN ?? DEFAULT_API_ORIGIN).trim().replace(/\/+$/g, "");
    const basePath = normalizePathSegment(import.meta.env.VITE_API_BASE_PATH ?? DEFAULT_API_BASE_PATH);
    const version = normalizePathSegment(import.meta.env.VITE_API_VERSION ?? "");
    const segments = [basePath, version].filter(Boolean);

    return segments.length > 0 ? `${origin}/${segments.join("/")}` : origin;
}

export const apiBaseUrl = buildApiBaseUrl();

export const apiPaths = {
    auth: {
        signup: "/auth/signup",
        signin: "/auth/signin",
    },
    users: {
        collection: "/admin/getall-users",
        me: "/user",
        byId: (id: string) => `/user/${id}`,
        password: (id: string) => `/user/${id}/change-password`,
    },
    events: {
        collection: "/schedule",
        byId: (id: number) => `/events/${id}`,
        scheduleById: (id: number) => `/schedule/${id}`,
    },
} as const;
