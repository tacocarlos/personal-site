import { Project } from '@data/Project';

import styles from "./ProjectDescription.module.css";
import ProjectElement from './_components/ProjectElement';

import process from 'process';
import { NextRequest } from 'next/server';

function getAPIURL(apiPath: string) {
    return process.env.URL + "/api/" + apiPath;
}

export default async function ProjectSection() {
    console.log("ProjectSection");
    console.log(getAPIURL('projects/'));
    // const req = new NextRequest(process.env.URL + "/api/projects/", {method: 'GET'});
    // const response = await fetch(req);
    
    const response = await fetch("http://localhost:3000/api/projects/", {method: 'GET'});
    const data = await (response.json());
    const projects = data['projects'] as Project[];
    console.log(projects);

    const projectsContent = projects.map(project => <ProjectElement project={project} key={project.id}/>);

    return <ul className={styles.projectsPanel}>
        {projectsContent}
    </ul>
}