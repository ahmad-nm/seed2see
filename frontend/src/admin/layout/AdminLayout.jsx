import { Outlet, Link } from "react-router-dom";
import styles from "../styles/layout/adminLayout.module.css";
import { useState } from "react";

import dashboardIcon from "../../assets/icons/dashboard.png";
import categoriesIcon from "../../assets/icons/category.png";
import productsIcon from "../../assets/icons/products.png";
import usersIcon from "../../assets/icons/users.png";
import homeIcon from "../../assets/icons/home.png";
import messagesIcon from "../../assets/icons/messages.png"; //#F79E41

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={styles.adminLayoutContainer}>

            {/* Sidebar */}
            <aside
                className={`${styles.adminLayoutSidebar} ${
                    collapsed ? styles.collapsed : ""
                }`}
            >
                <button
                    className={styles.toggleButton}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    ☰
                </button>

                <h2 className={styles.adminSideBarLogo}>
                    {collapsed ? "S2S" : "Seed2See Admin"}
                </h2>

                <nav className={styles.adminSideBarNav}>
                    <Link to="/admin" className={styles.adminSideBarLink}>
                        <img src={dashboardIcon} alt="Dashboard" className={styles.icon} />
                        {collapsed ? null : "Dashboard"}
                    </Link>

                    <Link to="/admin/categories" className={styles.adminSideBarLink}>
                        <img src={categoriesIcon} alt="Categories" className={styles.icon} />
                        {collapsed ? null : "Categories"}
                    </Link>

                    <Link to="/admin/products" className={styles.adminSideBarLink}>
                        <img src={productsIcon} alt="Products" className={styles.icon} />
                        {collapsed ? null : "Products"}
                    </Link>

                    <Link to="/admin/users" className={styles.adminSideBarLink}>
                        <img src={usersIcon} alt="Users" className={styles.icon} />
                        {collapsed ? null : "Users"}
                    </Link>

                    <Link to="/admin/messages" className={styles.adminSideBarLink}>
                        <img src={messagesIcon} alt="Messages" className={styles.icon} />
                        {collapsed ? null : "Messages"}
                    </Link>

                    <Link to="/" className={styles.adminSideBarLink}>
                        <img src={homeIcon} alt="Back to Home" className={styles.icon} />
                        {collapsed ? null : "Back to Home"}
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <main
                className={`${styles.main} ${
                    collapsed ? styles.mainExpanded : ""
                }`}
            >
                <Outlet />
            </main>

        </div>
    );
}