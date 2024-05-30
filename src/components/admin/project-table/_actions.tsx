'use server';

import db from '@/database/db';
import { Project } from '@data/Project';
import { revalidatePath } from 'next/cache';

export async function setProjectVisible(projectID: string) {
    return await db.project.update({
        where: { id: projectID },
        data: { visible: true },
    });
}

export async function setProjectHidden(projectID: string) {
    return await db.project.update({
        where: { id: projectID },
        data: { visible: false },
    });
}

export async function setProjectFeatured(projectID: string) {
    return await db.project.update({
        where: { id: projectID },
        data: { visible: true, featured: true },
    });
}

export async function addProject(
    projectData: Omit<Project, 'createdAt' | 'updatedAt' | 'id'>
) {
    return await db.project.create({
        data: projectData,
    });
}

export async function hideAllProjects() {
    return await db.project.updateMany({
        data: {
            visible: false,
        },
    });
}
