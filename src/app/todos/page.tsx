"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { CheckCircleIcon, ClipboardIcon } from "lucide-react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Todo, TodoPriority, TodoStatus } from "@/interface/todo";
import { useTodoStore } from "@/state/store/todosstore";
import withAuth from "@/lib/withAuth";
import { statusOptions, priorityOptions } from "@/interface/todo";



// TodoItem Component
const TodoItem = ({
  todo,
  handleUpdate,
  handleDelete,
}: {
  todo: Todo;
  handleUpdate: (id: string, update: Partial<Todo>) => void;
  handleDelete: (id: string) => void;
}) => {
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case TodoPriority.HIGH:
        return "bg-red-500";
      case TodoPriority.MEDIUM:
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.COMPLETED:
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case TodoStatus.IN_PROGRESS:
        return <ArrowPathIcon className="w-5 h-5 text-blue-500" />;
      case TodoStatus.POSTPONED:
        return <ClipboardIcon className="w-5 h-5 text-orange-500" />;
      case TodoStatus.REJECTED:
        return <ClipboardIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClipboardIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-2xl shadow-lg flex flex-col space-y-3 relative"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">{todo.title}</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className={`px-3 py-1 rounded-full text-sm text-white ${getPriorityColor(todo.priority)} flex items-center gap-1`}
              onClick={() => setPriorityMenuOpen(!priorityMenuOpen)}
            >
              {todo.priority}
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {priorityMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border z-50"
                >
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => {
                        handleUpdate(todo.id, { priority });
                        setPriorityMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 ${getPriorityColor(priority)} text-white`}
                    >
                      {priority}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDelete(todo.id)}
            className="p-2 hover:bg-red-100 rounded-full transition-all duration-200"
          >
            <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
          </motion.button>
        </div>
      </div>
      <p className="text-gray-600">{todo.description}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <TagIcon className="w-4 h-4" />
        <span>{todo.subject}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <CalendarIcon className="w-4 h-4" />
        <span>Due: {new Date(todo.due_date).toLocaleDateString()}</span>
      </div>
      <div className="relative flex items-center gap-2 text-sm">
        {getStatusIcon(todo.status)}
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
          onClick={() => setStatusMenuOpen(!statusMenuOpen)}
        >
          <span>{todo.status}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
        <AnimatePresence>
          {statusMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative h-auto left-0 mt-2 bg-white rounded-lg shadow-lg border overflow-y-auto custom-scrollbar z-50"
            >
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    handleUpdate(todo.id, { status });
                    setStatusMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 z-50"
                >
                  {getStatusIcon(status)}
                  {status}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

 function TodosPage() {
  const { todos, error, fetchTodos, updateTodo, deleteTodo, loading, total } =
    useTodoStore();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchTodos(page, limit, () => {});
  }, [fetchTodos, page]);

  const totalPages = Math.ceil(total / limit);

  const handleUpdate = (id: string, update: Partial<Todo>) => {
    updateTodo(id, update, () => {});
  };

  const handleDelete = (id: string) => {
    deleteTodo(id, () => {});
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        All Your Todos ✨
      </motion.h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg disabled:opacity-50 transition-all duration-300"
          >
            Previous
          </motion.button>
          <span className="text-gray-700 text-lg">
            Page {page} of {totalPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg disabled:opacity-50 transition-all duration-300"
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(TodosPage)