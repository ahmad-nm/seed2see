import { Outlet, useLocation } from "react-router-dom";
import AboutTab from "../components/layout/AboutTab";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../hooks/useTheme";
import CartFloatingButton from "../components/common/cart/CartFloatingButton";
import CartDrawer from "../components/common/cart/CartDrawer";

export default function MainLayout() {
    const location = useLocation();

    const showCart = location.pathname.includes("products");

    return (
        <div style={{ position: "relative" }}>
            <Navbar />
            <main>
                <Outlet />
            </main>
            {showCart &&
                <>
                    <CartFloatingButton />
                    <CartDrawer />
                </>
            }
            <AboutTab />
        </div>
    );
}
