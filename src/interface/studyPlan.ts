export interface WeeklyStudyPlan
{   
    dailyHours:number;
    dailyPlan:string[];
    chapters:string[];
    schoolSchedule:string;
    subjects:string[];
}

export interface StudyPlanUsingGetApi{
    id?:string;
    planType?:string;
    status?:string;
    weeklyData?:WeeklyStudyPlan|null;
    targetData?:targetedStudyPlan|null;
    customData?:string|null;
    metrics?:string;
    progress?:string|null;
}

export interface targetedStudyPlan{
    dailyHours:number;
    dailyPlan:string[];
    chapters:string[];
    schoolSchedule?:string;
    subjects?:string[];
    due_date?:string;
    
}

export interface TargetPlanData {
    dailyPlan: string[];
    subjects: string[];
    dueDate: string; // Using string for date input, will be converted to Date on submit
    chapters: string[];
    dailyHours: number;
    existingCommitments: boolean;
    milestones: string[];
  }
  export interface CustomStudyPlan{
    title:string;
    content:string;
  }