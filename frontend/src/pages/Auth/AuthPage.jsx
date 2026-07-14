import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import styles from "../../styles/pages/Auth/authPage.module.css";

export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        setIsLogin(location.pathname === "/login");
    }, [location.pathname]);

    const toggleToRegister = () => {
        navigate("/register");
    };

    const toggleToLogin = () => {
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.card} ${
                    isLogin ? styles.loginMode : styles.registerMode
                }`}
            >
                {/* FORM SIDE */}
                <div className={styles.formPanel}>
                    {isLogin ? <Login /> : <Register />}
                </div>

                {/* BRANDING SIDE */}
                <div className={styles.brandingPanel}>
                    <div className={styles.brandingContent}>
                        <h1 className={styles.brandName}>🌱 Seed2See</h1>

                        <p className={styles.tagline}>
                            Plant Today.<br />
                            Impact Tomorrow.
                        </p>

                        <p className={styles.desc}>
                            Join our mission to promote sustainable living and environmental awareness.
                        </p>

                        <p className={styles.footerText}>
                            &copy; 2026 Seed2See. All rights reserved.
                        </p>

                        {isLogin ? (
                            <button className={`${styles.registerToggleButton} ${styles.toggleButton}`} onClick={toggleToRegister}>
                                Create Account
                            </button>
                        ) : (
                            <button className={`${styles.loginToggleButton} ${styles.toggleButton}`} onClick={toggleToLogin}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}