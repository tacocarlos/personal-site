'use server';

import { Project, ProjectData } from '@/data/Project';
import db from '@/database/db';
import { FormSchemaType } from '../edit/[id]/components/form-components/FormSchema';

function FormValuesToProjectData(values: FormSchemaType): ProjectData {
    const tags = values.tags.map((tag) => tag.tag);
    return {
        ...values,
        tags: tags,
        projectLink: values.projectLink ?? null,
        sourceLink: values.sourceLink ?? null,
    };
}

export async function AddNewProject(
    projectData: ProjectData
): Promise<Project> {
    const project = await db.project.create({
        data: projectData,
    });

    return project;
}

export async function AddNewProjectFromForm(
    formData: FormSchemaType
): Promise<Project> {
    return await AddNewProject(FormValuesToProjectData(formData));
}
