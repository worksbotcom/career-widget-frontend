import api from "./api";

export const getCompanyAuditLogs = (params) =>
    api.get("/company/logs", { params });

export const getAdminAuditLogs = (params) =>
    api.get("/superadmin/logs", { params });
