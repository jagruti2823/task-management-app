// client/src/components/TaskControl.js
import React from 'react';

const TaskControl = ({ filter, setFilter, sort, setSort, search, setSearch }) => {
    
    const filterOptions = [
        { label: 'All', value: '' },
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
    ];
    
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="row g-3 align-items-center">
                    {/* 1. Search Bar */}
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search tasks by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* 2. Sort Dropdown */}
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="-createdAt">Newest First</option>
                            <option value="createdAt">Oldest First</option>
                            <option value="dueDate">Due Date (Closest)</option>
                        </select>
                    </div>

                    {/* 3. Status Filters */}
                    <div className="col-md-3">
                        <div className="btn-group w-100" role="group">
                            {filterOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`btn btn-sm ${filter === option.value ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setFilter(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskControl;