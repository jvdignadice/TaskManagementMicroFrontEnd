function TaskFilters({ onChange }) {
  return (
    <div className="filters">
      <select onChange={(e) => onChange({ status: e.target.value })}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select onChange={(e) => onChange({ priority: e.target.value })}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default TaskFilters;
