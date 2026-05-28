type JwtPayload = {
    id?: number | string;
    userId?: number | string;
    sub?: number | string;
};

export function clearAuthStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("platformUser");
}

function decodeBase64Url(value: string) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

    return atob(padded);
}

export function getUserIdFromToken(token: string): string | null {
    try {
        const [, payload] = token.split(".");

        if (!payload) {
            return null;
        }

        const parsedPayload = JSON.parse(decodeBase64Url(payload)) as JwtPayload;
        const rawUserId = parsedPayload.userId ?? parsedPayload.id ?? parsedPayload.sub;

        if (typeof rawUserId === "number") {
            return Number.isFinite(rawUserId) ? String(rawUserId) : null;
        }

        if (typeof rawUserId === "string" && rawUserId.trim() !== "") {
            return rawUserId.trim();
        }

        return null;
    } catch {
        clearAuthStorage();
        return null;
    }
}
