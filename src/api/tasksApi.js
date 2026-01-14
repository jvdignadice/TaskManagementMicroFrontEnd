import axios from "axios";

const API_BASE = "https://localhost:7043/task-management";

export const getTasks = async (params) => {
  const response = await axios.get(API_BASE, { params });
  console.log("response:", response.data);
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_BASE, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_BASE}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};

export const exportTasksCsv = async (params) => {
  try {
    const response = await axios.get(`${API_BASE}/export`, {
      params,
      responseType: "blob", // important for file download
    });

    // Create a blob from the response
    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;

    // Set filename
    link.setAttribute("download", "tasks.csv");

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Release URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download CSV:", error);
  }
};
