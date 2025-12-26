import React, { useEffect, useState } from "react";
import { adminApi, type SubscriptionAdminData } from "../api/services/admin";
import "./AdminSubscriptionsPage.css";

const AdminSubscriptionsPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionAdminData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getSubscriptions();
            setSubscriptions(data);
        } catch (err: any) {
            setError(err?.response?.data?.detail || "Failed to fetch subscriptions");
        } finally {
            setLoading(false);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubscriptions = subscriptions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading subscriptions...</p>
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
                <h1>Subscriptions Management</h1>
                <p>View all subscriptions and payment details</p>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Email</th>
                            <th>Plan Name</th>
                            <th>Status</th>
                            <th>Amount Paid</th>
                            <th>Next Due Date</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSubscriptions.map((sub, index) => (
                            <tr key={sub.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{sub.user_email}</td>
                                <td>
                                    <span className={`plan-badge ${sub.plan_name.toLowerCase()}`}>
                                        {sub.plan_name}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${sub.status.toLowerCase()}`}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="amount">₹{sub.amount_paid.toLocaleString()}</td>
                                <td>
                                    {sub.next_due_date
                                        ? new Date(sub.next_due_date).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {subscriptions.length === 0 && (
                <div className="no-data">
                    <p>No subscriptions found</p>
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

export default AdminSubscriptionsPage;
