import styles from "../../../styles/components/common/cartButton.module.css";
import { useCart } from "../../../context/CartContext";
import cartIcon from '../../../assets/icons/cart.png';

export default function CartFloatingButton() {
    const { cart, setIsOpen, isOpen } = useCart();

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <button className={`${styles.floatingButton} ${isOpen ? styles.isOpen : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>
    );
}
