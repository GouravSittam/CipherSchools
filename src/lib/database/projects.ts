import { getDatabase } from '../mongodb';
import { Project, ProjectCreateInput, ProjectUpdateInput } from '../models/Project';

const COLLECTION_NAME = 'projects';

export async function createProject(projectData: ProjectCreateInput): Promise<Project> {
  const db = await getDatabase();
  const collection = db.collection<Project>(COLLECTION_NAME);
  
  const project: Project = {
    id: Date.now().toString(),
    name: projectData.name,
    files: projectData.files,
    activeFile: projectData.activeFile,
    autoSave: projectData.autoSave ?? true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: projectData.userId,
  };

  const result = await collection.insertOne(project);
  return { ...project, _id: result.insertedId.toString() };
}

export async function getProjects(userId?: string): Promise<Project[]> {
  const db = await getDatabase();
  const collection = db.collection<Project>(COLLECTION_NAME);
  
  const query = userId ? { userId } : {};
  const projects = await collection.find(query).sort({ updatedAt: -1 }).toArray();
  
  return projects.map(project => ({
    ...project,
    _id: project._id?.toString(),
  }));
}

export async function getProjectById(id: string, userId?: string): Promise<Project | null> {
  const db = await getDatabase();
  const collection = db.collection<Project>(COLLECTION_NAME);
  
  const query = userId ? { id, userId } : { id };
  const project = await collection.findOne(query);
  
  if (!project) return null;
  
  return {
    ...project,
    _id: project._id?.toString(),
  };
}

export async function updateProject(id: string, updateData: ProjectUpdateInput, userId?: string): Promise<Project | null> {
  const db = await getDatabase();
  const collection = db.collection<Project>(COLLECTION_NAME);
  
  const query = userId ? { id, userId } : { id };
  const update = {
    ...updateData,
    updatedAt: new Date(),
  };
  
  const result = await collection.findOneAndUpdate(
    query,
    { $set: update },
    { returnDocument: 'after' }
  );
  
  if (!result) return null;
  
  return {
    ...result,
    _id: result._id?.toString(),
  };
}

export async function deleteProject(id: string, userId?: string): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection<Project>(COLLECTION_NAME);
  
  const query = userId ? { id, userId } : { id };
  const result = await collection.deleteOne(query);
  
  return result.deletedCount > 0;
}

export async function getProjectCount(userId?: string): Promise<number> {
  const db = await getDatabase();
  const collection = db.collection<Project>(COLLECTION_NAME);
  
  const query = userId ? { userId } : {};
  return await collection.countDocuments(query);
}
