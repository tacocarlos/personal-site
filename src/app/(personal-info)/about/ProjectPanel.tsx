import { Project } from '@data/Project';

import styles from "./ProjectDescription.module.css";
import ProjectElement from './_components/ProjectElement';

import process from 'process';
import { ProjectTag } from '@/app/types/Tag';

function getAPIURL(apiPath: string) {
    return process.env.URL + "/api/" + apiPath;
}

export default async function ProjectSection() {
    // const response = await fetch("http://localhost:3000/api/projects/", {method: 'GET'});
    // const data = await (response.json());
    // const projects = data['projects'] as Project[];
    const projects: Project[] = [ {
        id: "1",
        name: "Some Project",
        tags: [ProjectTag.CPP],
        summary: "A summary"
    }
    ]

    const projectsContent = projects.map(project => <ProjectElement project={project} key={project.id}/>);

    return <ul className={styles.projectsPanel}>
        {projectsContent}
    </ul>
}