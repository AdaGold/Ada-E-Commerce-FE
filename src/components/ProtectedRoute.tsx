import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean}) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (requireAdmin && !user.isAdmin) {
        return <Navigate to="/home" />;
    }
    return children;
};

export default ProtectedRoute;