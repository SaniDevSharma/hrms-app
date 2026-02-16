import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, loading, login } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or use a proper loading spinner
    }

    if (!isAuthenticated) {
        login();
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoute;
