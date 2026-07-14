import { useEffect, useState } from "react";
import styles from "../../styles/pages/users/userManagement.module.css";
import { changeUserRole, deleteUser, getAllUsers, unverifyUser, verifyUser } from "../../services/adminUserServices";
import SearchBar from "../../../components/SearchBar";

import checkIcon from "../../../assets/icons/check.png";
import uncheckIcon from "../../../assets/icons/delete.png";
import deleteIcon from "../../../assets/icons/trash.png";
import { toast } from "react-toastify";

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        verified: "",
        role: "",
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchUsers(page = 1) {
        setLoading(true);

        try {
            const response = await getAllUsers({
                page,
                ...filters,
            });

            setUsers(response.data);

            setPagination({
                currentPage: response.current_page,
                lastPage: response.last_page,
                total: response.total,
            });
        } catch (error) {
            toast.error("Failed to fetch users.");
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers(1);
    }, [filters]);

    async function handleVerify(userId) {
        try {
            const response = await verifyUser(userId);
            fetchUsers(pagination.currentPage); // Refresh the user list after verification
            console.log(response)
            toast.success("User verified successfully!");
        } catch (error) {
            console.error(error);
            setError(error);
            toast.error("Failed to verify user.");
        }
    }

    async function handleUnverify(userId) {
        try {
            const response = await unverifyUser(userId);
            fetchUsers(pagination.currentPage); // Refresh the user list after unverification
            console.log(response)
            toast.success("User unverified successfully!");
        } catch (error) {
            console.error(error);
            setError(error);
            toast.error("Failed to unverify user.");
        }
    }

    async function handleChangeRole(userId, newRole) {
        try {
            const response = await changeUserRole(userId, newRole);
            // Handle success, e.g., update user role in the UI
            fetchUsers(pagination.currentPage); // Refresh the user list after role change
            console.log(response)
            toast.success("User role updated successfully!");
        } catch (error) {
            console.error(error);
            setError(error);
            toast.error("Failed to change user role.");
        }
    }

    async function handleDeleteUser(userId) {
        
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await deleteUser(userId);
            fetchUsers(pagination.currentPage); // Refresh the user list after deletion
            console.log(response)
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error(error);
            setError(error);
            toast.error("Failed to delete user.");
        }
    }

    return (
        <div className={styles.userManagement}>
            <h1 className={styles.userManagementTitle}>
                User Management
            </h1>

            {/* Search */}
            <div className={styles.topBar}>
                <SearchBar
                    onChange={(value) =>
                        setFilters(prev => ({
                            ...prev,
                            search: value,
                        }))
                    }
                />

                {/* Filters */}
                <div className={styles.filters}>
                    <select
                        value={filters.verified}
                        onChange={(e) =>
                            setFilters(prev => ({
                                ...prev,
                                verified: e.target.value,
                            }))
                        }
                    >
                        <option value="">All Users</option>
                        <option value="yes">Verified</option>
                        <option value="no">Unverified</option>
                    </select>

                    <select
                        value={filters.role}
                        onChange={(e) =>
                            setFilters(prev => ({
                                ...prev,
                                role: e.target.value,
                            }))
                        }
                    >
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <table className={styles.usersTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>
                                        {user.email_verified_at
                                            ? <img className={styles.checkIcon} src={checkIcon} alt="Verified" />
                                            : <img className={styles.unCheckIcon} src={uncheckIcon} alt="Not Verified" />}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                styles.role
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div
                                            className={
                                                styles.actions
                                            }
                                        >
                                            {!user.email_verified_at ? (
                                                <button
                                                    className={styles.verifyButton}
                                                    onClick={() => handleVerify(user.id)}
                                                >
                                                    Verify
                                                </button>
                                            ) : (
                                                <button 
                                                    className={styles.unverifyButton}
                                                    onClick={() => handleUnverify(user.id)}
                                                >
                                                    Unverify
                                                </button>
                                            )}

                                            <select
                                                className={styles.roleSelect}
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleChangeRole(user.id, e.target.value)
                                                }
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <img className={styles.deleteIcon} src={deleteIcon} alt="Delete" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}