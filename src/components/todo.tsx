"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  XMarkIcon,
  CalendarIcon,
  TagIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PencilIcon,
  BookOpenIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useTodoStore } from "@/state/store/todosstore";
import { useLoading } from "@/app/loader/context/loadingprovider";
import {
  Todo,
  TodoFormInputs,
  TodoPriority,
  TodoStatus,
} from "@/interface/todo";

export const statusOptions: TodoStatus[] = [
  TodoStatus.PENDING,
  TodoStatus.IN_PROGRESS,
  TodoStatus.COMPLETED,
  TodoStatus.POSTPONED,
  TodoStatus.REJECTED,
];

export const priorityOptions: TodoPriority[] = [
  TodoPriority.LOW,
  TodoPriority.MEDIUM,
  TodoPriority.HIGH,
];
export default function TodoApp() {
  const { todos, error, fetchTodos, addTodo, deleteTodo, updateTodo, loading } =
    useTodoStore();
  const { setLoading } = useLoading();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState<string | null>(null);
  const [priorityMenuOpen, setPriorityMenuOpen] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormInputs>();
  useEffect(() => {
    fetchTodos(setLoading);
  }, [fetchTodos]);

  const onSubmit: SubmitHandler<TodoFormInputs> = async (data) => {
    console.log(data, "thisis form data");
    await addTodo(data, setLoading);
    console.log("submiting the data");
    reset();
    setIsFormOpen(false);
    fetchTodos(setLoading);
    setIsFormOpen(false);
  };

  const handleUpdate = async (
    todoId: string,
    updates: { status?: Todo["status"]; priority?: Todo["priority"] }
  ) => {
    const updateData: Partial<Todo> = {};
    if (updates.status) updateData.status = updates.status;
    if (updates.priority) updateData.priority = updates.priority;

    await updateTodo(todoId, updateData, setLoading);
    setStatusMenuOpen(null);
    setPriorityMenuOpen(null);
    fetchTodos(setLoading);
  };
  const handleDelete = async (todoId: string) => {
    await deleteTodo(todoId, setLoading);
    fetchTodos(setLoading);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const getPriorityColor = (priority: Todo["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
    }
  };

  const getStatusIcon = (status: Todo["status"]) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
      case "in-progress":
        return <ExclamationCircleIcon className="w-5 h-5 text-blue-500" />;
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "postponed":
        return <CalendarIcon className="w-5 h-5 text-yellow-500" />;
      case "rejected":
        return <XMarkIcon className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
    <div className="w-full mx-auto max-w-7xl relative">
      {/* Add Todo Button */}
      <motion.button
        onClick={toggleForm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full p-4 mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
      >
        <PlusIcon className="w-6 h-6" />
        Add Todo
      </motion.button>

      {/* Todo Form Popup */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto md:mt-10 md:pt-5 custom-scrollbar rounded-lg"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md lg:max-w-2xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-white/90 z-10 rounded-xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ">
                  Create Todo
                </h2>
                <button
                  onClick={toggleForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6"
              >
                {/* Title */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                    Title
                  </label>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 hover:border-purple-400 transition-all duration-200">
                    <input
                      {...register("title", {
                        required: "Title is required",
                      })}
                      placeholder="Enter a title"
                      className="w-full p-2 bg-transparent focus:outline-none placeholder-gray-400"
                    />
                    <TagIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 hover:border-purple-400 transition-all duration-200">
                    <input
                      {...register("subject")}
                      placeholder="Enter a subject"
                      className="w-full p-2 bg-transparent focus:outline-none placeholder-gray-400"
                    />
                    <BookOpenIcon className="w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Description */}
                <div className="relative lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="flex items-start gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 hover:border-purple-400 transition-all duration-200">
                    <textarea
                      {...register("description")}
                      placeholder="Add a description"
                      className="w-full p-2 bg-transparent focus:outline-none placeholder-gray-400 resize-none"
                      rows={3}
                    />
                    <PencilIcon className="w-5 h-5 text-gray-500 mt-2" />
                  </div>
                </div>

                {/* Priority */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 hover:border-purple-400 transition-all duration-200">
                    <select
                      {...register("priority", {
                        required: "Priority is required",
                      })}
                      className="w-full p-2 bg-transparent focus:outline-none appearance-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <ExclamationCircleIcon className="w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Due Date */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 hover:border-purple-400 transition-all duration-200">
                    <input
                      type="date"
                      {...register("due_date", {
                        required: "Due date is required",
                      })}
                      className="mt-1 block w-full p-2 bg-[#2D336B] text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full lg:col-span-2 p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Create Todo
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Todo List */}
        <div className="space-y-4 relative z-0">
          {todos
            .sort(
              (a, b) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            )
            .map((todo) => (
              <motion.div
                key={todo.id}
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
                        onClick={() => setPriorityMenuOpen(priorityMenuOpen === todo.id ? null : todo.id)}
                      >
                        {todo.priority}
                        <ChevronDownIcon className="w-4 h-4" />
                      </button>
                      <AnimatePresence>
                        {priorityMenuOpen === todo.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border z-10"
                          >
                            {priorityOptions.map((priority) => (
                              <button
                                key={priority}
                                onClick={() => handleUpdate(todo.id, { priority })}
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
                  <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="relative flex items-center gap-2 text-sm">
                  {getStatusIcon(todo.status)}
                  <button 
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setStatusMenuOpen(statusMenuOpen === todo.id ? null : todo.id)}
                  >
                    <span>{todo.status}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {statusMenuOpen === todo.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border z-10"
                      >
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdate(todo.id, { status })}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
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
            ))}
        </div>
      </div>
    </div>
  )
}