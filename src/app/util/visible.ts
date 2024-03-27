"use client";

import { useEffect, useState } from "react";

// TODO: fix ref type
export function useIsVisible(ref:any, options? : object) {
    if(options == null) {
        options = {
            root:null,
            rootMargin : "0px",
        }
    }
    
    const [isVisible, setState] = useState(false);
    const intersectHandler = (entries: any[]) => entries.forEach( (entry) => setState(entry.isIntersecting));

    useEffect(() => {
        const observer = new IntersectionObserver(intersectHandler, options);

        if(ref.current) {
            observer.observe(ref.current);
        }
        
        const handleLeave = () => {
            if(ref.current) {
                observer.disconnect();
            }
        }
        return handleLeave;
        
    }, [options, ref]);

    return isVisible;
}