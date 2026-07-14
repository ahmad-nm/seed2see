import api from "../../api/axios";

export const getDashboardData = async () => {
    const response = await api.get("/api/admin/dashboard");
    return response.data;
}

export const getActivityLogs = async (page = 1) => {
    const response = await api.get(`/api/admin/dashboard/activities?page=${page}`);
    return response.data;
}

export const deleteActivity = async (activityId) => {
    const response = await api.delete(`/api/admin/dashboard/activities/${activityId}`);
    return response.data;
}