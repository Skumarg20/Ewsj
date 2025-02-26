import { create } from "zustand";
import axios from "axios";
import { Todo, TodoFormInputs, TodoPriority, TodoStatus } from "@/interface/todo";
import { useLoading } from "@/app/loader/context/loadingprovider";
import { getAuthHeader } from "@/lib/api";


interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;

  fetchTodos: (setLoading: (loading: boolean) => void) => Promise<void>;
  addTodo: (todo: TodoFormInputs,setLoading: (loading: boolean) => void) => Promise<void>;
  updateTodo: (id: string, updatedTodo: Partial<Todo>,setLoading: (loading: boolean) => void) => Promise<void>;
  deleteTodo: (id: string,setLoading: (loading: boolean) => void) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async (setLoading) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      const response = await axios.get<Todo[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`,{
        headers:{
          ...getAuthHeader(),
        }
      });
      set({ todos: response.data });
    } catch (error) {
      set({ error: "Failed to fetch todos" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },


  addTodo: async (todo: TodoFormInputs,setLoading) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      const response = await axios.post<Todo>(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`, todo,{
        headers:{
          ...getAuthHeader(),
          'Content-Type':'application/json'

        }
      });
      set({ todos: [...get().todos, response.data] });
    } catch (error) {
      set({ error: "Failed to add todo" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },

  // Update a Todo
  updateTodo: async (id: string, updatedTodo: Partial<Todo>,setLoading) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      const response = await axios.patch<Todo>(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`, updatedTodo,{
        headers:{
          ...getAuthHeader(),
          "content-Type":"application/json"
        }
      });
      set({
        todos: get().todos.map((todo) => (todo.id === id ? response.data : todo)),
      });
    } catch (error) {
      set({ error: "Failed to update todo" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },

  // Delete a Todo
  deleteTodo: async (id: string,setLoading) => {
    set({ loading: true, error: null });
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`,{
        headers:{
          ...getAuthHeader(),
          "content-Type":"application/json"
        }
      });
      set({ todos: get().todos.filter((todo) => todo.id !== id) });
    } catch (error) {
      set({ error: "Failed to delete todo" });
    } finally {
      set({ loading: false });
      setLoading(false);
    }
  },
}));
