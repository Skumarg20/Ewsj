export interface CreateFolder {
    name: string;
    color: string;
    description?: string;
  }
  
  export interface Note {
    id: number;
    title: string;
    preview: string;
    date: string;
    content:string;
    lastModified: string;
    tags?: string[];
  }
  
  export interface FolderData {
    id: string;
    name: string;
    color: string;
    description?: string;
    notes: Note[];
  }