import api from '../../api/axios';

export const getAllUsers = async (params) => {
    const response = await api.get('/api/admin/users', { params });
    return response.data;
}

export const changeUserRole = async (userId, newRole) => {
    const response = await api.put(`/api/admin/users/${userId}/role`, { role: newRole });
    return response.data;
}

export const verifyUser = async (userId) => {
    const response = await api.put(`/api/admin/users/${userId}/verify`);
    return response.data;
}

export const unverifyUser = async (userId) => {
    const response = await api.put(`/api/admin/users/${userId}/unverify`);
    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
}