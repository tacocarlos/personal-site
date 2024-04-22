import ProjectElement from './_components/ProjectElement';
import { selectProjects } from './_actions/projects';

export default async function ProjectShowcase() {
    const projects = (await selectProjects('visible')).sort((a, b) => {
        if (a.featured && !b.featured) {
            return -1; // place a first
        } else if (a.featured && b.featured) {
            return 0;
        }
        return 1; // place b first
    });

    const projectsContent = projects.map((project) => (
        <ProjectElement {...project} key={project.id} />
    ));

    return (
        <ul className="flex flex-wrap gap-x-4 gap-y-4 content-center align-top justify-center">
            {projectsContent}
        </ul>
    );
}
