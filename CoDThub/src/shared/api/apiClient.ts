import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://", // URL бэкенда
    headers: {
        "Content-Type": "application/json",
    },
});