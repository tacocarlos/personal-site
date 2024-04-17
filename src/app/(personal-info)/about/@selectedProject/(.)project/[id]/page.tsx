'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Project } from '@prisma/client';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getByID } from '../../../temp_project_data/getStaticData';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectPopoverSkeleton() {
    return (
        <main className="h-96">
            <Skeleton className="rounded-full h-8 bg-primary" />
            <br />
            <div>
                <Skeleton className="bg-primary h-72 rounded-md" />
            </div>
        </main>
    );
}

// function ProjectPopoverContent({ id }: { id: string }): React.ReactNode {
//     const router = useRouter();
//     const [project, setProject] = useState<Project | undefined>(undefined);

//     useEffect(() => {
//         // getProject(projectId).then(project => {
//         getByID(id)
//             .then(async (project) => {
//                 // const wait = (ms: number) =>
//                 //     new Promise((resolve) => setTimeout(resolve, ms));
//                 // await wait(5_000);
//                 console.log(`Got project: ${project}`);
//                 setProject(project);
//             })
//             .catch((reason) => {
//                 console.log(`Failed to read project: ${reason}`);
//                 router.push('/');
//             });

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [id]);

//     let content = <ProjectPopoverSkeleton />;
//     if (project !== undefined && project !== null) {
//         // if (false) {
//         console.log(`Rendering content with ${project}`);
//         content = (
//             <main>
//                 <h1 className="text-lg font-extrabold">
//                     {project?.name ?? ''}
//                 </h1>
//                 <div className="bg-muted p-5">
//                     <MarkdownRenderer markdown={project?.description ?? ''} />
//                 </div>
//             </main>
//         );
//     }

//     return content;
// }

export default function ProjectPopover({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [project, setProject] = useState<Project | undefined>(undefined);

    function dismiss() {
        router.back();
    }

    useEffect(() => {
        // getProject(projectId).then(project => {
        getByID(params.id)
            .then(async (project) => {
                // const wait = (ms: number) =>
                //     new Promise((resolve) => setTimeout(resolve, ms));
                // await wait(5_000);
                console.log(`Got project: ${project}`);
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
                {/* <ProjectPopoverContent id={params.id} /> */}
                {project === undefined ? (
                    <ProjectPopoverSkeleton />
                ) : (
                    <main>
                        <h1 className="text-lg font-extrabold">
                            {project.name}
                        </h1>
                        <div className="bg-black">
                            <MarkdownRenderer
                                markdown={project.description ?? ''}
                            />
                        </div>
                    </main>
                )}
                <br />
                <button
                    className="rounded-xl bg-primary text-primary-foreground p-2"
                    onClick={dismiss}>
                    Close Project
                </button>
            </ReactModal>
        </div>
    );
}
