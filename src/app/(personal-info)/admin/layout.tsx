import { Nav, NavLink } from "@/components/admin/Nav";
import { ReactNode } from "react";

export default function AdminLayout({children} : Readonly<{children: ReactNode}>) {
    return <div className=" w-screen mx-5 space-y-5">
            <div className="flex justify-center">
                <Nav>
                    <NavLink href="/admin">Dashboard</NavLink>
                    <NavLink href="/admin/bio">Manage Bio</NavLink>
                    <NavLink href="/admin/projects">Manage Projects</NavLink>
                </Nav>
            </div>
            {children}
    </div>
}