import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';

const AuthRoute = () => {
    return (
        <Routes>
            {/* Dejo por defecto `index` esta página para cuando inicia la app por primera vez o cuando se ingrea a una ruta que no exista */}
            <Route path="login" index element={<Login />} /> 
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<ResetPassword />} />
        </Routes>
    );
};

export default AuthRoute;
