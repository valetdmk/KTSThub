import axios from "axios";
import { apiBaseUrl } from "./endpoints";
import { clearAuthStorage } from "../lib/auth";
import { USE_MOCK_BACKEND } from "../config/devFlags";

export const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use((config) => {
    if (USE_MOCK_BACKEND) {
        return Promise.reject(new Error("Backend is disabled in frontend-only mode."));
    }

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (USE_MOCK_BACKEND) {
            return Promise.reject(err);
        }

        if (err.response?.status === 401) {
            clearAuthStorage();
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);
