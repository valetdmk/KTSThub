import axios from "axios";

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
    if (!axios.isAxiosError(error)) {
        return fallbackMessage;
    }

    const responseData = error.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    if (responseData && typeof responseData === "object") {
        const message = "message" in responseData ? responseData.message : null;
        const errorField = "error" in responseData ? responseData.error : null;
        const detailedMessage = "detailedMessage" in responseData ? responseData.detailedMessage : null;

        if (typeof message === "string" && message.trim()) {
            return message;
        }

        if (typeof errorField === "string" && errorField.trim()) {
            return errorField;
        }

        if (typeof detailedMessage === "string" && detailedMessage.trim()) {
            return detailedMessage;
        }
    }

    if (error.code === "ECONNABORTED") {
        return "Сервер долго не отвечает. Проверь VPN или доступ к сети колледжа.";
    }

    if (!error.response) {
        return "Нет соединения с сервером. Проверь VPN или подключение к сети колледжа.";
    }

    if (error.response.status === 401) {
        return "Неверный логин или пароль.";
    }

    if (error.response.status >= 500) {
        return "Сервер временно недоступен. Попробуй позже.";
    }

    return fallbackMessage;
}
