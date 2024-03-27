import { Project } from "@/data/Project"

export type ProjectAPIResponse = Response | {
    projects: Project[]
}