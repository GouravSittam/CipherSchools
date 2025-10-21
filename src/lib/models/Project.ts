export interface Project {
  _id?: string;
  id: string;
  name: string;
  files: Record<string, string>;
  activeFile?: string;
  autoSave?: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // For future user authentication
}

export interface ProjectCreateInput {
  name: string;
  files: Record<string, string>;
  activeFile?: string;
  autoSave?: boolean;
  userId?: string;
}

export interface ProjectUpdateInput {
  name?: string;
  files?: Record<string, string>;
  activeFile?: string;
  autoSave?: boolean;
}
