import { create } from "zustand";
import axios from "axios";
import { Todo, TodoFormInputs } from "@/interface/todo";
import { getAuthHeader } from "@/lib/api";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  total: number; 
  fetchTodos: (page: number, limit: number, setLoading: (loading: boolean) => void) => Promise<void>;
  addTodo: (todo: TodoFormInputs, setLoading: (loading: boolean) => void) => Promise<void>;
  updateTodo: (id: string, updatedTodo: Partial<Todo>, setLoading: (loading: boolean) => void) => Promise<void>;
  deleteTodo: (id: string, setLoading: (loading: boolean) => void) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,
  total: 0, // Initial total count
  fetchTodos: async (page: number, limit: number, setLoading: (loading: boolean) => void) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      const response = await axios.get<{ todos: Todo[]; total: number }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/todos`,
        {
          headers: {
            ...getAuthHeader(),
          },
          params: {
            page,
            limit,
          },
        }
      );
      set({
        todos: response.data.todos,
        total: response.data.total, // Update total from API response
      });
    } catch (error) {
      console.error("Fetch todos failed:", error);
      set({ error: "Failed to fetch todos" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },

  addTodo: async (todo: TodoFormInputs, setLoading: (loading: boolean) => void) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      const response = await axios.post<Todo>(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`, todo, {
        headers: {
          ...getAuthHeader(),
        },
      });
      set((state) => ({
        todos: [...state.todos, response.data],
        total: state.total + 1, // Increment total
      }));
    } catch (error) {
      console.error("Add todo failed:", error);
      set({ error: "Failed to add todo" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },

  updateTodo: async (id: string, updatedTodo: Partial<Todo>, setLoading: (loading: boolean) => void) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      const response = await axios.patch<Todo>(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`, updatedTodo, {
        headers: {
          ...getAuthHeader(),
        },
      });
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? response.data : todo)),
      }));
    } catch (error) {
      console.error("Update todo failed:", error);
      set({ error: "Failed to update todo" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },

  deleteTodo: async (id: string, setLoading: (loading: boolean) => void) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`, {
        headers: {
          ...getAuthHeader(),
        },
      });
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        total: state.total - 1, // Decrement total
      }));
    } catch (error) {
      console.error("Delete todo failed:", error);
      set({ error: "Failed to delete todo" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },
}));