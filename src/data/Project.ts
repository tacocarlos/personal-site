import { Project as ProjectSchema } from '@prisma/client';

export type Project = ProjectSchema;
export type ProjectData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export function createProject(
    project: Project & { id?: string; createdAt?: Date; updatedAt?: Date }
): Project {
    if (project.id === undefined) {
        project.id = crypto.randomUUID();
    }
    if (project.createdAt === undefined) {
        project.createdAt = new Date();
    }
    if (project.updatedAt === undefined) {
        project.updatedAt = new Date();
    }

    return {
        ...project,
    };
}
