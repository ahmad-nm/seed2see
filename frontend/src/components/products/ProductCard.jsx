import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/components/products/productCard.module.css';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCart();

    const isCategoryPage = location.pathname.includes('/products/category/');

    return (
        <div className={styles.productCard}>
            <button className={styles.addToCartButton} onClick={() => addToCart(product)}>
                +
            </button>
            
            <img src={product.image_url} alt={product.name} className={styles.productImage} />
            
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
            
            <div className={styles.productActionButtons}>
                {!isCategoryPage ? (
                    <div className={styles.tooltipWrapper}>
                        <button
                            className={`${styles.productCardButton} ${styles.categoryButton}`}
                            onClick={() => navigate(`/products/category/${(product.category.name).toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                            View {((product.category.name).slice(0, 1).toUpperCase() + (product.category.name).slice(1)).replace(/-/g, ' ')} Products
                        </button>

                        <div className={styles.tooltip}>
                            {((product.category.name).slice(0, 1).toUpperCase() + (product.category.name).slice(1)).replace(/-/g, ' ')} Products
                        </div>
                    </div>
                ) : (
                    <div className={styles.tooltipWrapper}>
                        <button
                            className={`${styles.productCardButton} ${styles.categoryButton}`}
                            onClick={() => navigate(`/products`)}
                        >
                            View All Products
                        </button>
                        
                        <div className={styles.tooltip}>
                            All Products
                        </div>
                    </div>
                )}

                <button 
                    className={`${styles.productCardButton} ${styles.detailsButton}`}
                    onClick={() => {navigate(`/products/${product.slug}`)}}    
                >
                    View Details →
                </button>
            </div>
        </div>
    );
}