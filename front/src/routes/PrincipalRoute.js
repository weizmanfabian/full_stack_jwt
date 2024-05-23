import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import AplicationRoute from './AplicationRoute';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { useAuth } from '../context/AuthProvider';



const PrincipalRoute = () => {
  const {timeIntervalRefreshToken, logout, checkAuthStatus } = useAuth();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const isUserLoggedIn = checkAuthStatus();
            if (!isUserLoggedIn) {
                logout();
                clearInterval(intervalId);
            }
        }, timeIntervalRefreshToken);

        return () => clearInterval(intervalId);
    }, [checkAuthStatus, logout, timeIntervalRefreshToken]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth/*" element={
        <PublicRoute>
          <AuthRoute />
        </PublicRoute>
      } />
      <Route path="/app/*" element={
        <PrivateRoute>
          <AplicationRoute />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default PrincipalRoute;
