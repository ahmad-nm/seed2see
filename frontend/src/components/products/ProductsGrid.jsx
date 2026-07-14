import ProductCard from "./ProductCard";
import styles from "../../styles/components/products/productsGrid.module.css";

export default function ProductsGrid({ products }) {
    return (
        <>
            {products.length === 0 ? (
                <p className={styles.noProductsMessage}>No products found.</p>
            ) : (
                <div className={styles.productsGrid}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            )}
        </>
    );
}