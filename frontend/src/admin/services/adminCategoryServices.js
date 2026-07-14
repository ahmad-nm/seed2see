import api from "../../api/axios";

export const fetchCategories = async () => {
    return api.get("/api/categories");
}

export const fetchCategoryById = async (id) => {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
}

export const createCategory = async (categoryData) => {
    const response = await api.post("/api/admin/categories", categoryData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/api/admin/categories/${id}`, categoryData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteCategory = async (id) => {
    const response = await api.delete(`/api/admin/categories/${id}`);
    return response.data;
}