'use client';

import styles from '../ProjectDescription.module.css';
import { useRouter } from 'next/navigation';

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
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function ProjectElement({
    id,
    name,
    tags,
    summary,
    description,
    createdAt,
    updatedAt,
    visible,
    tagline,
    projectLink,
    sourceLink,
}: Project) {
    let footer = null;

    if (sourceLink) {
        footer = (
            <div className="flex bg-primary p-0.5 rounded-md">
                <a
                    href={sourceLink}
                    className=" text-white rounded-sm hover:bg-blue-400 hover:text-black w-full">
                    Source Code Link
                </a>
            </div>
        );
    }

    if (projectLink) {
        footer = (
            <>
                {footer}
                <Separator />
                <div className="bg-slate-600 p-1 rounded-md">
                    <a href={projectLink}>Project Site Link</a>
                </div>
            </>
        );
    }

    return (
        <Card className="bg-white max-w-screen-sm ">
            <CardHeader>
                <CardTitle>
                    {/* <a
                        className="hover:text-sky-600"
                        href={`/about/project?project=${id}`}>
                        {name}
                    </a> */}
                    <Link href={`/about/project/${id}`} passHref>
                        {name}
                    </Link>
                </CardTitle>
                <CardDescription>
                    {tagline ? <div className="mb-1">{tagline}</div> : null}
                    <div className="inline space-x-1 select-none">
                        {tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>{summary}</CardContent>
            <CardFooter className="block">{footer}</CardFooter>
        </Card>
    );
}
