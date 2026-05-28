import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import Navbar from "./Navbar";

const ProtectedRoute = ({ requireAdmin = false }: { requireAdmin?: boolean}) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (requireAdmin && !user.isAdmin) {
        return <Navigate to="/home" />;
    }
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
};

export default ProtectedRoute;