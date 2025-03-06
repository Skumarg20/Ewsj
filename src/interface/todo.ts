export enum TodoPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
  }
  
  export enum TodoStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed",
    POSTPONED = "postponed",
    REJECTED = "rejected",
  }
  
  export interface TodosProps {
    todos: Todo[];
    total: number;
    handleUpdate: (id: string, update: Partial<Todo>) => void;
    handleDelete: (id: string) => void;
    page: number;
    limit: number;
    setPage: (page: number) => void;
  }
  export interface TodoPreviewProps {
    todos: Todo[];
    handleUpdate: (id: string, update: Partial<Todo>) => void;
    handleDelete: (id: string) => void;
  }
  
 
  export interface Todo {
    id: string;
    title: string;
    description: string;
    subject: string;
    priority: TodoPriority;
    due_date: string;
    status: TodoStatus;
  }
  
  export interface TodoFormInputs {
    title: string;
    description: string;
    subject: string;
    priority: TodoPriority;
    due_date: string;
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