'use server';

import db from '@/database/db';

export async function getProjectById(id: string) {
    return db.project.findUnique({
        where: {
            id: id,
        },
    });
}
