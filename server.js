// server.js

// 1. Load Environment Variables (Must be the first executable line)
require('dotenv').config();

// 2. Import Required Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To allow cross-origin requests

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// 3. Initialize Express Application
const app = express();

// Define the port number, prioritizing the .env file value
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 4. Configure Middleware
app.use(express.json()); // Allows Express to parse incoming JSON data in the request body
app.use(cors());         // Enables CORS for all routes (important for frontend communication)

// Mount Routers
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/tasks', taskRoutes); // Task CRUD routes

// 5. Define Database Connection Function
const connectDB = async () => {
    try {
        // Mongoose connects using the URI from the .env file
        const conn = await mongoose.connect(MONGO_URI);
        
        // Success message for MongoDB connection
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Failure message and process exit
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// 6. Define a Basic Route for Testing (FIXED)
app.get('/', (req, res) => {
    // Send a JSON response to confirm the server is running
    res.json({ message: "Task Management API is running! 🚀" });
});


// 7. Start the Server (After successfully connecting to the database)
const startServer = async () => {
    // First, connect to the database
    await connectDB();

    // Then, set the server to listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

// Execute the function to start the application
startServer();