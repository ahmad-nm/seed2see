import { useEffect, useState } from "react";
import styles from "../../styles/components/layout/navbar.module.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigate = useNavigate();

    const { user } = useAuth();
    const { setUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Navbar becomes solid after scrolling 50px
            setScrolled(currentScrollY > 50);

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY < prevScrollY) {
                // Scrolling up
                setIsVisible(true);
            } else if (currentScrollY > prevScrollY && currentScrollY > 100) {
                // Scrolling down (only hide after scrolling past 100px)
                setIsVisible(false);
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    async function handleLogout() {
        try {
            await logout();

            setUser(null);

            navigate("/");
        } catch (error) {
            console.error(error.response?.data);
        }
    }

    return (
        <nav
            className={`${styles.navbar} ${scrolled ? styles.solid : styles.transparent} ${isVisible ? styles.visible : styles.hidden}`}
        >
            <div className={styles.navSection}>
                <div className={styles.links}>
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/about">About Us</a>
                </div>
            </div>

            <div className={styles.logo}>
                <img src={logo} className={styles.logoImg} alt="Seed2See Logo" />
            </div>

            <div className={styles.navSection}>
                <div className={styles.links}>
                    <a href="/contact">Contact</a>

                    {user ? (
                        <>
                            <a href="/profile">Profile</a>
                            <a onClick={handleLogout}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
