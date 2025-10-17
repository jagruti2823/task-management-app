import React from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaClock } from 'react-icons/fa';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
    // Determine badge style based on status
    const statusClass = (status) => {
        switch (status) {
            case 'completed':
                return 'badge bg-success';
            case 'in-progress':
                return 'badge bg-warning text-dark';
            default:
                return 'badge bg-secondary';
        }
    };

    return (
        <div className="col-md-4 col-sm-6 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{task.title}</h5>
                    <span className={statusClass(task.status)}>
                        Status: {task.status.toUpperCase()}
                    </span>
                    <p className="card-text mt-2 text-muted flex-grow-1">
                        {task.description || "No description provided."}
                    </p>
                    <small className="text-info">
                        <FaClock className="me-1" /> Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                    </small>
                    
                    {/* Action Buttons */}
                    <div className="mt-3">
                        <button 
                            className="btn btn-sm btn-info me-2" 
                            onClick={() => onEdit(task)}
                            title="Edit Task"
                        >
                            <FaEdit />
                        </button>
                        <button 
                            className="btn btn-sm btn-danger me-2" 
                            onClick={() => onDelete(task._id)}
                            title="Delete Task"
                        >
                            <FaTrash />
                        </button>
                        {task.status !== 'completed' && (
                            <button 
                                className="btn btn-sm btn-success" 
                                onClick={() => onToggleStatus(task._id, 'completed')}
                                title="Mark as Complete"
                            >
                                <FaCheckCircle />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;