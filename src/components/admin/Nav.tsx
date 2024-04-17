"use client";

import { cn, isSubpath } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { Url } from "next/dist/shared/lib/router/router";

export function Nav({children} : Readonly<{children: ReactNode}>) {
    return <nav className="p-1 bg-secondary-foreground text-primary-foreground space-x-5 w-fit flex justify-center">
        {children}
    </nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathName = usePathname();
    const defaultClassName = "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground";
    const selectedClassName = isSubpath(pathName, props.href) ? "bg-background text-foreground" : "";
    return <Link {...props} className={cn(defaultClassName, selectedClassName)}/>
}