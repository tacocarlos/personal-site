import Bio from "@/app/components/about/biography/biography";
import ProjectSection from "./ProjectPanel";
import { Suspense } from "react";

export default function About() {
    return (
        <main>
            <div id="bio">
                <Bio/>                
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ProjectSection/>
            </Suspense>
        </main>
    );
}