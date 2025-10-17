import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { updateToken } = useAuth(); // Get the global update function

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginUser(formData);
            
            // Update context with the new token
            updateToken(response.token);
            
            navigate('/tasks'); // Redirect to protected dashboard
        } catch (err) {
            const errMsg = err.response?.data?.error || 'Login failed. Check server status.';
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-center text-success mb-4">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                {/* Password Field */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-success" disabled={loading}>
                                        {loading ? 'Logging In...' : 'Login'}
                                    </button>
                                </div>
                                <p className="text-center mt-3">
                                    Don't have an account? <Link to="/register">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;