function StatusFilters({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Status</option>
      <option value="pending">Pending</option>
      <option value="inprogress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  );
}

export default StatusFilters;
