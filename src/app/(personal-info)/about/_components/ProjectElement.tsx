'use client';

import { Project } from "@/data/Project";
import styles from "../ProjectDescription.module.css";
import { useRouter, useSearchParams } from "next/navigation";


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
    const params = useSearchParams();

    const projectTagContent = tags.map(tag => 
        <div key={tag} className={styles.projectTag}>
            {tag}
        </div>
    )

    function handleClick() {
        const params = new URLSearchParams({ project: id});
        const url = "/about/project" + '?' + params.toString();
        router.push(url);
    }

    return <li className={styles.projectDescriptionBox} >
        <h1 className={styles.projectTitle} onClick={handleClick}>
            {name}
        </h1>

        <div className={styles.projectTagBox}>
            {projectTagContent}
        </div>

        <p className={styles.projectDescription}>
            {summary}
        </p>
    </li>
}