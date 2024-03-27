import React from "react";

import styles from "./about-sub-menu.module.css"
import { PropsWithClass } from "@/app/util/propTypes/classProp"


export function NavBarItem(props : PropsWithClass & {href: string}) {
    const [isHovered, setIsHovered] = React.useState(false);
    const setHoverFalse = () => {setIsHovered(false);}
    const setHoverTrue = () => {setIsHovered(true);}

    const hoverStyleState = isHovered ? styles.hover : "";
    const propStyles = props.className ?? "";

    return (
        <a className={`${styles.navBarItem} ${propStyles} ${hoverStyleState}`} 
            href={props.href}
            onMouseEnter={setHoverTrue} onMouseLeave={setHoverFalse}
        >
            {props.children}
        </a>
    )
}


export default function NavBar(props: PropsWithClass) {
    return (
        <nav className={`${styles.navBar} ${props.className}`}>
            {props.children}
        </nav>
    )
}