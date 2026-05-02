type JwtPayload = {
    id?: number | string;
    userId?: number | string;
    sub?: number | string;
};

function decodeBase64Url(value: string) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

    return atob(padded);
}

export function getUserIdFromToken(token: string): number | null {
    try {
        const [, payload] = token.split(".");

        if (!payload) {
            return null;
        }

        const parsedPayload = JSON.parse(decodeBase64Url(payload)) as JwtPayload;
        const rawUserId = parsedPayload.userId ?? parsedPayload.id ?? parsedPayload.sub;

        if (typeof rawUserId === "number") {
            return Number.isFinite(rawUserId) ? rawUserId : null;
        }

        if (typeof rawUserId === "string" && rawUserId.trim() !== "") {
            const normalizedUserId = Number(rawUserId);
            return Number.isFinite(normalizedUserId) ? normalizedUserId : null;
        }

        return null;
    } catch {
        return null;
    }
}
