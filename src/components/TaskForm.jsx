import { useState } from "react";
import { createTask, exportTasksCsv } from "../api/tasksApi";

function TaskForm({ onTaskSaved }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1); // Medium
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);

      await createTask({
        title,
        description,
        priority: Number(priority),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null
      });
      
      setTitle("");
      setDescription("");
      setPriority("1");
      setDueDate("");

      onTaskSaved();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    exportTasksCsv({ status: "Pending", search: "report" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      {error && <p className="error">{error}</p>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        maxLength={100}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        maxLength={500}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </select>

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit" disabled={loading} style={{ marginRight: "10px" }}>
        {loading ? "Saving..." : "Add Task"}
      </button>

      <button type="button" onClick={handleExport}>
        Export Tasks as CSV
      </button>
    </form>
  );
}

export default TaskForm;
