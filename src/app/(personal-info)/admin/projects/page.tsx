import DBButtons from "@/components/admin/DashboardButtons";
import ProjectTable from "@/components/admin/project-table/ProjectTable";
import { columns } from "@/components/admin/project-table/columns";
import { selectProjects } from "@/app/(personal-info)/about/_actions/projects"

export default async function ManageProjects() {
    const projects = await selectProjects('all');
    return <div className="pt-3 px-20 space-y-5">
        <DBButtons/>
        <ProjectTable columns={columns} data={projects}/>
    </div>
}