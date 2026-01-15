import { deleteTask, getTasks, updateTask } from "../api/tasksApi";
import { useEffect, useState } from "react";


function TaskItem({ task, onRefresh }) {

  const [status, setStatus] = useState();
    
  const toggleStatus = async () => {
    await updateTask(task.id, {
      ...task,
      status: status
    });
    onRefresh();
  };
  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(task.id);
    onRefresh();
  };
  const HandleChangeStatus = async () => {
    if(task.status == 0){
        setStatus(2)
        toggleStatus();
    }else{
        setStatus(task.status)
    }
  };
  getTasks();
  ;

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status === 0 ? "Pending": task.status === 2 ? "Completed" : task.status === 1 ? "IsPending": null}</p>
      <p>Priority: {task.priority}</p>

      <button onClick={HandleChangeStatus} >
        {task.status === 0 ? "Mark as Complete" : task.status === 2 ? "Mark as Pending" : task.status === 1 ? "Mark Complete" : null}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
