import styles from "../../styles/pages/Auth/profile.module.css";
import { useAuth } from "../../context/AuthContext";
import { deleteAccount, logout } from "../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
    const { setUser, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        if (queryParams.get("verified") === "1") {
            setInterval(() => {
                
            })
        }
    })

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error(error.response?.data);
        }
    }

    async function handleDeleteAccount() {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmDelete) return;

        try {
            await deleteAccount();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error(error.response?.data);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <button onClick={() => navigate("/")} className={styles.backBtn}>
                    &larr; Back To Home
                </button>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.avatar}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className={styles.title}>My Profile</h1>
                        <p className={styles.subtitle}>Account overview</p>
                    </div>
                </div>

                {/* User Info */}
                <div className={styles.info}>
                    <div className={styles.row}>
                        <span>Name</span>
                        <span>{user?.name}</span>
                    </div>

                    <div className={styles.row}>
                        <span>Email</span>
                        <span>{user?.email}</span>
                    </div>

                    <div className={styles.row}>
                        <span>Status</span>
                        <span className={styles.badge}>Active</span>
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                    </button>

                    <button onClick={handleDeleteAccount} className={styles.deleteBtn}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}