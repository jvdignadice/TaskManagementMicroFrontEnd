import { useState } from "react";
import { createTask } from "../api/tasksApi";

function TaskForm({ onTaskSaved }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await createTask({
        title,
        description,
        priority,
        status: "pending",
      });

      setTitle("");
      setDescription("");
      onTaskSaved();
    } catch {
      setError("Failed to create task");
    }
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
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
