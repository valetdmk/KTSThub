import axios from "axios";

const unsafeErrorMessagePatterns = [
    "exception",
    "stack",
    "trace",
    "sql",
    "syntaxerror",
    "referenceerror",
    "typeorm",
    "sequelize",
    "axioserror",
    "http://",
    "https://",
    "/api/",
    "no static resource",
];

function isSafeUserMessage(value: unknown): value is string {
    if (typeof value !== "string") {
        return false;
    }

    const normalizedMessage = value.trim();

    if (!normalizedMessage || normalizedMessage.length > 160) {
        return false;
    }

    const lowerCasedMessage = normalizedMessage.toLowerCase();

    return !unsafeErrorMessagePatterns.some((pattern) => lowerCasedMessage.includes(pattern));
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
    if (!axios.isAxiosError(error)) {
        return fallbackMessage;
    }

    const responseData = error.response?.data;

    if (isSafeUserMessage(responseData)) {
        return responseData;
    }

    if (responseData && typeof responseData === "object") {
        const message = "message" in responseData ? responseData.message : null;
        const errorField = "error" in responseData ? responseData.error : null;

        if (isSafeUserMessage(message)) {
            return message;
        }

        if (isSafeUserMessage(errorField)) {
            return errorField;
        }
    }

    if (error.code === "ECONNABORTED") {
        return "Сервер долго не отвечает. Проверь VPN или доступ к сети колледжа.";
    }

    if (!error.response) {
        return "Нет соединения с сервером. Проверь VPN или подключение к сети колледжа.";
    }

    if (error.response.status === 400) {
        return fallbackMessage;
    }

    if (error.response.status === 401) {
        return "Неверный логин или пароль.";
    }

    if (error.response.status >= 500) {
        return "Сервер временно недоступен. Попробуй позже.";
    }

    return fallbackMessage;
}
