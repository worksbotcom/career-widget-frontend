import api from "@/lib/axios";

export const getLocations = () => {

    return api.get("/locations");

};

export const getLocation = (id) => {

    return api.get(`/locations/${id}`);

};

export const createLocation = (data) => {

    return api.post("/locations", data);

};

export const updateLocation = (id, data) => {

    return api.put(`/locations/${id}`, data);

};

export const deleteLocation = (id) => {

    return api.delete(`/locations/${id}`);

};