// models/Task.js

const mongoose = require('mongoose');

// Define the structure and rules for the Task document
const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required for the task.'], // Field is required
            trim: true, // Removes whitespace from both ends of a string
            maxlength: [100, 'Title cannot be more than 100 characters.']
        },
        description: {
            type: String,
            required: false, // Description is optional
            trim: true
        },
        status: {
            type: String,
            required: true,
            default: 'pending', // Default status for a new task
            enum: { // Restricts the status to only these three values
                values: ['pending', 'in-progress', 'completed'],
                message: 'Status must be pending, in-progress, or completed.'
            }
        },
        dueDate: {
            type: Date,
            required: false // Due date is optional
        }
    },
    {
        // Mongoose automatically manages createdAt and updatedAt fields
        timestamps: true 
    }
);

// Create the Mongoose Model and export it
// 'Task' will be the name of the model, and Mongoose will create a 'tasks' collection in MongoDB.
module.exports = mongoose.model('Task', TaskSchema);