'use client';

import { Project } from '@prisma/client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { ProjectVisibility } from '../ProjectCard';
import {
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { fmtDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { revalidateAbout } from '@/lib/actions';
import { setProjectHidden, setProjectVisible } from './_actions';
import { useRouter } from 'next/navigation';

type RowType = Row<Project>;
type ProjectActionsProps = {
    row: RowType;
};

function ProjectActions({ row }: ProjectActionsProps) {
    const { toast } = useToast();
    const router = useRouter();

    const projectID = row.getValue('id') as string;
    const isVisible = row.getValue('visible') as boolean;

    // use router and search params to redirect to /<action>?id=<id>
    const notVisibleClass = 'text-red-500 font-semibold';
    const visibleClass = 'text-green-500 font-semibold';
    const visibilityMsg = isVisible ? (
        <span>
            Set as <span className={notVisibleClass}>Not Visible</span>
        </span>
    ) : (
        <span>
            Set as <span className={visibleClass}>Visible</span>
        </span>
    );

    function changeVisibility() {
        if (isVisible) {
            setProjectHidden(projectID)
                .then(revalidateAbout)
                .then(() => {
                    toast({
                        title: `Updated ${row.getValue('name')}`,
                        description: (
                            <p>
                                Set
                                <div className="block bg-gray-400 p-1 rounded font-semibold">
                                    {projectID}
                                </div>
                                to{' '}
                                <span className={notVisibleClass}>
                                    not visible
                                </span>
                            </p>
                        ),
                    });
                });
        } else {
            setProjectVisible(projectID)
                .then(revalidateAbout)
                .then(() => {
                    toast({
                        title: `Updated ${row.getValue('name')}`,
                        description: (
                            <p>
                                Set
                                <div className="block bg-gray-400 p-3 rounded font-semibold">
                                    {projectID}
                                </div>
                                to <span className={visibleClass}>visible</span>
                            </p>
                        ),
                    });
                });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                <DropdownMenuSeparator color="black" />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={changeVisibility}>
                        {visibilityMsg}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => {
                            router.push(`/admin/projects/edit/${projectID}`);
                        }}>
                        Edit Project
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-red-600 font-semibold">
                        Delete Project
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'visible',
        header: 'Visibility',
        cell: ({ row }) => {
            return <ProjectVisibility visibility={row.getValue('visible')} />;
        },
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'tags',
        header: 'Technology Tags',
    },
    {
        accessorKey: 'createdAt',
        header: 'Creation Date',
        cell: ({ row }) => {
            return <span>{fmtDate(row.getValue('createdAt'))}</span>;
        },
    },
    {
        accessorKey: 'updatedAt',
        header: 'Revision Date',
        cell: ({ row }) => {
            return <span>{fmtDate(row.getValue('updatedAt'))}</span>;
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => <ProjectActions row={row} />,
    },
];
