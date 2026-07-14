import styles from "../../../styles/components/common/cartDrawer.module.css";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CartDrawer() {
    const {
        cart,
        isOpen,
        setIsOpen,
        removeFromCart,
        updateQty,
    } = useCart();

    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
            <div
                className={styles.drawer}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={styles.drawerTitle}>🛒 Your Cart</h2>

                {cart.length === 0 ? (
                    <p className={styles.emptyCart}>Cart is empty</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.itemDetails}>
                                <div className={styles.imageWrapper}>
                                    <img src={item.image_url} alt="no img" />
                                </div>
                                <div className={styles.itemInfo}>
                                    <strong>{item.name}</strong>
                                    <p>${item.price}</p>
                                </div>
                            </div>

                            <div className={styles.controls}>
                                <button
                                    onClick={() =>
                                        updateQty(item, item.qty - 1)
                                    }
                                >
                                    -
                                </button>

                                <span>{item.qty}</span>

                                <button
                                    onClick={() =>
                                        updateQty(item, item.qty + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className={styles.removeButton}
                                onClick={() => removeFromCart(item.id)}
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <h3>Total: ${total.toFixed(2)}</h3>

                        <button
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed to Buy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}