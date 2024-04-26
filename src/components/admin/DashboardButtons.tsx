'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DBButtons() {
    const router = useRouter();
    return (
        <span className="self-start">
            <Button
                className="bg-secondary text-secondary-foreground hover:bg-green-500"
                onClick={() => router.push('/admin/projects/add')}>
                Create New Project
            </Button>
        </span>
    );
}
