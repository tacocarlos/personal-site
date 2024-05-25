'use client';

import { useEffect, useReducer } from 'react';
import ProjectEditor from './ProjectEditor';
import { ProjectActions, projectReducer } from './projectActions';
import { getProjectById } from './_actions';
import { Project } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import EditProjectForm from './components/EditProjectForm';

export default function ProjectEditPage({
    params,
}: {
    params: { id: string };
}) {
    const { toast } = useToast();

    const [state, reducer] = useReducer(projectReducer, {
        selectedProject: undefined,
    });

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

    return (
        <div className="m-auto block w-3/5 rounded bg-white p-2 text-2xl text-black">
            <h1 className="text-3xl">{state.selectedProject?.id}</h1>
            <br />
            <EditProjectForm state={state} reducer={reducer} />
            {/* {state !== undefined ? (
                <ProjectEditor state={state} reducer={reducer} />
            ) : null}
            <br />
            <span className="flex space-x-4">
                <Button>Apply Changes</Button>
                <Button>Return to project list</Button>
            </span> */}
        </div>
    );
}
