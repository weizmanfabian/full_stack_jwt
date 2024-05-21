import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PublicRoute = ({ children }) => {
    const { isLogged } = useAuth();
    return isLogged ? <Navigate to="/app/home" /> : children;
};

export default PublicRoute;
