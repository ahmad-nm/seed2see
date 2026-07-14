import api from '../api/axios';

export const createContactMessage = async (data) => {
    const response = await api.post('/api/contact', data);
    return response.data;
}