import Link from 'next/link';
import { ReactNode } from 'react';

function L({ href, children }: { href: string; children?: ReactNode }) {
    return (
        <Link className="w-fit rounded border border-blue-700 p-5" href={href}>
            {children ?? href}
        </Link>
    );
}

export default function Home() {
    return (
        <div className="mt-10 flex w-full flex-col space-y-4 bg-muted p-10">
            <L href="/about">About Me</L>
            <L href="/about">Blog Page (coming soon)</L>
            <L href="calculator">Calculator Section</L>
        </div>
    );
}
