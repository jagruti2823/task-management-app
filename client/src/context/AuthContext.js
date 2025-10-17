import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { getToken, logoutUser } from '../services/authService';

// 1. Create Context
const AuthContext = createContext();

// 2. Custom Hook to use the context
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Provider Component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getToken());
    
    // Use useMemo to avoid re-calculating isAuthenticated on every render
    const isAuthenticated = useMemo(() => !!token, [token]);

    // Handle token updates from login/register
    const updateToken = (newToken) => {
        setToken(newToken);
    };

    // Handle logout globally
    const logout = () => {
        logoutUser();
        setToken(null);
    };

    // Value provided to consuming components
    const contextValue = useMemo(() => ({
        isAuthenticated,
        token,
        updateToken,
        logout
    }), [isAuthenticated, token]);


    // Effect to check token from localStorage on initial load
    useEffect(() => {
        const storedToken = getToken();
        if (storedToken && storedToken !== token) {
             setToken(storedToken);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};