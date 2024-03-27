"use client";

import { useRef } from "react";
import { useIsVisible } from "./visible";
import "./util.css";
import { PropsWithClass } from "./propTypes/classProp";

export default function FadeInSection(props : PropsWithClass) {
    const ref = useRef(null);
    const isVisible = useIsVisible(ref);

    const visibleSwitch = isVisible ? "transition-opacity ease-in duration-700 opacity-100" : "";
    return (
        <div className={`${visibleSwitch} ${props.className}`} ref={ref}>
            {props.children}
        </div>
    )
}