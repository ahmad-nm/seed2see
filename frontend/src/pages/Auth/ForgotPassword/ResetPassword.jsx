import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../services/authService";
import styles from "../../../styles/pages/Auth/ForgetPassword/resetPassword.module.css";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (!token || !email) {
            navigate("/login");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setFieldErrors({});

        try {
            await resetPassword({
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            navigate("/login");

        } catch (error) {

            if (error.response?.status === 422) {
                setFieldErrors(error.response.data.errors || {});
            }
            else if (error.response?.status === 400) {
                setError("Invalid or expired reset link.");
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
        <div className={styles.resetPasswordContainer}>
            <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>

                <h2 className={styles.resetPasswordFormTitle}>Reset Password</h2>

                {error && <div className={styles.resetPasswordErrorBox}>{error}</div>}

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.resetPasswordInput}
                />

                {fieldErrors.password && (
                    <span className={styles.resetPasswordFieldError}>
                        {fieldErrors.password[0]}
                    </span>
                )}

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className={styles.resetPasswordInput}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.resetPasswordButton}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>
        </div>
    );
}