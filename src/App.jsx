import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import { getTasks,deleteTask } from "./api/tasksApi";
import EditTaskModal from "./components/EditTaskModal";
import ConfirmationModal from "./components/ConfirmationModal";


function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: ""
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
});
const [taskToDelete, setTaskToDelete] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);

const handleEditTask = (task) => {
  setSelectedTask(task);
  setShowEditModal(true);
};

const handleDeleteTask = (taskId) => {
  setTaskToDelete(taskId);
  setShowDeleteModal(true);
};
const confirmDeleteTask = async () => {
  if (!taskToDelete) return;

  try {
    await deleteTask(taskToDelete);
    setShowDeleteModal(false);
    setTaskToDelete(null);
    loadTasks();
  } catch {
    setError("Failed to delete task");
  }
};

const loadTasks = async () => {
  setLoading(true);
  setError("");

  try {
    const data = await getTasks({
      page,
      pageSize,
      status: filters.status,
      priority: filters.priority
    });

    setTasks(data.taskItems);
    const calculatedTotalPages = Math.ceil(data.total / pageSize);
    setTotalPages(calculatedTotalPages);
  } catch {
    setError("Failed to load tasks");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  loadTasks();
}, [filters, page, pageSize]);
useEffect(() => {
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);
  
  return (
    <div className="container">
      <h1>Task Management</h1>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(prev => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      <TaskForm onTaskSaved={loadTasks} />

      <TaskFilters
        filters={filters}
        onChange={setFilters}
      />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      <TaskList
        tasks={tasks}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPage(1);
          setPageSize(size);
        }}
        onRefresh={loadTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      {showDeleteModal && (
      <ConfirmationModal
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDeleteTask}
        onCancel={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
        />
        )}

      {showEditModal && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setShowEditModal(false)}
          onUpdated={loadTasks}
        />
      )}
    </div>
    
  );
}

export default App;
