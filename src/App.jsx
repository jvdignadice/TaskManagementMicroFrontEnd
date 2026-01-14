import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import { getTasks } from "./api/tasksApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks(filters);
      setTasks(data.items || data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters]);

  return (
    <div className="container">
      <h1>Task Management</h1>

      <TaskForm onTaskSaved={loadTasks} />

      <TaskFilters onChange={setFilters} />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      <TaskList tasks={tasks} onRefresh={loadTasks} />
    </div>
  );
}

export default App;
