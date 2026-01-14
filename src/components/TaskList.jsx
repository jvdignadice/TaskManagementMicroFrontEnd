import TaskItem from "./TaskItem";

function TaskList({ tasks, onRefresh }) {
  if (!tasks.length) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onRefresh={onRefresh} />
      ))}
    </div>
  );
}

export default TaskList;
