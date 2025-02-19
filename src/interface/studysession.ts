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
    date?: string;
    title?: string;
    description?: string;
    study_hours?: number;
    schedule?: StudySession[];
    quote?: string;
  }