import { useState } from "react";
import styles from "../../styles/pages/categories/createCategory.module.css";
import { createCategory } from "../../services/adminCategoryServices";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import { toast } from "react-toastify";

export default function CreateCategory() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    async function handleFormSubmit(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const data = new FormData();
            
            data.append("name", formData.name);
            data.append("slug", formData.slug);
            data.append("description", formData.description);
            
            if (formData.image) {
                data.append("image", formData.image);
            }

            const response = await createCategory(data);
            // Handle success (e.g., show a success message, redirect, etc.)
            console.log("Category created:", response);

            setFormData({
                name: "",
                slug: "",
                description: "",
                image: null,
            });

            toast.success("Category created successfully!");

            navigate("/admin/categories");
        } catch (error) {
            toast.error("Failed to create category.");
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
        <div className={styles.CreateCategoryContainer}>
            <h1 className={styles.CreateCategoryTitle}>Create Category</h1>

            <form className={styles.CreateCategoryForm} onSubmit={handleFormSubmit}>
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

                    {/* <label htmlFor="slug" className={styles.FormLabel}>Slug</label>
                    <Input type="text" id="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className={styles.FormInput} /> */}

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
                <button
                    type="submit"
                    className={styles.SubmitButton}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Category"}
                </button>
            </form>
        </div>
    );
}
