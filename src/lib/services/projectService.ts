import { Project, ProjectCreateInput, ProjectUpdateInput } from '../models/Project';

const API_BASE = '/api/projects';

export class ProjectService {
  private static async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    const data = await response.json();
    return data.data;
  }

  static async getProjects(userId?: string): Promise<Project[]> {
    const url = userId ? `${API_BASE}?userId=${userId}` : API_BASE;
    return this.request<Project[]>(url);
  }

  static async getProject(id: string, userId?: string): Promise<Project> {
    const url = userId ? `${API_BASE}/${id}?userId=${userId}` : `${API_BASE}/${id}`;
    return this.request<Project>(url);
  }

  static async createProject(projectData: ProjectCreateInput): Promise<Project> {
    return this.request<Project>(API_BASE, {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  static async updateProject(
    id: string,
    updateData: ProjectUpdateInput,
    userId?: string
  ): Promise<Project> {
    const url = userId ? `${API_BASE}/${id}?userId=${userId}` : `${API_BASE}/${id}`;
    try {
      return await this.request<Project>(url, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
    } catch (error: any) {
      // If project doesn't exist (404), throw a specific error
      if (error.message?.includes('404') || error.message?.includes('not found')) {
        throw new Error('PROJECT_NOT_FOUND');
      }
      throw error;
    }
  }

  static async deleteProject(id: string, userId?: string): Promise<void> {
    const url = userId ? `${API_BASE}/${id}?userId=${userId}` : `${API_BASE}/${id}`;
    await this.request<void>(url, {
      method: 'DELETE',
    });
  }
}
