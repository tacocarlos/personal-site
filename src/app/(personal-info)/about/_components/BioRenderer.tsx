'use client';

import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMounted } from '@/lib/utils';

export default function BioRender({ bio }: { bio: string }) {
    const isMounted = useIsMounted();
    if (!isMounted) {
        return (
            <Skeleton className="h-[100px] rounded-xl bg-muted md:h-[300px]" />
        );
    }

    return (
        <div className="rounded-xl bg-muted">
            <MarkdownRenderer markdown={bio} className="p-2 text-black" />
        </div>
    );
}
