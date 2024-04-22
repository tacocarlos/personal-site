import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn, isSubpath } from '@/lib/ssrUtils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Carlos' Personal Website",
    description:
        'Website detailing personal projects and hosting some calculators',
};

const NavBorderCN =
    'border-b-2 pb-2 md:border-b-0 md:border-r-2 md:pb-0 md:pr-2 border-gray-600';

function SiteTitle() {
    const className = cn(
        NavBorderCN,
        'text-3xl text-green-500 md:text-yellow-300 lg:text-pink-400'
    );
    return (
        <a href="/" className={className}>
            {"Carlos' Website"}
        </a>
    );
}

function RootNav(props: Omit<ComponentProps<'nav'>, 'className'>) {
    return (
        <nav
            {...props}
            className="mx-3 px-5 pb-4 pt-1 bg-muted space-x-2 rounded-b-xl grid md:block">
            <SiteTitle />
            {props.children}
        </nav>
    );
}

function RootLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
    const className = cn(NavBorderCN, 'text-2xl text-foreground');
    return <Link {...props} className={className} />;
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className + ' bg-primary'}>
                <RootNav>
                    <RootLink href="/about">About</RootLink>
                    <RootLink href="/calculator">Calculators</RootLink>
                </RootNav>
                <div className="flex items-center justify-center">
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
