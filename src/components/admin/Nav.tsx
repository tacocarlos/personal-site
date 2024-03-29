"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({children} : Readonly<{children: ReactNode}>) {
    return <nav className="bg-secondary-foreground text-primary-foreground flex justify-center space-x-5 border-separate border-white">
        {children}
    </nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathName = usePathname();
    const defaultClassName = "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground";
    const selectedClassName = pathName === props.href  && "bg-background text-foreground";
    return <Link {...props} className={cn(defaultClassName, selectedClassName)}/>
}