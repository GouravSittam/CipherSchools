import { getDatabase } from '../mongodb';
import { Project } from '../models/Project';

const COLLECTION_NAME = 'projects';

export async function cleanupDatabase(): Promise<void> {
    try {
        const db = await getDatabase();
        const collection = db.collection<Project>(COLLECTION_NAME);

        // Get all projects
        const allProjects = await collection.find({}).toArray();
        console.log(`Found ${allProjects.length} projects in database`);

        // Find projects to keep (Welcome to CipherStudio)
        const projectsToKeep = allProjects.filter(project =>
            project.name === "Welcome to CipherStudio"
        );

        // Find projects to delete (everything else)
        const projectsToDelete = allProjects.filter(project =>
            project.name !== "Welcome to CipherStudio"
        );

        console.log(`Projects to keep: ${projectsToKeep.length}`);
        console.log(`Projects to delete: ${projectsToDelete.length}`);

        if (projectsToDelete.length > 0) {
            // Delete all projects except "Welcome to CipherStudio"
            const deleteResult = await collection.deleteMany({
                name: { $ne: "Welcome to CipherStudio" }
            });

            console.log(`Successfully deleted ${deleteResult.deletedCount} projects`);
            console.log('Remaining projects:');

            // Show remaining projects
            const remainingProjects = await collection.find({}).toArray();
            remainingProjects.forEach(project => {
                console.log(`- ${project.name} (ID: ${project.id})`);
            });
        } else {
            console.log('No projects to delete. Only "Welcome to CipherStudio" projects found.');
        }

    } catch (error) {
        console.error('Error cleaning up database:', error);
        throw error;
    }
}