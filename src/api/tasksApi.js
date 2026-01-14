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
