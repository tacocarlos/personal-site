import { ProjectTag } from '@/app/types/Tag';
import { ItemID } from '@data/ItemID';

export type Project = {
    id: string;
    name: string;
    tags: string[];
    summary: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    visible: boolean;
};

export function createProject(
    name: string,
    tags: string[],
    summary: string,
    description?: string,
    id?: ItemID
): Project {
    if (id === undefined) {
        id = crypto.randomUUID();
    }

    return {
        id: id,
        name: name,
        tags: tags,
        summary: summary,
        description: description ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
    };
}
