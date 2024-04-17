'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/router';

export default function ParallelModal({ children }: { children: ReactNode }) {
    const router = useRouter();
    return (
        <>
            {children}
            <button
                onClick={() => {
                    router.back();
                }}>
                Close Project
            </button>
        </>
    );
}
