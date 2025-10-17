import axios from 'axios';

const AUTH_API_URL = '/api/auth/';

// --- Helper Functions for Token Management ---

const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

// --- AUTH API Calls ---

export const registerUser = async (userData) => {
    const response = await axios.post(AUTH_API_URL + 'register', userData);
    
    // On successful registration, store the token
    if (response.data.token) {
        setToken(response.data.token);
    }
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(AUTH_API_URL + 'login', userData);
    
    // On successful login, store the token
    if (response.data.token) {
        setToken(response.data.token);
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};