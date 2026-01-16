function TaskList({
  tasks,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onRefresh,
  onEdit,
  onDelete
}) {
  if (!tasks.length) {
    return <p>No tasks found.</p>;
  }
const TaskStatus = {
    0 : 'Pending',
    1 : 'In Progress',
    2 : 'Completed'
  }

  const Priority = {
    0 : 'Low',
    1 : 'Medium',
    2 : 'High'
  }
  return (
    <>
      {/* Page size selector */}
      <div className="table-controls">
        <label>
          Rows per page:
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
                {tasks.map(task => (
                <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{TaskStatus[task.status]}</td>
                    <td>{Priority[task.priority]}</td>
                    <td>{task.dueDate?.split("T")[0]}</td>
                    <td className="actions">
                        <button
                            className="edit-btn"
                            onClick={() => onEdit(task)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                    </td>

                </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages || tasks.length === 0}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TaskList;
