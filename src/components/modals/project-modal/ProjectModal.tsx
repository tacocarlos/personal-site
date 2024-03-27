import Modal from "react-modal";
import Markdown from "react-markdown";

import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { useCloseProjectModal } from "./ProjectModalContext";
import { Project } from "@/data/Project";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";

function getModalContent(project?: Project) {
    if(project === undefined) {
        return <></>;
    }

    // If project lacks a description, render a larger version of the preview
    // Otherwise, just render the description as markdown
    if(project.description === undefined) {
        return <>
            <h1 className="text-lg">{project.name}</h1>
            <p className="bg-slate-100 text-center text-lg">{project.summary}</p>
        </>
    }

    return <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeRaw]} className="prose">
        {project.description}
    </Markdown>
}

export default function ProjectModal({ isOpen, project } : { isOpen: boolean, project? : Project}) {
    const closeModal = useCloseProjectModal();
    return <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false}>
        {getModalContent(project)}
    </Modal>
}