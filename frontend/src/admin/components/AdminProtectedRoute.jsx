import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/authService";

export default function AdminProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return null; // or spinner

    if (!user || user.role !== "admin") {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}