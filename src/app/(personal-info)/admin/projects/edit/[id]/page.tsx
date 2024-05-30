'use client';

import { useEffect, useReducer } from 'react';
import ProjectEditor from './ProjectEditor';
import { ProjectActions, projectReducer } from './projectActions';
import { getProjectById } from './_actions';
import { Project } from '@data/Project';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import EditProjectForm from './components/EditProjectForm';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectEditSkeleton() {
    return <Skeleton className="m-auto block h-96 w-3/5 rounded bg-white" />;
}

export default function ProjectEditPage({
    params,
}: {
    params: { id: string };
}) {
    const { toast } = useToast();

    const [state, reducer] = useReducer(projectReducer, {
        selectedProject: undefined,
    });

    const { selectedProject } = state;

    useEffect(() => {
        getProjectById(params.id).then(
            (project: Project | null | undefined) => {
                if (project === null) project = undefined;

                console.log(project);
                reducer({
                    kind: ProjectActions.SelectProject,
                    params: {
                        selectedProject: project,
                    },
                });

                toast({
                    description: `Got data for ${project?.id} : ${project?.name}`,
                });
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    if (selectedProject === undefined) return <ProjectEditSkeleton />;

    return (
        <div className="m-auto block w-3/5 rounded bg-white p-2 text-2xl text-black">
            <span>Current Project Name: {state.selectedProject?.name}</span>
            <br />
            <span className="text-[1.1rem] font-medium">
                Project ID:{' '}
                <span className="">{state.selectedProject?.id}</span>
            </span>
            <br />
            <EditProjectForm state={state} reducer={reducer} />
        </div>
    );
}
