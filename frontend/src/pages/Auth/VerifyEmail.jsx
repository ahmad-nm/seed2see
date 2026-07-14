import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendVerificationEmail } from "../../services/authService";
import styles from "../../styles/pages/Auth/verifyEmail.module.css";
import { useAuth } from "../../context/AuthContext";

export default function VerifyEmail() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [message, setMessage] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [cooldown]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (user.email_verified_at) {
            navigate("/profile");
        }
    }, [user, navigate]);

    const handleResendEmail = async () => {
        if (cooldown > 0) return;

        try {
            setLoading(true);
            setMessage("");

            await resendVerificationEmail();

            setMessage("Verification email sent!");
            setCooldown(60);
        } catch (error) {
            setMessage("Failed to resend email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.verifyEmailContainer}>
            <div className={styles.verifyEmailCard}>
                <h2 className={styles.verifyEmailTitle}>
                    Verify Your Email
                </h2>

                <p className={styles.verifyEmailMessage}>
                    A verification link has been sent to your email address.
                </p>

                {message && (
                    <p className={styles.successMessage}>{message}</p>
                )}

                <button
                    className={styles.resendButton}
                    onClick={handleResendEmail}
                    disabled={loading || cooldown > 0}
                >
                    {cooldown > 0
                        ? `Resend in ${cooldown}s`
                        : loading
                        ? "Sending..."
                        : "Resend Email"}
                </button>
            </div>
        </div>
    );
}