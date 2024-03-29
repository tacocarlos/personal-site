'use server';

import db from "@/database/db";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Visibility = "visible" | "invisibile" | "all"

type whereObj = {visible?: boolean};

export async function selectProjects(visibility: Visibility="visible"): Promise<Project[]> {
    revalidatePath("/about");

    let where: whereObj = {};
    switch (visibility) {
        case "all":
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

    return db.project.findMany({where: where});
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