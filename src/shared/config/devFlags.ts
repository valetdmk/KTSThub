// Temporary frontend-only switches for local UI work.
export const USE_MOCK_BACKEND =
    import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_BACKEND !== "false";

export const USE_MOCK_REGISTER_FLOW =
    USE_MOCK_BACKEND || (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_REGISTER_FLOW === "true");
