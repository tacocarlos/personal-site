'use client';

import styles from "../ProjectDescription.module.css";
import { useRouter } from "next/navigation";

import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


type ProjectProps = {
    id: string,
    name: string,
    tags: string[],
    summary: string,
    description: string | null,
    createdAt: Date,
    updatedAt: Date,
    visible: boolean,
}

export default function ProjectElement({id, name, tags, summary, description, createdAt, updatedAt, visible}: ProjectProps) {
    const router = useRouter();

    function handleClick() {
        const params = new URLSearchParams({ project: id});
        const url = "/about/project" + '?' + params.toString();
        router.push(url);
    }

    return <Card>
        <CardHeader>
            <CardTitle onClick={handleClick}>{name}</CardTitle>
            <div className="inline space-x-1 select-none">
                {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
            </div>
        </CardHeader>
        <CardContent>
            {summary}
        </CardContent>
    </Card>



    // return <li className={styles.projectDescriptionBox} >
    //     <h1 className={styles.projectTitle} onClick={handleClick}>
    //         {name}
    //     </h1>

    //     <div className={styles.projectTagBox}>
    //         {projectTagContent}
    //     </div>

    //     <p className={styles.projectDescription}>
    //         {summary}
    //     </p>
    // </li>
}