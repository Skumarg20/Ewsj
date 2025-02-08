// Custom Hook for API Calls (hooks/useTodoApi.ts)
import axios from "axios";

export const fetchTodos = async () => {
  const response = await axios.get("/api/todos");
  return response.data;
};

export const addTodo = async (text: string) => {
  const response = await axios.post("/api/todos", { text });
  return response.data;
};

export const updateTodo = async (id: number, text: string) => {
  await axios.put(`/api/todos/${id}`, { text });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`/api/todos/${id}`);
};
