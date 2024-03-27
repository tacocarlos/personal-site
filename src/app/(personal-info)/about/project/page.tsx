'use client'

import { Project } from "@/data/Project";
import db from "@/lib/db";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";

async function getProject(projectID: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectID,
            visible: true
        }
    });

    if(project === null) {
        return Promise.reject();
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