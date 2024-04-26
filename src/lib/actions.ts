'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateAbout() {
    revalidatePath('/about');
    return Promise.resolve();
}
