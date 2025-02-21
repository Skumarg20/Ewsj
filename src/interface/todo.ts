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
  
  export interface Todo {
    id: string;
    title: string;
    description: string;
    subject: string;
    priority: TodoPriority;
    dueDate: string;
    status: TodoStatus;
  }
  
  export interface TodoFormInputs {
    title: string;
    description: string;
    subject: string;
    priority: TodoPriority;
    due_date: string;
  }
  