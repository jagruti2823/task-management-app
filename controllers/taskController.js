const Task = require('../models/Task'); // Import the Task Model

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res) => {
    try {
        let query;

        // 1. Filtering by Status
        const reqQuery = { ...req.query };
        const removeFields = ['sort', 'select', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);
        
        let queryString = JSON.stringify(reqQuery);
        // Allows $gt, $gte, etc.
        queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        query = Task.find(JSON.parse(queryString));

        // 2. Search by Title
        if (req.query.search) {
            query = query.find({
                title: { $regex: req.query.search, $options: 'i' } // Case-insensitive search
            });
        }
        
        // 3. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default to newest first
        }

        const tasks = await query;

        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        // Ensure error handling is robust
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
exports.createTask = async (req, res) => {
    try {
        // Mongoose handles validation based on the schema (Task.js)
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        // Handle validation errors (e.g., missing 'title')
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update a single task
// @route   PUT /api/tasks/:id
// @access  Public
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        // Use findByIdAndUpdate to update and return the new document
        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true // Run the validators defined in TaskSchema
        });

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Delete a single task
// @route   DELETE /api/tasks/:id
// @access  Public
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        await task.deleteOne(); // Use deleteOne() or remove()

        res.status(200).json({ success: true, data: {} }); // Return an empty object on success
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};