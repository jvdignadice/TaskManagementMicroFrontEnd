import StatusFilter from "./StatusFilters";
import PriorityFilter from "./PriorityFilter";

function TaskFilters({ filters, onChange }) {
  const handleStatusChange = (status) => {
    onChange({ ...filters, status });
  };

  const handlePriorityChange = (priority) => {
    onChange({ ...filters, priority });
  };

  return (
    <div className="filters">
      <StatusFilter
        value={filters.status}
        onChange={handleStatusChange}
      />

      <PriorityFilter
        value={filters.priority}
        onChange={handlePriorityChange}
      />
    </div>
  );
}

export default TaskFilters;
