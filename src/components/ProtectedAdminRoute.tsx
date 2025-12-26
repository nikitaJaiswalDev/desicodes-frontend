import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedAdminRoute: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const token = localStorage.getItem("dc_token");

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!token) {
                setIsAdmin(false);
                return;
            }

            try {
                // Fetch user data from API to check admin status
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const userData = await response.json();
                    setIsAdmin(userData.user_type === "ADMIN");
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            }
        };

        checkAdminStatus();
    }, [token]);

    // Loading state
    if (isAdmin === null) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }}>
                <div style={{ textAlign: "center", color: "#fff" }}>
                    <div style={{
                        width: "50px",
                        height: "50px",
                        border: "4px solid rgba(255, 255, 255, 0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 1rem"
                    }}></div>
                    <p>Verifying admin access...</p>
                </div>
            </div>
        );
    }

    // Not logged in
    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    // Not an admin
    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    // Is admin
    return <Outlet />;
};
