import api from "./api";

export const registerCompany = (data) =>
    api.post("/auth/register", data);

export const verifyEmail = (token) =>
    api.get(`/auth/verify/${token}`);

export const loginCompany = (data) =>
    api.post("/auth/login", data);

export const refreshToken = () =>
    api.post("/auth/refresh");

export const logout = (data) =>
    api.post("/auth/logout", data);