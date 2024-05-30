import { Project } from '@data/Project';
import { selectProjects } from '../about/_actions/projects';
import ProjectCard from '@/components/admin/ProjectCard';

function AllProjectsPanel({ projects }: { projects: Project[] }) {
    return (
        <>
            <div className="mx-10 my-5 rounded-xl bg-gray-500 p-5">
                <p className=" mb-3 text-4xl font-semibold text-primary-foreground">
                    All Projects
                </p>
                <div className="flex flex-wrap content-center gap-4">
                    {projects.map((project) => (
                        <ProjectCard {...project} key={project.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default async function AdminDashboard() {
    const projects = (await selectProjects('all'))
        .filter((project) => project !== undefined)
        .sort((a, b) => {
            // case 1: one is visible and one is not
            if (a.visible === true && b.visible === false) {
                return -1;
            } else if (a.visible === false && b.visible === true) {
                return 1;
            }

            // case 2: both have same visibilty; order by date

            if (a.updatedAt.getDate() > b.updatedAt.getDate()) {
                return -1;
            } else if (a.updatedAt.getDate() < b.updatedAt.getDate()) {
                return 1;
            }

            // case 3: order alphabetically
            return a.name.localeCompare(b.name);
        });
    return (
        <>
            <AllProjectsPanel projects={projects} />
        </>
    );
}
