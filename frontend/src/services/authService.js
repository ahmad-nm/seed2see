import api from "../api/axios";

export const register = async (data) => {
    await api.get("/sanctum/csrf-cookie"); // Get CSRF token

    return api.post("/api/register", data);
}

export const login = async (data) => {
    await api.get("/sanctum/csrf-cookie"); // Get CSRF token

    return api.post("/api/login", data);
}

export const logout = async () => {
    return api.post("/api/logout");
}

export const getUser = async () => {
    return api.get("/api/user");
}

export const deleteAccount = async () => {
    return api.delete("/api/delete-account");
}

export const resendVerificationEmail = async () => {
    return api.post("/api/email/verification-notification");
};

export const forgotPassword = async (data) => {
    await api.get("/sanctum/csrf-cookie"); // Get CSRF token

    return api.post("/api/forgot-password", data);
};

export const resetPassword = async (data) => {
    await api.get("/sanctum/csrf-cookie"); // Get CSRF token

    return api.post("/api/reset-password", data);
};