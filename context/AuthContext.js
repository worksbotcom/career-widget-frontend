"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logout as logoutRequest } from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const syncAuthState = () => {
        if (typeof window === "undefined") {
            return;
        }

        const token = Cookies.get("accessToken") || localStorage.getItem("accessToken");

        if (token) {
            setUser({ token });
            return;
        }

        setUser(null);
    };

    useEffect(() => {
        syncAuthState();
        setLoading(false);
    }, []);

    const login = (userData) => {
        const token = userData?.token || userData?.accessToken;

        if (token) {
            Cookies.set("accessToken", token, {
                expires: 1,
                path: "/"
            });

            localStorage.setItem("accessToken", token);

            if (userData?.refreshToken) {
                Cookies.set("refreshToken", userData.refreshToken, {
                    expires: 7,
                    path: "/"
                });
                localStorage.setItem("refreshToken", userData.refreshToken);
            }

            if (userData?.company) {
                localStorage.setItem("company", JSON.stringify(userData.company));
            }
        }

        setUser(token ? { token, ...userData } : null);
    };

    const clearAuthState = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("adminToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("company");
        localStorage.removeItem("adminToken");

        setUser(null);
    };

    const logout = async () => {
        const refreshTokenValue = Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

        try {

            if (refreshTokenValue) {

                await logoutRequest({ refreshToken: refreshTokenValue });

            }

        } catch (error) {

            console.error("Logout failed:", error);

        } finally {

            clearAuthState();

        }

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuthContext = () => useContext(AuthContext);