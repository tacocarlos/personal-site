"use client";

import { ProjectTag } from "@/app/types/Tag";

import styles from "./ProjectDescription.module.css"

import FadeInSection from "@/app/util/fadeIn";
import React from "react";
import { createPortal } from "react-dom";

export default function ProjectDescription( props: {
        name: String, 
        tags: ProjectTag[],
        shortDescription : String,
        longDescription : String,
        })
    {
        const projectTagContent = props.tags.map(tag => (
            <div key={tag.tagID} className={`${styles.projectTag}`}>
                {tag.tag}
            </div>            
        ));

        const [showModal, setShowModal] = React.useState(false);        
        const openModal = () => {
            setShowModal(true);
            // alert("Opening modal");
        }

        const closeModal = () => setShowModal(false);


        const projectModal = (
            <dialog className="modal">
                <div>Modal Dialog</div>
                <p>
                    {props.longDescription}
                </p>
                        
                <button onClick={closeModal}>Close</button>
            </dialog>
        );

        const modalContent = showModal ? createPortal(projectModal, document.body) : "";

        return (
            <FadeInSection className={`${styles.projectDescriptionBox}`}>
                <h1 className={styles.projectTitle}
                onClick={openModal}>
                    {props.name}
                </h1>
                <div className={`${styles.projectTagBox}`}>
                    {projectTagContent}
                </div>
                <p className={styles.projectDescription}>
                    {props.shortDescription}
                </p>
                
                { modalContent }
            </FadeInSection>
        );
    }
