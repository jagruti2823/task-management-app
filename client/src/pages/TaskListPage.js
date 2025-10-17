import React, { useState, useEffect, useCallback } from 'react';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import TaskControl from '../components/TaskControl'; // IMPORT TaskControl
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null); 
    
    // State for filtering, sorting, and search
    const [filter, setFilter] = useState(''); // Status filter
    const [sort, setSort] = useState('-createdAt'); // Sort order
    const [search, setSearch] = useState(''); // Search keyword

    // --- Data Fetching (Read) ---
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Build the query object for the service layer
            const queryParams = {
                ...(filter && { status: filter }), // Only include status if filter is set
                ...(sort && { sort: sort }),
                ...(search && { search: search }),
            };
            
            const response = await getTasks(queryParams); // Pass the query parameters
            setTasks(response.data);
        } catch (err) {
            setError(`Error fetching tasks: ${err.toString()}`);
        } finally {
            setLoading(false);
        }
    }, [filter, sort, search]); // Re-run fetch whenever filter, sort, or search changes

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]); // Run on mount and when dependencies (filter/sort/search) change

    // --- CRUD Handlers (Update for status toggle is crucial here) ---
    
    const handleSubmitTask = async (formData) => {
        // ... (TaskForm submission logic remains the same, using addTask/updateTask)
        // ... (Ensure successful response updates the tasks state)
        try {
            if (editingTask) {
                const response = await updateTask(editingTask._id, formData);
                setTasks(tasks.map(task => 
                    task._id === editingTask._id ? response.data : task
                ));
            } else {
                const response = await addTask(formData);
                setTasks([response.data, ...tasks]); 
            }
            handleCloseModal();
        } catch (err) {
            setError(`Error saving task: ${err.toString()}`);
        }
    };

    const handleEdit = (task) => { setEditingTask(task); setShowModal(true); };
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            setError(`Error deleting task: ${err.toString()}`);
        }
    };

    // Status toggle is also an update request
    const handleToggleStatus = async (id, newStatus) => {
        try {
            const updatedTaskData = { status: newStatus };
            const response = await updateTask(id, updatedTaskData);

            setTasks(tasks.map(task => 
                task._id === id ? response.data : task
            ));
        } catch (err) {
            setError(`Error updating status: ${err.toString()}`);
        }
    };

    // --- UI Rendering ---

    const handleOpenModal = () => { setEditingTask(null); setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); setEditingTask(null); };

    if (loading) return <h4 className="text-center mt-5">Loading Tasks...</h4>;

    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Tasks</h2>
                <button 
                    className="btn btn-success" 
                    onClick={handleOpenModal}
                >
                    + Add New Task
                </button>
            </div>

            {/* Render the Task Control Component */}
            <TaskControl
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                search={search}
                setSearch={setSearch}
            />

            {/* Task Form Modal */}
            {showModal && (
                <TaskForm 
                    initialTask={editingTask}
                    onSubmit={handleSubmitTask}
                    onClose={handleCloseModal}
                />
            )}
            
            {/* Task List Grid */}
            <div className="row">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem 
                            key={task._id} 
                            task={task} 
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onToggleStatus={handleToggleStatus}
                        />
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center text-muted">
                            {loading ? '' : 'No tasks found matching your criteria.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskListPage;