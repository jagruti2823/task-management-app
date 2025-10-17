// server.js

// 1. Load Environment Variables (dotenv package)
require('dotenv').config(); 

// 2. Import Mongoose
const mongoose = require('mongoose');

// 3. Define the connection function
const connectDB = async () => {
    try {
        // Mongoose connects using the URI from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

// 4. Call the function to connect
connectDB();


// 5. Basic server setup (for now, just to keep the process running)
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});