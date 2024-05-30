'use server';

import db from '@/database/db';
import { Project } from '@data/Project';

export async function getProjectById(id: string) {
    return db.project.findUnique({
        where: {
            id: id,
        },
    });
}

export async function updateProject(
    projectID: string,
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
) {
    const projectDescription =
        projectData.description === null || projectData.description === ''
            ? null
            : projectData.description;
    return db.project.update({
        where: {
            id: projectID,
        },
        data: {
            ...projectData,
            description: projectDescription,
        },
    });
}
