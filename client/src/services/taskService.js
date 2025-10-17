import axios from 'axios';
import { getToken } from './authService';
// The proxy setting in package.json handles the base URL: 
// It directs requests to http://localhost:5000/api
const API_URL = `${process.env.REACT_APP_API_URL}/api/tasks/`; 

// Configuration object to send JWT in headers
const getConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
    },
});

// --- CRUD FUNCTIONS ---

// @desc    Fetch all tasks
export const getTasks = async (queryParams = {}) => { 
    try {
        // Convert the queryParams object into a query string: ?status=completed&sort=-createdAt
        const queryString = new URLSearchParams(queryParams).toString();
        const url = API_URL + (queryString ? `?${queryString}` : '');
        
        const response = await axios.get(url, getConfig());
        return response.data;
    } catch (error) {
        throw error.response.data.error || 'Failed to fetch tasks';
    }
};

// @desc    Add a new task
export const addTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData, getConfig());
        return response.data; // { success, data: newTask }
    } catch (error) {
        throw error.response.data.error || 'Failed to add task';
    }
};

// @desc    Update an existing task
export const updateTask = async (id, taskData) => {
    try {
        const response = await axios.put(API_URL + id, taskData, getConfig());
        return response.data; // { success, data: updatedTask }
    } catch (error) {
        throw error.response.data.error || 'Failed to update task';
    }
};

// @desc    Delete a task
export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(API_URL + id, getConfig());
        return response.data; // { success, data: {} }
    } catch (error) {
        throw error.response.data.error || 'Failed to delete task';
    }
};