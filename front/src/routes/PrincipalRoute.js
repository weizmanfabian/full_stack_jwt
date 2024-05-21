import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import AplicationRoute from './AplicationRoute';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AuthProvider } from '../context/AuthProvider';

const PrincipalRoute = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth/*" element={
                        <PublicRoute>
                            <AuthRoute />
                        </PublicRoute>
                    }/>
                    <Route path="/app/*" element={
                        <PrivateRoute>
                            <AplicationRoute />
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default PrincipalRoute;
