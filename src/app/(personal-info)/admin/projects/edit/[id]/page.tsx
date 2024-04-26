'use client';

import { useEffect, useReducer } from 'react';
import ProjectEditor from './ProjectEditor';
import { ProjectActions, projectReducer } from './projectActions';
import { getProjectById } from './_actions';
import { Project } from '@prisma/client';

export default function ProjectEditPage({
    params,
}: {
    params: { id: string };
}) {
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
            }
        );
    }, [params.id]);

    return (
        <div className="bg-white text-black block m-auto text-2xl w-3/5 rounded p-2">
            This is the project edit page for{' '}
            <span className="bg-slate-600 rounded text-white p-1 text-xl">
                {params.id}
            </span>
            <br />
            {state !== undefined ? (
                <ProjectEditor state={state} reducer={reducer} />
            ) : null}
        </div>
    );
}
