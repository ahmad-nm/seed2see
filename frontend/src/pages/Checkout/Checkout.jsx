import Input from "../../components/common/Input";
import { useCart } from "../../context/CartContext";
import styles from "../../styles/pages/Checkout/checkout.module.css";
import { useState } from "react";

export default function Checkout() {
    const { cart, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCartMessage}>
                <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>

                <button className={styles.backToProductsButton} onClick={() => window.location.href = "/products"}>
                    Back to Products
                </button>
            </div>
        );
    }

    const [customer, setCustomer] = useState({
        fullName: "",
        phone: "",
        address: "",
        notes: "",
    });

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    const handleOrder = () => {
        if (!customer.fullName || !customer.phone || !customer.address) {
            alert("Please fill in all required fields.");
            return;
        }

        let message = `NEW ECO ORDER\n\n`;

        message += `Customer: ${customer.fullName}\n`;
        message += `Phone: ${customer.phone}\n`;
        message += `Address: ${customer.address}\n`;

        if (customer.notes) {
            message += `Notes: ${customer.notes}\n`;
        }

        message += `\n---------------------\n`;

        cart.forEach((item) => {
            message += `${item.name}\n`;
            message += `Qty: ${item.qty}\n`;
            message += `Price: $${item.price}\n`;
            message += `Subtotal: $${(
                item.price * item.qty
            ).toFixed(2)}\n\n`;
        });

        message += `---------------------\n`;
        message += `TOTAL: $${total.toFixed(2)}`;

        const phone = "96176036495";

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(
                message
            )}`,
            "_blank"
        );

        clearCart();
    };

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutGrid}>
                {/* LEFT */}
                <div className={styles.formCard}>
                    <h2>Customer Information</h2>

                    <div className={styles.field}>
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="fullName"
                            value={customer.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Phone Number *</label>
                        <input
                            type="text"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Address *</label>
                        <textarea
                            name="address"
                            rows="4"
                            value={customer.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Order Notes</label>
                        <textarea
                            name="notes"
                            rows="3"
                            value={customer.notes}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.summaryCard}>
                    <h2>Order Summary</h2>

                    <div className={styles.products}>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className={styles.product}
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                />

                                <div className={styles.productInfo}>
                                    <h4>{item.name}</h4>
                                    <p>
                                        Qty: {item.qty}
                                    </p>
                                </div>

                                <div className={styles.price}>
                                    $
                                    {(
                                        item.price *
                                        item.qty
                                    ).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totals}>
                        <div>
                            <span>Subtotal</span>
                            <span>
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className={styles.total}>
                            <span>Total</span>
                            <span>
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        className={styles.orderButton}
                        onClick={handleOrder}
                    >
                        Order via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}