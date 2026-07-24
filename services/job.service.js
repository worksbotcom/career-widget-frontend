import api from "@/lib/axios";

// Get all jobs (pass { page, limit } to paginate; omit for the full list)
export const getJobs = (params = {}) => {
    return api.get("/jobs", { params });
};

// Get single job
export const getJob = (id) => {
    return api.get(`/jobs/${id}`);
};

// Create job
export const createJob = (data) => {
    return api.post("/jobs", data);
};

// Update job
export const updateJob = (id, data) => {
    return api.put(`/jobs/${id}`, data);
};

// Delete job
export const deleteJob = (id) => {
    return api.delete(`/jobs/${id}`);
};

// Publish job
export const publishJob = (id) => {
    return api.patch(`/jobs/${id}/publish`);
};

// Close job
export const closeJob = (id) => {
    return api.patch(`/jobs/${id}/close`);
};

// Archive job
export const archiveJob = (id) => {
    return api.patch(`/jobs/${id}/archive`);
};