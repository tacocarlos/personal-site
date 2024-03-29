import ProjectSection from "./ProjectPanel";
import { Suspense } from "react";

export default function About() {
    return (
        <main className="mt-5">
            <Suspense fallback={<div>Loading...</div>}>
                <ProjectSection/>
            </Suspense>
        </main>
    );
}