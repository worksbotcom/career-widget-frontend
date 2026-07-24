import api from "./api";

export const getProfile = () =>
    api.get("/company/profile");

export const updateProfile = (data) =>
    api.put("/company/profile", data);

export const regenerateApiKey = () =>
    api.post("/company/regenerate-api-key");

export const getWidgetScript = () =>
    api.get("/company/widget-script");

export const uploadLogo = (formData) =>
    api.put("/company/logo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const getSubscription = () =>
    api.get("/company/subscription");

export const getCompanyProfile = () => {
    return api.get("/company/profile");
};