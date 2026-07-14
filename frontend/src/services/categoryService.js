import api from "../api/axios";

export const fetchCategories = async () => {
    return api.get("/api/categories");
}

export const fetchCategoryById = async (id) => {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
}