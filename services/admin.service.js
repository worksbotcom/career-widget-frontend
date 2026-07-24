import api from "./api";

export const adminLogin = (data) =>
    api.post("/superadmin/login", data);

export const getDashboard = () =>
    api.get("/superadmin/dashboard");

export const getCompanies = () =>
    api.get("/superadmin/companies");

export const getCompany = (companyId) =>
    api.get(`/superadmin/companies/${companyId}`);

export const updateCompanyStatus = (companyId, data) =>
    api.patch(`/superadmin/companies/${companyId}/status`, data);

export const deleteCompany = (companyId) =>
    api.delete(`/superadmin/companies/${companyId}`);