import FeaturedProjects, { FeaturedSkeleton } from './FeaturedProjects';
import ProjectShowcase from './ProjectShowcase';
import { Suspense } from 'react';
import { selectProjects } from './_actions/projects';
import db from '@/database/db';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import {
    getStaticBio,
    getStaticFeatured,
} from './temp_project_data/getStaticData';

async function getFeatured() {
    return (
        (await db.project.findMany({
            where: {
                visible: true,
                // featured: true
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
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (result === null) {
        return "Couldn't Get Bio";
    }

    return result?.content ?? '';
}

export default async function About() {
    return (
        <main className="mt-5 space-y-5">
            <Suspense>
                <div className="bg-muted rounded-xl">
                    <MarkdownRenderer
                        markdown={await getStaticBio()}
                        className="text-black p-2"
                    />
                </div>
            </Suspense>
            <h2 className="text-3xl text-white">Featured Projects</h2>
            <Suspense>
                <FeaturedProjects projects={await getStaticFeatured()} />
            </Suspense>
            <Separator className="mt-5 mb-5" />
            <span>All Projects</span>
            <Suspense>
                <ProjectShowcase />
            </Suspense>
        </main>
    );
}
