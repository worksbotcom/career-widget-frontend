import api from "@/lib/axios";

// Get all applications (supports jobId, status, page, limit)
export const getApplications = (params = {}) => {
    return api.get("/applications", { params });
};

// Export applications as CSV/Excel (respects jobId & status filters)
export const exportApplications = (params = {}) => {
    return api.get("/applications/export", {
        params,
        responseType: "blob",
    });
};

// Get single application
export const getApplication = (id) => {
    return api.get(`/applications/${id}`);
};

// Get applications for a job
export const getApplicationsByJob = (jobId) => {
    return api.get(`/applications/job/${jobId}`);
};

// Download resume
export const downloadResume = (id) => {
    return api.get(`/applications/${id}/download`, {
        responseType: "blob",
    });
};

// Update application status
export const updateApplicationStatus = (id, data) => {
    return api.patch(`/applications/${id}/status`, data);
};

// Delete application
export const deleteApplication = (id) => {
    return api.delete(`/applications/${id}`);
};