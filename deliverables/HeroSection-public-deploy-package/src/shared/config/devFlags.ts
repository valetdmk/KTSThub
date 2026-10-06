export const USE_MOCK_BACKEND =
    import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_BACKEND === "true";

export const USE_MOCK_REGISTER_FLOW =
    USE_MOCK_BACKEND || (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_REGISTER_FLOW === "true");
