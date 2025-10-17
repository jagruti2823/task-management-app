import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Takes the component to render as 'element' prop
const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    
    // If authenticated, render the requested element (page)
    // If not authenticated, redirect the user to the login page
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;