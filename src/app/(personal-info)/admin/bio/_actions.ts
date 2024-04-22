'use server';

import db from '@/database/db';
import { Biography } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getAllBio() {
    return await db.biography.findMany({
        orderBy: {
            updatedAt: 'desc',
        },
    });
}

export async function updateBio(
    bio: Omit<Biography, 'createdAt' | 'updatedAt'>
) {
    const result = await db.biography.update({
        where: { id: bio.id },
        data: { ...bio },
    });

    revalidatePath('/about');
    return result;
}

export async function createBio(
    bio: Omit<Biography, 'id' | 'createdAt' | 'updatedAt'>
) {
    const result = await db.biography.create({
        data: { ...bio },
    });

    revalidatePath('/about');
    return result;
}

export async function enableBio(bioID: string) {
    return await db.biography.update({
        where: { id: bioID },
        data: { selected: false },
    });
}

export async function disableBio(bioID: string) {
    return await db.biography.update({
        where: { id: bioID },
        data: { selected: false },
    });
}

export async function setBioAsSelected(bioID: string) {
    await db.biography.updateMany({
        data: {
            selected: false,
        },
    });

    const update = await db.biography.update({
        where: {
            id: bioID,
        },
        data: {
            selected: true,
        },
    });

    revalidatePath('/about');
    return update;
}
