"use client";

import { Project } from "@prisma/client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ProjectVisibility } from "../ProjectCard";
import { DropdownMenuGroup, DropdownMenuSeparator, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { fmtDate } from "@/lib/utils";

type RowType = Row<{
    id: string;
    name: string;
    tags: string[];
    tagline: string;
    summary: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    visible: boolean;
    projectLink: string | null;
    sourceLink: string | null;
}>

type ProjectActionsProps = {
    row: RowType
}
function ProjectActions({row}: ProjectActionsProps) {
    // use router and search params to redirect to /<action>?id=<id>
    const notVisibleClass = "text-red-500 font-semibold";
    const visibleClass = "text-green-500 font-semibold";
    const visibilityMsg = row.getValue("visible") ? <span>Set as <span className={notVisibleClass}>Not Visible</span></span> : <span>Set as <span className={visibleClass}>Visible</span></span>

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div>
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            
            <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
            <DropdownMenuSeparator color="black"/>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    {visibilityMsg}
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Preview Project
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Update Project
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator/>

            <DropdownMenuGroup>
                <DropdownMenuItem className="text-red-600 font-semibold">
                    Delete Project
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}


export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "visible",
        header: "Visibility",
        cell: ({row}) => {
            return <ProjectVisibility visibility={row.getValue("visible")}/>
        },
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "tags",
        header: "Technology Tags"
    },
    {
        accessorKey: "createdAt",
        header: "Creation Date",
        cell: ({row}) => {
            return <span>{fmtDate(row.getValue("createdAt"))}</span>
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Revision Date",
        cell: ({row}) => {
            return <span>{fmtDate(row.getValue("updatedAt"))}</span>
        }
    },
    {
        accessorKey: "actions",
        header: "",
        cell: ({row}) => <ProjectActions row={row}/>
    },
]