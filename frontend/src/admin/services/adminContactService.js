import api from "../../api/axios";

export const fetchContactMessages = async (page = 1) => {
    const response = await api.get(`/api/admin/messages?page=${page}`);
    return response.data;
}

export const showContactMessage = async (id) => {
    const response = await api.get(`/api/admin/messages/${id}`);
    return response.data;
}

export const toggleMarkAsRead = async (id) => {
    const response = await api.patch(`/api/admin/messages/${id}/toggle-read`);
    return response.data;
}

export const deleteMessage = async (id) => {
    const response = await api.delete(`/api/admin/messages/${id}`);
    return response.data;
}