'use client';

import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@data/Project';

import * as ScrollArea from '@radix-ui/react-scroll-area';

type FeaturedProjectsProps = {
    projects: Project[];
};

export function FeaturedSkeleton() {
    return (
        <div>
            <Skeleton />
        </div>
    );
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    // const scrollBarStyle = "flex select-none touch-none p-[2px] bg-black hover:";

    const scrollBarStyle =
        'flex select-none touch-none p-0.5 bg-black transition-colors duration-[160ms] ease-out hover:bg-black data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5';

    const accordionItems = projects.map((project) => {
        return (
            <AccordionItem value={project.id} key={project.id}>
                <AccordionTrigger>
                    <div>
                        <div className="text-left text-2xl">
                            <h2>{project.name}</h2>
                        </div>
                        <Separator className="my-1 mb-2" />
                        <div>
                            <ul className="block-inline space-x-1 text-start">
                                {project.tags.map((tag) => {
                                    return (
                                        <Badge
                                            className="w-fit border-white bg-black"
                                            key={tag}>
                                            {tag}
                                        </Badge>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <Card className="bg-slate-100">
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.tagline}</CardDescription>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <ScrollArea.Root>
                                <ScrollArea.Viewport>
                                    <MarkdownRenderer
                                        markdown={project.description ?? ''}
                                    />
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar
                                    orientation="horizontal"
                                    className={scrollBarStyle}>
                                    <ScrollArea.Thumb />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner />
                            </ScrollArea.Root>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>
        );
    });

    return (
        <div className="rounded-xl bg-primary p-2 text-primary-foreground">
            <Accordion type="multiple">{accordionItems}</Accordion>
        </div>
    );
}
