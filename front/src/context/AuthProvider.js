import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'

const AuthContext = createContext();

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
    const nameCookieAccessToken = 'accessToken'

    const login = () => {
        setIsLogged(true);
    };

    const logout = () => {
        Cookies.remove(nameCookieAccessToken)
        setIsLogged(false);
    };

    useEffect(() => {
        const accessToken = Cookies.get(nameCookieAccessToken)
        const parsedToken = accessToken ? parseJwt(accessToken) : null;
        setIsLogged(parsedToken ? parsedToken.exp * 1000 > Date.now() : false);
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
