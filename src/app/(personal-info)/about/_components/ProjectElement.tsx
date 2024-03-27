'use client';

import { Project } from "@/data/Project";
import styles from "../ProjectDescription.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectElement({project}: {project: Project}) {
    const router = useRouter();
    const params = useSearchParams();

    const projectTagContent = project.tags.map(tag => 
        <div key={tag} className={styles.projectTag}>
            {tag}
        </div>
    )

    function handleClick() {
        const params = new URLSearchParams({ project: project.id});
        const url = "/about/project" + '?' + params.toString();
        router.push(url);
    }

    return <li className={styles.projectDescriptionBox} >
        <h1 className={styles.projectTitle} onClick={handleClick}>
            {project.name}
        </h1>

        <div className={styles.projectTagBox}>
            {projectTagContent}
        </div>

        <p className={styles.projectDescription}>
            {project.summary}
        </p>
    </li>
}