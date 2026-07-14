import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (user?.email_verified_at) {
        return <Navigate to="/profile" replace />;
    }

    return (
        <main>
            <Outlet />
        </main>
    );
}