import { deleteTask, updateTask } from "../api/tasksApi";
function TaskItem({ task, onRefresh }) {
  const toggleStatus = async () => {
    await updateTask(task.id, {
      ...task,
      status: task.status === "completed" ? "pending" : "completed",
    });
    onRefresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(task.id);
    onRefresh();
  };
  
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>

      <button onClick={toggleStatus}>
        {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
