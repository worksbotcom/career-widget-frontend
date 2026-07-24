import api from "@/lib/axios";

// Get all published jobs for a company
export const getPublishedJobs = (companyId) => {
    return api.get(`/widget/${companyId}/jobs`);
};

// Get single published job for a company
export const getPublishedJob = (companyId, jobId) => {
    return api.get(`/widget/${companyId}/jobs/${jobId}`);
};

// Apply for a job
export const applyForJob = (formData) => {
    return api.post(
        "/applications/apply",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};