import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { isLogged } = useAuth();
    return isLogged ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
