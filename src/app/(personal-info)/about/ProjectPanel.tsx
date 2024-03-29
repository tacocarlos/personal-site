import styles from "./ProjectDescription.module.css";
import ProjectElement from './_components/ProjectElement';

import { cache } from '@/lib/cache';
import { selectProjects } from './_actions/projects';

const getVisibleProjects = cache(() => {
    return selectProjects("visible");
}, ["/about", "getVisibleProjects"]);

export default async function ProjectSection() {
    const projects = await getVisibleProjects();
    const projectsContent = projects.map(project => <ProjectElement {...project} key={project.id}/>);
    return <ul className={styles.projectsPanel}>
        {projectsContent}
    </ul>
}