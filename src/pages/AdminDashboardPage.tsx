import React, { useEffect, useState } from "react";
import { adminApi, type DashboardStats } from "../api/services/admin";
import "./AdminDashboardPage.css";

const AdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getStats();
            setStats(data);
        } catch (err: any) {
            setError(err?.response?.data?.detail || "Failed to fetch stats");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
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
                <h1>Dashboard</h1>
                <p>Overview of your system statistics</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card purple">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>Total Users</h3>
                        <p className="stat-value">{stats?.total_users || 0}</p>
                        <span className="stat-label">Regular users</span>
                    </div>
                </div>

                <div className="stat-card green">
                    <div className="stat-icon">💳</div>
                    <div className="stat-content">
                        <h3>Active Subscriptions</h3>
                        <p className="stat-value">{stats?.active_subscriptions || 0}</p>
                        <span className="stat-label">Currently active</span>
                    </div>
                </div>

                <div className="stat-card orange">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">₹{stats?.total_revenue.toLocaleString() || 0}</p>
                        <span className="stat-label">All time revenue</span>
                    </div>
                </div>

                <div className="stat-card pink">
                    <div className="stat-icon">⚡</div>
                    <div className="stat-content">
                        <h3>Total Executions</h3>
                        <p className="stat-value">{stats?.total_executions || 0}</p>
                        <span className="stat-label">Code executions</span>
                    </div>
                </div>

                <div className="stat-card indigo">
                    <div className="stat-icon">🌐</div>
                    <div className="stat-content">
                        <h3>Total Languages</h3>
                        <p className="stat-value">{stats?.total_languages || 0}</p>
                        <span className="stat-label">Supported languages</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
