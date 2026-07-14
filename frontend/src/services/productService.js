import api from "../api/axios";

export const fetchProducts = async ({
    page = 1,
    search = "",
    category_id = "",
    sort = "",
}) => {

    return api.get("/api/products", {
        params: {
            page,
            search,
            category_id,
            sort,
        },
    });
};

export const fetchProductById = async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
}

export const fetchProductBySlug = async (slug) => {
    const response = await api.get(`/api/products/slug/${slug}`);
    return response.data;
}