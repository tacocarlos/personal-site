import { ProjectTag } from "@/app/types/Tag";
import { ItemID } from "@data/ItemID";

export type Project = {
    id: ItemID;
    name: string;
    tags: string[];
    summary: string;
    description?: string;
}

export function createProject(name: string, tags: string[], summary: string, description?: string, id?: ItemID): Project {
    if(id === undefined) {
        id = crypto.randomUUID();
    }

    return {
        id: id,
        name: name,
        tags: tags,
        summary: summary,
        description: description
    }
}