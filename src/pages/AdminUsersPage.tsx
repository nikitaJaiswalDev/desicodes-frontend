import React, { useEffect, useState } from "react";
import { adminApi, type UserAdminData } from "../api/services/admin";
import "./AdminUsersPage.css";

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserAdminData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const abortController = new AbortController();
        fetchUsers(undefined, abortController.signal);

        return () => {
            abortController.abort();
        };
    }, []);

    const fetchUsers = async (search?: string, signal?: AbortSignal) => {
        try {
            setLoading(true);
            const data = await adminApi.getUsers(search);
            if (!signal?.aborted) {
                setUsers(data);
                setCurrentPage(1); // Reset to page 1 after search
            }
        } catch (err: any) {
            if (!signal?.aborted) {
                setError(err?.response?.data?.detail || "Failed to fetch users");
            }
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    };

    const handleSearch = () => {
        fetchUsers(searchQuery);
    };

    const handleToggleStatus = async (userId: number) => {
        try {
            await adminApi.toggleUserStatus(userId);
            // Refresh users list
            fetchUsers(searchQuery);
        } catch (err: any) {
            alert(err?.response?.data?.detail || "Failed to toggle user status");
        }
    };

    const handleDeleteUser = async (userId: number, username: string) => {
        if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
            try {
                await adminApi.deleteUser(userId);
                // Refresh users list
                fetchUsers(searchQuery);
            } catch (err: any) {
                alert(err?.response?.data?.detail || "Failed to delete user");
            }
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Users Management</h1>
                <p>View and manage all users in the system</p>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} className="search-btn">Search
                </button>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Subscription</th>
                            <th>Status</th>
                            <th>Executions</th>
                            <th>Certificates</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.user_type}`}>
                                        {user.user_type.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <span className={`subscription-badge ${user.subscription_status || 'none'}`}>
                                        {user.subscription_plan || "No Plan"}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td>{user.execution_count}</td>
                                <td>{user.certificate_count}</td>
                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="action-buttons">
                                    {user.user_type !== 'admin' && (
                                        <>
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className="btn-toggle"
                                                title={user.is_active ? "Deactivate" : "Activate"}
                                            >
                                                {user.is_active ? "🚫" : "✅"}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id, user.username)}
                                                className="btn-delete"
                                                title="Delete User"
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="no-data">
                    <p>No users found</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        « Previous
                    </button>

                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next »
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;
