export interface StudySession {
    id:string
    time: string;
    subject: string;
    topic?: string;
    activity: string;
    notes?: string;
    completed?:boolean;
  }
  
  export interface StudyPlanInterface {
    id: string;
    date: string;
    title: string;
    description: string;
    study_hours: number;
    quote: string;
    total_time_spent: number;
    completion_rate: string;
    schedule: StudySession[];
  }