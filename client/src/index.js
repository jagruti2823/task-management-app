import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap App with AuthProvider */}
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>
);