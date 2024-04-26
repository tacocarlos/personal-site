'use client';

import { Project } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useTransition } from 'react';
import { getProjectById } from '../../_actions/projects';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Skeleton } from '@/components/ui/skeleton';

async function getProject(projectID: string | null) {
    if (projectID === null) return Promise.reject();
    return getProjectById(projectID);
}

function PageSkeleton() {
    return (
        <main className="h-96">
            <Skeleton className="rounded-full h-8 bg-primary" />
            <br />
            <div>
                <Skeleton className=" bg-primary h-72 rounded-md" />
            </div>
        </main>
    );
}

export default function ProjectPage({ params }: { params: { id: string } }) {
    return (
        <Suspense>
            <PageComponent id={params.id} />
        </Suspense>
    );
}

function PageComponent({ id }: { id: string }) {
    const router = useRouter();
    const [project, setProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        getProject(id)
            .then((project) => {
                console.log(`Got project: ${project}`);
                setProject(project);
            })
            .catch((reason) => {
                console.log(`Failed to read project: ${reason}`);
                router.push('/');
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    let content = <PageSkeleton />;
    if (project !== undefined && project !== null) {
        // if (false) {
        console.log(`Rendering content with ${project}`);
        content = (
            <main>
                <h1 className="text-lg font-extrabold">
                    {project?.name ?? ''}
                </h1>
                <div className="bg-muted p-5">
                    <MarkdownRenderer
                        markdown={project?.description ?? project.summary}
                    />
                </div>
            </main>
        );
    }

    return content;
}
