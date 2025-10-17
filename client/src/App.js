import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskListPage from './pages/TaskListPage';
import LoginPage from './pages/LoginPage';     // Import Login
import RegisterPage from './pages/RegisterPage'; // Import Register
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { useAuth } from './context/AuthContext'; // Import useAuth

function App() {
  const { isAuthenticated } = useAuth(); // Get status from context

  return (
    <Router>
      <Navbar />
      <div className="container-fluid p-0">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" replace /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/tasks" replace /> : <RegisterPage />} />
          
          {/* Protected Route (The Dashboard) */}
          <Route 
            path="/tasks" 
            element={<PrivateRoute element={<TaskListPage />} />} 
          />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} replace />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;