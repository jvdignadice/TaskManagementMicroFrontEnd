import { useEffect, useState } from "react";
import { updateTask } from "../api/tasksApi";

function EditTaskModal({ task, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: 0,
    priority: 0,
    dueDate: ""
  });

  // Populate form when task changes
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status ?? 0,
        priority: task.priority ?? 0,
        dueDate: task.dueDate
          ? task.dueDate.split("T")[0]
          : ""
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "status" || name === "priority"
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: new Date(form.dueDate).toISOString()
    };

    await updateTask(task.id, payload);
    onUpdated();   // reload list
    onClose();     // close modal
  };

  if (!task) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Task</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value={0}>Pending</option>
            <option value={1}>In Progress</option>
            <option value={2}>Completed</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
