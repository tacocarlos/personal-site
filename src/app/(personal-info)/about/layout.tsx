import { ReactNode } from 'react';

export default function Layout({
    children,
    selectedProject,
}: {
    children: ReactNode;
    selectedProject: ReactNode;
}) {
    return (
        <>
            <div className=" bg-gray-600  w-5/6 p-5 rounded-3xl mt-5 left-1/2">
                {children}
            </div>
            <div>{selectedProject}</div>
        </>
    );
}
