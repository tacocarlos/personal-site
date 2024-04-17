import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function fmtDate(date: Date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export function isSubpath(pathName: string, href: Url) {
    if (typeof href === 'string') {
        const startsWith = pathName.startsWith(href);

        // if pathname starts with href, it is either the current page or the root admin page
        if (href === '/admin') {
            return pathName === '/admin';
        }

        return startsWith;
    }

    return false;
}
