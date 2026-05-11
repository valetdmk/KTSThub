// Backend is intentionally disabled for the frontend-only flow.
export const USE_MOCK_BACKEND = true;

// Keep registration/profile flows in local-only mode as well.
export const USE_MOCK_REGISTER_FLOW = true;

// Original env-based switches are left below for reference and can be restored later.
// export const USE_MOCK_BACKEND =
//     import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_BACKEND !== "false";
//
// export const USE_MOCK_REGISTER_FLOW =
//     USE_MOCK_BACKEND || (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_REGISTER_FLOW === "true");
