import { NextRequest, NextResponse } from 'next/server';
import { createProject, getProjects } from '@/lib/database/projects';
import { ProjectCreateInput } from '@/lib/models/Project';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    
    const projects = await getProjects(userId);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProjectCreateInput = await request.json();
    
    if (!body.name || !body.files) {
      return NextResponse.json(
        { success: false, error: 'Name and files are required' },
        { status: 400 }
      );
    }
    
    const project = await createProject(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
