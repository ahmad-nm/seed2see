import { useEffect, useState } from "react";
import styles from "../../styles/pages/categories/editCategory.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
    fetchCategoryById,
    updateCategory,
} from "../../services/adminCategoryServices";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import { toast } from "react-toastify";

export default function EditCategory() {
    const id = useParams().id;
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await fetchCategoryById(id);
                setFormData({
                    name: response.name,
                    description: response.description,
                    image: null,
                });
            } catch (error) {
                toast.error("Failed to fetch category details.");
            }
        }

        fetchCategory();
    }, [id]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);

    async function handleFormSubmit(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            if (formData.image) {
                data.append("image", formData.image);
            }

            const response = await updateCategory(id, data);
            // Handle success (e.g., show a success message, redirect, etc.)
            console.log("Category updated:", response);

            setFormData({
                name: "",
                description: "",
                image: null,
            });

            navigate("/admin/categories");
        } catch (error) {
            toast.error("Failed to update category.");
            console.error("Error updating category:", error);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: [
                        error.response?.data?.message ||
                        "An unexpected error occurred."
                    ]
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.EditCategoryContainer}>
            <h1 className={styles.EditCategoryTitle}>Edit Category</h1>

            <form className={styles.EditCategoryForm} onSubmit={handleFormSubmit}>
                <div className={styles.FormGroup}>
                    <label htmlFor="image" className={styles.FormLabel}>
                        Image
                    </label>
                    <Input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={(e) =>
                            setFormData({ ...formData, image: e.target.files[0] })
                        }
                    />

                    {errors.image && (
                        <span className={styles.ErrorMessage}>
                            {errors.image[0]}
                        </span>
                    )}

                    <label htmlFor="name" className={styles.FormLabel}>
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
                        <span className={styles.ErrorMessage}>
                            {errors.name[0]}
                        </span>
                    )}

                    <label htmlFor="description" className={styles.FormLabel}>
                        Description
                    </label>
                    <TextArea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                    />

                    {errors.description && (
                        <span className={styles.ErrorMessage}>
                            {errors.description[0]}
                        </span>
                    )}
                </div>
                
                <button type="submit" className={styles.SubmitButton}>
                    Update Category
                </button>
            </form>
        </div>
    );
}
