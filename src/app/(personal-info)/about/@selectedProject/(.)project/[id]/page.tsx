'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Project } from '@prisma/client';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import { Skeleton } from '@/components/ui/skeleton';

import { getProjectById } from '../../../_actions/projects';

function ProjectPopoverSkeleton() {
    return (
        <main className="h-96">
            <Skeleton className="h-8 rounded-full bg-primary" />
            <br />
            <div>
                <Skeleton className="h-72 rounded-md bg-primary" />
            </div>
        </main>
    );
}

export default function ProjectPopover({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [project, setProject] = useState<Project | undefined>(undefined);

    function dismiss() {
        router.back();
    }

    useEffect(() => {
        getProjectById(params.id)
            .then(async (project) => {
                setProject(project);
            })
            .catch((reason) => {
                console.log(`Failed to read project: ${reason}`);
                router.push('/');
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="">
            <ReactModal isOpen={true} onRequestClose={dismiss}>
                {project === undefined ? (
                    <ProjectPopoverSkeleton />
                ) : (
                    <main>
                        <h1 className="text-lg font-extrabold">
                            {project.name}
                        </h1>
                        <div className="bg-muted">
                            <MarkdownRenderer
                                markdown={project.description ?? ''}
                            />
                        </div>
                    </main>
                )}
                <br />
                <button
                    className="rounded-xl bg-primary p-2 text-primary-foreground"
                    onClick={dismiss}>
                    Close Project
                </button>
            </ReactModal>
        </div>
    );
}
