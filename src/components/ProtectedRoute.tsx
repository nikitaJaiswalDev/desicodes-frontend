import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('dc_token');

        if (!token) {
            // Redirect to login page, but save the intended location
            navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
        }
    }, [navigate, location]);

    // If there's no token, we return null (or a loading spinner) while redirection happens
    // This prevents the protected content from flashing briefly
    const token = localStorage.getItem('dc_token');
    if (!token) {
        return null;
    }

    return <>{children}</>;
};
