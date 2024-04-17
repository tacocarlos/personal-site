import { selectProjects } from "../about/_actions/projects"
import ProjectCard from "@/components/admin/ProjectCard";

export default async function AdminDashboard() {
    const projects = (await selectProjects("all")).filter(project => project !== undefined);
    return <div className="mx-10 my-5 bg-gray-500 p-5 rounded-xl">
        <p className=" mb-3 text-4xl text-primary-foreground font-semibold">All Projects</p>
        <div className="flex flex-wrap gap-4 content-center">
            {projects.map(project => <ProjectCard {...project} key={project.id}/>)}
        </div>
    </div>
}