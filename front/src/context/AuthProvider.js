import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const nameCookieRefreshToken = 'refreshToken';
export const timeIntervalRefreshToken = 300000;

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const checkAuthStatus = () => {
        const refreshToken = Cookies.get(nameCookieRefreshToken);

        if (!refreshToken) {
            setIsLogged(false);
            return false;
        } else {
            const parsedToken = parseJwt(refreshToken);
            if (parsedToken && parsedToken.exp * 1000 > Date.now()) {
                setIsLogged(true);
                return true;
            } else {
                setIsLogged(false);
                return false;
            }
        }
    };

    const login = () => {
        setIsLogged(true);
    };

    const logout = () => {
        Cookies.remove(nameCookieRefreshToken);
        setIsLogged(false);
        navigate('/auth/login');
    };

    useEffect(() => {
        checkAuthStatus();
        const intervalId = setInterval(() => {
            const isUserLoggedIn = checkAuthStatus();
            if (!isUserLoggedIn) {
                logout();
                clearInterval(intervalId);
            }
        }, timeIntervalRefreshToken);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{timeIntervalRefreshToken, isLogged, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
