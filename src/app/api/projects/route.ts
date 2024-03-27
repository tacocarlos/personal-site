import { ProjectTag } from "@/app/types/Tag";
import { Project, createProject } from "@/data/Project";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

const knownProjects = [
    createProject("Test Title #1", [ProjectTag.CPP, ProjectTag.CSharp], "This is a bit more detailed summary", `# Header 1`, 'project1'),
    createProject("Test Title #2", [ProjectTag.CPP, ProjectTag.JavaScript], "This is a summary 2", `# Header 2`),
    createProject("Test Title #3", [ProjectTag.CPP, ProjectTag.Python2], "This is a summary 3", `# Header 3`),
    createProject("Test Title #4", [ProjectTag.TypeScript], "This is a summary 4", `# Header 4`),
    createProject("Test Title #5", [ProjectTag.CPP, ProjectTag.Python], "This is a summary 5", `# Header 5`),
]

const database = new Map();
knownProjects.map((project) => {
    database.set(project.id, project);
})

type ProjectResponse = {
    projects: Project[],
    project: undefined | Project
}

export async function GET(req: NextRequest) {
    console.log("Got request");
    console.log('searchParams: ' + req.nextUrl.searchParams.toString());
    const requestedProject = req.nextUrl.searchParams.get('project');
    console.log(requestedProject);

    const responseJSON: ProjectResponse = { 
        projects: [],
        project: undefined
    }

    if(requestedProject !== null) {
        console.log("fetching requested project")
        if(database.has(requestedProject)) {
            responseJSON.project = database.get(requestedProject);
        }
    } else {
        console.log("Providing projects");
        responseJSON.projects = knownProjects;
    }
    

    console.log("Sent response");
    return Response.json(responseJSON);
}