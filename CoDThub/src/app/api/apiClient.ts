import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://10.3.25.106:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});