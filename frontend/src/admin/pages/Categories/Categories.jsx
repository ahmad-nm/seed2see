import { useEffect, useState } from "react";
import axios from "axios";
import { deleteCategory, fetchCategories } from "../../services/adminCategoryServices";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import styles from "../../styles/pages/categories/categories.module.css";
import catImg from "../../../assets/images/empt_img.png";
import { toast } from "react-toastify";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        async function fetchCat() {
            setLoading(true);

            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCat();
    }, []);

    async function handleDeleteCategory(id) {
        setCategoryToDelete(id);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        if (!categoryToDelete) return;

        setLoading(true);

        try {
            await deleteCategory(categoryToDelete);
            setCategories(
                categories.filter((category) => category.id !== categoryToDelete),
            );
            toast.success("Category deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete category.");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    }

    return (
        <div className={styles.categoriesContainer}>
            <div className={styles.categoriesHeader}>
                <h1 className={styles.categoriesTitle}>Categories</h1>

                <Link
                    to="/admin/categories/create"
                    className={styles.createCategoryButton}
                >
                    Create New Category
                </Link>
            </div>

            <div className={styles.categoriesList}>
                {loading ? (
                    <p className={styles.loadingMessage}>Loading categories...</p>
                ) : (
                    categories.map((category) => (
                        <div key={category.id} className={styles.categoryItem}>
                            <img
                                src={category.image_url || catImg}
                                alt={category.name}
                                className={styles.categoryImage}
                            />

                            <div className={styles.categoryInfo}>
                                <h2 className={styles.categoryName}>{category.name}</h2>
                                <p
                                    className={`${styles.categoryDescription} ${showDescription === category.id ? styles.showDescription : styles.hideDescription}`}
                                    onClick={() =>
                                        setShowDescription(
                                            showDescription === category.id ? null : category.id,
                                        )
                                    }
                                >
                                    {category.description}
                                </p>
                            </div>

                            <div className={styles.categoryActions}>
                                <Link
                                    to={`/admin/categories/edit/${category.id}`}
                                    className={styles.editButton}
                                >
                                    Edit Category
                                </Link>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className={styles.deleteButton}
                                >
                                    Delete Category
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={confirmDelete}
                />
            )}
        </div>
    );
}
