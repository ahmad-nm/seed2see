import { useParams } from "react-router-dom";
import styles from "../../styles/pages/productDetails.module.css";
import { fetchProductBySlug } from "../../services/productService";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Hero from "../../components/common/hero";

export default function ProductDetails() {
    const { productSlug } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getProductBySlug() {
            try {
                setLoading(true);
                const response = await fetchProductBySlug(productSlug);
                setProduct(response);
            } catch (err) {
                setError("Failed to load product.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getProductBySlug();
    }, [productSlug]);

    if (loading) {
        return <div className={styles.loader}>Loading product...</div>;
    }

    if (error || !product) {
        return <div className={styles.error}>{error || "Product not found"}</div>;
    }

    return (
        <div className={styles.productDetailsContainer}>
            <Hero 
                title={product.name}
                subtitle={product.category.name} 
                backgroundImage={product.image_url || "https://via.placeholder.com/300"} 
            />
            
            <div className={styles.productDetailsCardContainer}>
                <div className={styles.card}>
                    <div className={styles.imageSection}>
                        <img
                            src={product.image_url || "https://via.placeholder.com/300"}
                            alt={product.name}
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        <h1 className={styles.title}>{product.name}</h1>

                        <p className={styles.description}>
                            {product.description || "No description available."}
                        </p>

                        <div className={styles.price}>
                            ${product.price}
                        </div>

                        <div className={styles.meta}>
                            <span className={styles.stock}>
                                Stock: {product.stock}
                            </span>

                            <span
                                className={`${styles.badge} ${
                                    product.is_sustainable
                                        ? styles.sustainable
                                        : styles.notSustainable
                                }`}
                            >
                                {product.is_sustainable
                                    ? "Sustainable"
                                    : "Not Sustainable"}
                            </span>
                        </div>

                        {product.carbon_score !== null && (
                            <div className={styles.carbon}>
                                🌱 Carbon Score: {product.carbon_score}/100
                            </div>
                        )}

                        <button className={styles.button} onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}