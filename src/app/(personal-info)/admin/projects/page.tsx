import DBButtons from '@/components/admin/DashboardButtons';
import ProjectTable from '@/components/admin/project-table/ProjectTable';
import { columns } from '@/components/admin/project-table/columns';
import { selectProjects } from '@/app/(personal-info)/about/_actions/projects';

export default async function ManageProjects() {
    const projects = (await selectProjects('all')).sort((a, b) => {
        if (a.visible === true && b.visible === false) {
            return -1;
        } else if (a.visible === false && b.visible === true) {
            return 1;
        }

        if (
            a.updatedAt.getUTCMilliseconds() > b.updatedAt.getUTCMilliseconds()
        ) {
            return -1;
        } else if (
            a.updatedAt.getUTCMilliseconds() < b.updatedAt.getUTCMilliseconds()
        ) {
            return 1;
        }
        return a.name.localeCompare(b.name);
    });

    // return <div className="pt-3 px-20 space-y-5">
    return (
        <div className="flex flex-col w-4/5 m-auto space-y-2">
            <DBButtons />
            <ProjectTable columns={columns} data={projects} />
        </div>
    );
}
