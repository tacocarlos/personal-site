import { useState, useContext, createContext } from "react";
import ProjectModal from "./ProjectModal";
import { Project } from "@/data/Project";

type Callable = () => void;
type SetModal = (project?: Project) => void;

const ShowProjectModalContext = createContext<Callable>(() => {});
const CloseProjectModalContext = createContext<Callable>(() => {});
const SetModalContentContext = createContext<SetModal>(() => {});

export function useShowProjectModal() {
    return useContext(ShowProjectModalContext);
}

export function useCloseProjectModal() {
    return useContext(CloseProjectModalContext);
}

export function useSetModalContent() {
    return useContext(SetModalContentContext);
}

export function ProjectModalProvider({children} : {children: React.ReactElement}) {
    const [modalShow, setModalShow] = useState(false);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const showModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);
    
    // const setProjectContent = (project? : Project) => {
    //     if(project == undefined) {
    //         return;
    //     }
    //     setProject(project);
    // }

    return <>
        <ShowProjectModalContext.Provider value={showModal}>
        <CloseProjectModalContext.Provider value={closeModal}>
        <SetModalContentContext.Provider value={setProject}>
            {children}
            <ProjectModal isOpen={modalShow} project={project}/>
        </SetModalContentContext.Provider>
        </CloseProjectModalContext.Provider>
        </ShowProjectModalContext.Provider>
    </>
}