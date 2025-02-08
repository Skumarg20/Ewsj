// // Zustand Store (store/todoStore.ts)
// import { create } from "zustand";
// import { fetchTodos, addTodo, updateTodo, deleteTodo } from "@/hooks/useTodoApi";

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// interface TodoStore {
//   todos: Todo[];
//   loadTodos: () => Promise<void>;
//   addNewTodo: (text: string) => Promise<void>;
//   updateExistingTodo: (id: number, text: string) => Promise<void>;
//   removeTodo: (id: number) => Promise<void>;
// }

// export const useTodoStore = create<TodoStore>((set) => ({
//   todos: [],
  
//   loadTodos: async () => {
//     const data = await fetchTodos();
//     set({ todos: data });
//   },

//   addNewTodo: async (text) => {
//     const newTodo = await addTodo(text);
//     set((state) => ({ todos: [...state.todos, newTodo] }));
//   },

//   updateExistingTodo: async (id, text) => {
//     await updateTodo(id, text);
//     set((state) => ({
//       todos: state.todos.map((todo) =>
//         todo.id === id ? { ...todo, text } : todo
//       ),
//     }));
//   },

//   removeTodo: async (id) => {
//     await deleteTodo(id);
//     set((state) => ({
//       todos: state.todos.filter((todo) => todo.id !== id),
//     }));
//   },
// }));


import { create } from "zustand";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo:(id:number,text:string)=>void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [ { id: 1, text: 'Revise Kinematics', completed: false },
    { id: 2, text: 'Solve 10 Physics Problems', completed: true },
    { id: 3, text: 'Watch Video on Electrostatics', completed: false },],

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
    updateTodo: (id:number, newText:string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          ),
        })),
}));
