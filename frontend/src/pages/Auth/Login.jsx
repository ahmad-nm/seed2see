import styles from "../../styles/pages/Auth/login.module.css";
import { useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { fetchUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        admin_login: false,
    });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try {
            await login(formData);

            const user = await fetchUser();

            if (!user?.email_verified_at) {
                navigate("/verify-email");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 422) {
                setError("Invalid email or password.");
            }
            else if (error.response?.status === 403) {
                setError(error.response.data.message);
            }
            else if (error.response?.status === 429) {
                setError("Too many login attempts. Please try again later.");
            }
            else if (error.response?.status === 500) {
                setError("Server error. Please try again later.");
            }
            else if (error.response?.status === 503) {
                setError("Service unavailable. Please try again later.");
            }
            else if (error.response?.status === 504) {
                setError("Gateway timeout. Please try again later.");
            }
            else {
                setError("An unexpected error occurred. Please try again.");
            }
            console.error("Login error:", error.response);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginFormContainer}>
            <h2 className={styles.loginFormTitle}>Welcome Back!</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input className={styles.loginFormInput} type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input className={styles.loginFormInput} type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

                <Link to="/forgot-password" className={styles.forgotPasswordLink}>Forgot Password?</Link>
                
                {error && <p className={styles.loginFormError}>{error}</p>}

                <button type="submit" className={styles.loginFormButton} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}