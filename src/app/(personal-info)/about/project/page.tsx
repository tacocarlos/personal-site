'use client'

import { ProjectTag } from "@/app/types/Tag";
import { Project } from "@/data/Project";
import { useRouter, useSearchParams } from "next/navigation"
import { NextRequest } from "next/server";
import { Suspense, useEffect, useState } from "react";

async function getProject(projectID: string): Promise<Project> {
    // const req = new NextRequest("/api/projects", {method: 'GET'});
    // req.cookies.set('project', projectID);

    // const res = await fetch(req);
    // const data = await res.json();
    // const project = data['project'] as Project;

    // if(project === undefined) {
    //     return Promise.reject();
    // }

    const project: Project = {
        id: "1",
        name: "Some Project",
        tags: [ProjectTag.CPP],
        summary: "A summary"
    }

    return Promise.resolve(project);
}

export default function ProjectPage() {
    return <Suspense>
        <PageComponent/>
    </Suspense>
}

function PageComponent() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('project');
    const [project, setProject] = useState<Project | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        if(projectId === null) { 
            return; 
        }

        getProject(projectId).then(project => {
            setProject(project);
        }).catch(() => {
            router.push('/calculator');
        })
    })

    if(projectId === null) {
        return <div>failure</div>
    }

    if(project === undefined) {
        return <></>
    }

    return <main>
        <h1 className='text-lg'>
            {project.name}
        </h1>
    </main>    
}