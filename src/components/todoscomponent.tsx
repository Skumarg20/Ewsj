import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon, TrashIcon, TagIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { CheckCircleIcon, ClipboardIcon } from 'lucide-react'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import {
    Todo,
    TodoPriority,
    TodoStatus,
  } from "@/interface/todo";

interface TodoProps {
    todo: Todo,
    handleUpdate: (id: string, update: Partial<Todo>) => void
    handleDelete: (id: string) => void
  }
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
const TodoItem = ({ todo, handleUpdate, handleDelete }:TodoProps) => {
    const [priorityMenuOpen, setPriorityMenuOpen] = useState(false)
    const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  
    const getPriorityColor = (priority: TodoPriority) => {
      switch (priority) {
        case TodoPriority.HIGH: return 'bg-red-500'
        case TodoPriority.MEDIUM: return 'bg-yellow-500'
        default: return 'bg-green-500'
      }
    }
  
    const getStatusIcon = (status: TodoStatus) => {
      switch (status) {
        case TodoStatus.COMPLETED: 
          return <CheckCircleIcon className="w-5 h-5 text-green-500" />
        case TodoStatus.IN_PROGRESS: 
          return <ArrowPathIcon className="w-5 h-5 text-blue-500" />
        case TodoStatus.POSTPONED:
          return <ClipboardIcon className="w-5 h-5 text-orange-500" />
        case TodoStatus.REJECTED:
          return <ClipboardIcon className="w-5 h-5 text-red-500" />
        default: 
          return <ClipboardIcon className="w-5 h-5 text-gray-500" />
      }
    }
  
  

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
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border z-10"
                >
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => {
                        handleUpdate(todo.id, { priority })
                        setPriorityMenuOpen(false)
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
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border  overflow-y-auto custom-scrollbar z-50"
            >
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    handleUpdate(todo.id, { status })
                    setStatusMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 "
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
  )
}
interface TodosProps {
    todos: Todo[]
    handleUpdate: (id: string, update: Partial<Todo>) => void
    handleDelete: (id: string) => void
  }
const Todos = ({ todos, handleUpdate, handleDelete }: TodosProps) => {
  console.log(todos,"there are todos");
    return (
      <div className="relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {todos
            .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      </div>
    )
  }
  
  export default Todos