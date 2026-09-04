import api from "@/lib/axios";

// Get all published jobs for a company
export const getPublishedJobs = (companyId) => {
    return api.get(companyId ? `/widget/${companyId}/jobs` : "/widget/jobs");
};

// Get single published job for a company
export const getPublishedJob = (companyId, jobId) => {
    return api.get(
        companyId ? `/widget/${companyId}/jobs/${jobId}` : `/widget/jobs/${jobId}`
    );
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