import api from "@/lib/axios";

// Get all team members
export const getTeamMembers = () => {
    return api.get("/team-members");
};

// Get one team member
export const getTeamMember = (id) => {
    return api.get(`/team-members/${id}`);
};

// Create team member
export const createTeamMember = (data) => {
    return api.post("/team-members", data);
};

// Update team member
export const updateTeamMember = (id, data) => {
    return api.put(`/team-members/${id}`, data);
};

// Delete team member
export const deleteTeamMember = (id) => {
    return api.delete(`/team-members/${id}`);
};

