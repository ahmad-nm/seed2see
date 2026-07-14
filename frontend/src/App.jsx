import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import MainLayout from "./layouts/MainLayout";
import Contact from "./pages/Contact/Contact";
import Products from "./pages/Products/Products";
import CategoryPage from "./pages/Products/CategoryPage";
import ProductDetails from "./pages/Products/ProductDetails";
import ScrollToTop from "./hooks/ScrollToTop";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Auth/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthPage from "./pages/Auth/AuthPage";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ForgotPassword/ResetPassword";
import Categories from "./admin/pages/Categories/Categories";
import AdminProducts from "./admin/pages/Products/Products";
import AdminLayout from "./admin/layout/AdminLayout";
import CreateCategory from "./admin/pages/Categories/CreateCategory";
import EditCategory from "./admin/pages/Categories/EditCategory";
import CreateProduct from "./admin/pages/Products/CreateProduct";
import EditProduct from "./admin/pages/Products/EditProduct";
import Checkout from "./pages/Checkout/Checkout";
import UserManagement from "./admin/pages/Users/UserManagement";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import ContactMessages from "./admin/pages/ContactMessages/ContactMessages";
import ActivitiesPage from "./admin/pages/Dashboard/ActivitiesPage";
import AdminLogin from "./admin/pages/Login/AdminLogin";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<AuthPage />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/category/:categorySlug"
                        element={<CategoryPage />}
                    />
                    <Route path="/products/:productSlug" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/verify-email"
                    element={
                        <ProtectedRoute>
                            <VerifyEmail />
                        </ProtectedRoute>
                    }
                />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin" 
                    element={
                        <AdminProtectedRoute>
                            <AdminLayout />
                        </AdminProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />                
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/create" element={<CreateCategory />} />
                    <Route path="categories/edit/:id" element={<EditCategory />} />

                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/create" element={<CreateProduct />} />
                    <Route path="products/edit/:id" element={<EditProduct />} />

                    <Route path="users" element={<UserManagement />} />

                    <Route path="messages" element={<ContactMessages />} />

                    <Route path="activities" element={<ActivitiesPage />} />
                </Route>
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;
