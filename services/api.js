import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

const getCookieToken = (name) => {
    if (typeof window === "undefined") {
        return null;
    }

    const token = Cookies.get(name);

    if (!token || token === "undefined" || token === "null") {
        return null;
    }

    return token;
};

const isAdminRequest = (config) => {
    const url = config.url || "";
    return url.startsWith("/superadmin") || url.startsWith("/subscriptions");
};

api.interceptors.request.use((config) => {
    const adminToken = getCookieToken("adminToken");
    const accessToken = getCookieToken("accessToken");
    const token = isAdminRequest(config) ? adminToken : accessToken;

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const config = error.config || {};
            const useAdmin = isAdminRequest(config);

            if (useAdmin) {
                Cookies.remove("adminToken");
                window.location.href = "/admin/login";
            } else {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;