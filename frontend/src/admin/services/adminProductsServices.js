import api from "../../api/axios";

export const fetchProducts = async (page = 1) => {
    return api.get(`/api/products?page=${page}`);
}

export const fetchProductById = async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
}

export const createProduct = async (productData) => {
    const response = await api.post("/api/admin/products", productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/api/admin/products/${id}`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`/api/admin/products/${id}`);
    return response.data;
}