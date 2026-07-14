import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/authService";
import styles from "../../../styles/pages/Auth/ForgetPassword/forgotPassword.module.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");
        setFieldErrors({});

        try {
            const res = await forgotPassword({ email });

            setMessage(res.data.message);

        } catch (error) {

            if (error.response?.status === 422) {
                setFieldErrors(error.response.data.errors || {});
            }
            else if (error.response?.status === 429) {
                setError("Too many attempts. Please try again later.");
            }
            else {
                setError(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.forgotPasswordContainer}>
            <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>

                <h2 className={styles.forgotPasswordFormTitle}>Forgot Password</h2>

                {error && <div className={styles.forgotPasswordFormError}>{error}</div>}
                {message && <div className={styles.forgotPasswordFormSuccessBox}>{message}</div>}

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.forgotPasswordFormInput}
                />

                {fieldErrors.email && (
                    <span className={styles.forgotPasswordFormFieldError}>
                        {fieldErrors.email[0]}
                    </span>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.forgotPasswordFormButton}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

            </form>
        </div>
    );
}