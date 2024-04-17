'use server';

import db from "@/database/db";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Visibility = "visible" | "invisibile" | "all"

type whereObj = {visible?: boolean};

export async function selectProjects(visibility: Visibility="visible"): Promise<Project[]> {
    revalidatePath("/about");

    let where: whereObj | undefined = {};
    switch (visibility) {
        case "all":
            where = undefined;
            break;
        case "visible":
            where.visible = true;
            break;
        case "invisibile":
            where.visible = false;
            break;    
        default:
            return [];
    }

    if(where !== undefined) {
        return db.project.findMany({where: where});
    }
    
    return db.project.findMany();
}

export async function getProjectById(id: string, visible?: true) {
    const project = await db.project.findUnique({
        where: {
            id: id,
            visible: visible 
        }
    });

    if(project !== null) {
        return Promise.resolve(project);
    }

    return Promise.reject();

}