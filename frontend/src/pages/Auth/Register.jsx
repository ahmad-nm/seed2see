import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import styles from "../../styles/pages/Auth/register.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    const { fetchUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setFieldErrors({});
        setLoading(true);

        try {
            await register(formData);

            await fetchUser();

            console.log("Registration successful. Redirecting to verify email page...");

            navigate("/verify-email");

        } catch (error) {

            if (error.response?.status === 422) {
                setFieldErrors(error.response.data.errors || {});
            }

            else if (error.response?.status === 429) {
                setError(
                    "Too many registration attempts. Please try again later."
                );
            }

            else if (error.response?.status === 500) {
                setError(
                    "Server error. Please try again later."
                );
            }

            else {
                setError(
                    error.response?.data?.message ||
                    "An unexpected error occurred."
                );
            }

            console.error("Register error:", error.response);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.registerFormContainer}>
            <h2 className={styles.registerFormTitle}>Create Account</h2>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                {error && <p className={styles.registerFormError}>{error}</p>}

                <input className={styles.registerFormInput} type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                {fieldErrors.name && <p className={styles.registerFormError}>{fieldErrors.name[0]}</p>}
                
                <input className={styles.registerFormInput} type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                {fieldErrors.email && <p className={styles.registerFormError}>{fieldErrors.email[0]}</p>}
                
                <input className={styles.registerFormInput} type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                {fieldErrors.password && <p className={styles.registerFormError}>{fieldErrors.password[0]}</p>}

                <input className={styles.registerFormInput} type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} required />
                
                <button className={styles.registerFormButton} type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    )
}