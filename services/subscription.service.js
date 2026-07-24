import api from "./api";

export const getSubscriptions = () =>
    api.get("/subscriptions");

export const createSubscription = (data) =>
    api.post("/subscriptions", data);

export const updateSubscription = (id, data) =>
    api.put(`/subscriptions/${id}`, data);

export const deleteSubscription = (id) =>
    api.delete(`/subscriptions/${id}`);

export const analytics = () =>
    api.get("/subscriptions/analytics");


export const getCurrentSubscription = () => {

    return api.get("/company-subscriptions/my");

};

export const getSubscriptionPlans = () => {

    return api.get("/plans");

};

export const changePlan = (companyId, data) => {

    return api.put(

        `/company-subscriptions/${companyId}/change-plan`,

        data

    );

};

export const renewSubscription = (companyId) => {

    return api.patch(

        `/company-subscriptions/${companyId}/renew`

    );

};

export const cancelSubscription = (companyId) => {

    return api.patch(

        `/company-subscriptions/${companyId}/cancel`

    );

};