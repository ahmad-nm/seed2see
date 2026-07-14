import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser, login } from '../../../services/authService';
import styles from '../../styles/pages/login/adminLogin.module.css';
import Input from '../../../components/common/Input';

export default function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        admin_login: true,
    });

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        getUser()
            .then((res) => {
                if (!isMounted) return;

                if (res.data.role === "admin") {
                    navigate("/admin/dashboard", { replace: true });
                }
            })
            .catch((err) => {
                console.log("🔴 error:", err);
            })
            .finally(() => {
                if (isMounted) setCheckingAuth(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(formData);

            if (response.status === 200) {
                toast.success('Login successful!');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            toast.error('Invalid credentials');
        } finally {
            setLoading(false);
        }
    }

    if (checkingAuth) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.adminLoginContainer}>
            <h1 className={styles.adminLoginTitle}>Admin Login</h1>

            <form className={styles.adminLoginForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={loading} className={styles.adminLoginButton}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}