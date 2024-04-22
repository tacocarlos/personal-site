'use client';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMounted } from '@/lib/utils';

export default function BioRender({ bio }: { bio: string }) {
    const isMounted = useIsMounted();
    if (!isMounted) {
        return (
            <Skeleton className="bg-muted rounded-xl h-[100px] md:h-[300px]" />
        );
    }

    return (
        <div className="bg-muted rounded-xl">
            <MarkdownRenderer markdown={bio} className="text-black p-2" />
        </div>
    );
}
