import { Link } from "react-router-dom";
import styles from "../../styles/pages/products/products.module.css";
import DeleteModal from "../../components/DeleteModal";
import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../../services/adminProductsServices";

import prodImg from "../../../assets/images/empt_img.png";
import Pagination from "../../../components/common/Pagination";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDescription, setShowDescription] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    async function getProducts(page = 1) {
        setLoading(true);

        try {
            const response = await fetchProducts(page);

            setProducts(response.data.data);

            setPagination({
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                total: response.data.total,
            });

        } catch (error) {
            toast.error("Failed to fetch products.");
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function handleDeleteProduct(id) {
        setProductToDelete(id);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        if (!productToDelete) return;

        setLoading(true);

        try {
            await deleteProduct(productToDelete);
            await getProducts(pagination.currentPage);
            toast.success("Product deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete product.");
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    }

    return (
        <div className={styles.productsContainer}>
            <div className={styles.productsHeader}>
                <h1 className={styles.productsTitle}>Products <span className={styles.productCount}>({pagination.total})</span></h1>

                <Link to="/admin/products/create" className={styles.createProductButton}>
                    Create New Product
                </Link>
            </div>

            <div className={styles.productsList}>
                {loading ? (
                    <p className={styles.loadingMessage}>Loading products...</p>
                ) :
                    products.length === 0 ? (
                        <p className={styles.noProductsMessage}>No products found.</p>
                    ) :
                        (
                            products.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <img src={product.image_url || prodImg} alt={product.name} className={styles.productImage} />

                                    <div className={styles.productInfo}>
                                        <h2 className={styles.productName}>{product.name}</h2>

                                        {product.category && (
                                            <p className={styles.productCategory}>Category: {product.category.name}</p>
                                        )}

                                        <p className={`${styles.productDescription} ${showDescription === product.id ? styles.showDescription : styles.hideDescription}`} onClick={() => setShowDescription(showDescription === product.id ? null : product.id)}>
                                            {product.description}
                                        </p>

                                        <p className={styles.productPrice}>Price: ${product.price}</p>
                                        <p className={styles.productStock}>Stock: {product.stock}</p>

                                        {product.carbon_score !== null && product.carbon_score !== undefined && (
                                            <p className={styles.productCarbonScore}>Carbon Score: {product.carbon_score}</p>
                                        )}
                                        {product.is_sustainable !== null && product.is_sustainable !== undefined && (
                                            <p className={styles.productSustainability}>Sustainable: {product.is_sustainable ? "Yes" : "No"}</p>
                                        )}
                                    </div>

                                    <div className={styles.productActions}>
                                        <Link to={`/admin/products/edit/${product.id}`} className={styles.editButton}>
                                            Edit Product
                                        </Link>
                                        <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteButton}>
                                            Delete Product
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
            </div>

            {pagination.lastPage > 1 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    lastPage={pagination.lastPage}
                    onPageChange={getProducts}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={confirmDelete}
                />
            )}
        </div>
    );
}