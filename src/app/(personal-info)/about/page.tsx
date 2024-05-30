import FeaturedProjects, { FeaturedSkeleton } from './FeaturedProjects';
import ProjectShowcase from './ProjectShowcase';
import { Suspense } from 'react';
import { selectProjects } from './_actions/projects';
import db from '@/database/db';
import { Separator } from '@/components/ui/separator';
import BioRender from './_components/BioRenderer';

async function getFeatured() {
    return (
        (await db.project.findMany({
            where: {
                visible: true,
                featured: true,
            },
        })) ?? []
    );
}

async function getBio() {
    const result = await db.biography.findFirst({
        select: {
            content: true,
        },
        where: {
            selected: true,
        },
    });

    if (result === null) {
        return "Couldn't Get Bio";
    }

    return result.content;
}

export default async function About() {
    return (
        <main className="mt-5 space-y-5">
            <Suspense>
                <BioRender bio={await getBio()} />
            </Suspense>
            <h2 className="text-3xl text-white">Featured Projects</h2>
            <Suspense>
                <FeaturedProjects projects={await getFeatured()} />
            </Suspense>
            <Separator className="mb-5 mt-5" />
            <span>All Projects</span>
            <Suspense>
                <ProjectShowcase />
            </Suspense>
        </main>
    );
}
