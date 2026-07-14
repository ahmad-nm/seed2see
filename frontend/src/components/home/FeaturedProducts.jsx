import { useEffect, useState } from "react";
import styles from "../../styles/components/home/featuredProducts.module.css";
import { fetchProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    
    async function getProducts() {
        try {
            const response = await fetchProducts({ page: 1, search: "", category_id: "", sort: "" });
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3); // Randomly select 3 products

    return (
        <section className={styles.featuredProducts}>
            <h2>Featured Products</h2>
            <div className={styles.productsGrid}>
                {randomProducts.map((product, index) => (
                    <div key={index} className={styles.productCard} onClick={() => navigate('/products/' + product.slug)}>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className={styles.productImage}
                        />
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productDescription}>{product.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
