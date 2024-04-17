'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Project } from '@prisma/client';
import { fmtDate } from '@/lib/utils';

export function ProjectVisibility({ visibility }: { visibility: boolean }) {
    const invisibleCN = 'text-red-600 font-semibold';
    const visibleCN = 'text-green-500 font-semibold';

    const visiMsg = visibility ? 'Visible' : 'Not Visible';
    let cn = visibleCN;

    if (visibility == false) {
        cn = invisibleCN;
    }

    return <span className={cn}>{visiMsg}</span>;
}

export default function ProjectCard({
    id,
    name,
    tags,
    summary,
    description,
    createdAt,
    updatedAt,
    visible,
}: Project) {
    return (
        <Card className="bg-white" key={id}>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <div className="inline space-x-1 select-none overflow-scroll">
                    {tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>
                <CardDescription>
                    <ProjectVisibility visibility={visible} />
                    <br />
                    Created At: {fmtDate(createdAt)}
                    <br />
                    Updated At: {fmtDate(updatedAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>{summary}</CardContent>
        </Card>
    );
}
