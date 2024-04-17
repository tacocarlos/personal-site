'use server';

/**
 * Since it'll take a while to fully get the admin section working,
 *      I will just hard code the project data for now.
 */

import { Project } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const TEMP_PREFIX = 'src/app/(personal-info)/about/temp_project_data/';
function makePath(filePath: string) {
    return join(TEMP_PREFIX, filePath);
}

function readAllProjects(): Project[] {
    const projectSource = makePath('project-data.json');
    const projectBlob = readFileSync(projectSource, 'utf8');
    const data = JSON.parse(projectBlob, (key, value) => {
        switch (key) {
            case 'description':
                return readFileSync(makePath(value), 'utf8');
            default:
                return value;
        }
    });
    console.log(data);
    return data['projects'] as Project[];
}

const projects: Project[] = readAllProjects();

export async function getAllProjects() {
    return projects;
}

export async function getStaticBio() {
    const bioFile = makePath('bio.md');
    return readFileSync(bioFile, 'utf8');
}

export async function getStaticFeatured() {
    return projects.filter((project) => project.featured === true);
}

export async function getStaticVisible() {
    return projects.filter((project) => project.visible === true);
}

export async function getByID(id: string | null) {
    if (id === null) {
        return undefined;
    }
    return projects.find((project) => project.id === id);
}
