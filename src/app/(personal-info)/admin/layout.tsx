import { Nav, NavLink } from "@/components/admin/Nav";
import { ReactNode } from "react";

export default function AdminLayout({children} : Readonly<{children: ReactNode}>) {
    return <main className="">
        <Nav>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/bio">Manage Bio</NavLink>
            <NavLink href="/admin/projects">Manage Projects</NavLink>
        </Nav>
        {children}
    </main>
}