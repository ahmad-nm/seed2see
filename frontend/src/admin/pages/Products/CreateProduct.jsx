import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import { createProduct } from "../../services/adminProductsServices";
import styles from "../../styles/pages/products/createProduct.module.css";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../services/adminCategoryServices";
import TextArea from "../../../components/common/TextArea";
import { toast } from "react-toastify";

export default function CreateProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        image: null,
        carbon_score: "",
        is_sustainable: false,
        category_id: "",
    });

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (error) {
                toast.error("Failed to fetch categories.");
                console.error("Error fetching categories:", error);
            }
        }

        getCategories();
    }, []);

    async function handleFormSubmit(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("stock", formData.stock);

            data.append("category_id", Number(formData.category_id));

            data.append("is_sustainable", formData.is_sustainable ? 1 : 0);

            if (formData.carbon_score !== "") {
                data.append("carbon_score", formData.carbon_score);
            }

            if (formData.image) {
                data.append("image", formData.image);
            }

            const response = await createProduct(data);

            console.log("Product created:", response);

            setFormData({
                name: "",
                slug: "",
                description: "",
                price: "",
                stock: "",
                image: null,
                carbon_score: "",
                is_sustainable: false,
                category_id: "",
            });

            toast.success("Product created successfully!");

            navigate("/admin/products");
        } catch (error) {
            toast.error("Failed to create product.");
            console.error("Error creating product:", error.response);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "An error occurred while creating the product." });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.createProductContainer}>
            <h1 className={styles.createProductTitle}>Create Product</h1>

            <form className={styles.createProductForm} onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="image" className={styles.formLabel}>
                        Image
                    </label>
                    <Input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />

                    {errors.image && 
                        <span className={styles.errorText}>
                            {errors.image[0]}
                        </span>
                    }

                    <label htmlFor="name" className={styles.formLabel}>
                        Name *
                    </label>
                    <Input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    {errors.name && (
                        <span className={styles.errorText}>
                            {errors.name[0]}
                        </span>
                    )}

                    <label htmlFor="description" className={styles.formLabel}>
                        Description
                    </label>
                    <TextArea
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    {errors.description && (
                        <span className={styles.errorText}>
                            {errors.description[0]}
                        </span>
                    )}

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="price" className={styles.formLabel}>
                                Price *
                            </label>
                            <Input
                                type="number"
                                id="price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />

                            {errors.price && (
                                <span className={styles.errorText}>
                                    {errors.price[0]}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="stock" className={styles.formLabel}>
                                Stock *
                            </label>
                            <Input
                                type="number"
                                id="stock"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                required
                            />

                            {errors.stock && (
                                <span className={styles.errorText}>
                                    {errors.stock[0]}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="carbon_score" className={styles.formLabel}>
                                Carbon Score
                            </label>
                            <Input
                                type="number"
                                id="carbon_score"
                                value={formData.carbon_score}
                                onChange={(e) => setFormData({ ...formData, carbon_score: e.target.value })}
                            />

                            {errors.carbon_score && (
                                <span className={styles.errorText}>
                                    {errors.carbon_score[0]}
                                </span>
                            )}
                        </div>

                        <div className={styles.checkboxContainer}>
                            <label htmlFor="is_sustainable" className={styles.formLabel}>
                                Is Sustainable
                            </label>
                            <input
                                className={styles.checkboxInput}
                                type="checkbox"
                                id="is_sustainable"
                                checked={formData.is_sustainable}
                                onChange={(e) => setFormData({ ...formData, is_sustainable: e.target.checked })}
                            />

                            {errors.is_sustainable && (
                                <span className={styles.errorText}>
                                    {errors.is_sustainable[0]}
                                </span>
                            )}
                        </div>
                    </div>

                    <label htmlFor="category_id" className={styles.formLabel}>
                        Category *
                    </label>
                    <select
                        className={styles.formSpinner}
                        id="category_id"
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    
                    {errors.category_id && (
                        <span className={styles.errorText}>
                            {errors.category_id[0]}
                        </span>
                    )}
                </div>
                <button
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    );
}

