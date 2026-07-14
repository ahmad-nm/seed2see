import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/components/auth/protectedRoute.module.css";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
}