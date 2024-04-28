import { type ClassValue, clsx } from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function fmtDate(date: Date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export function useIsMounted() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return isMounted;
}

export function sigFig(x: number, digits?: number) {
    digits = digits ?? 5;
    if (Number.isInteger(x)) {
        if (x.toString().length < digits) {
            return x;
        }
    }
    return x.toPrecision(digits);
}

// includePrefix: if true, return the "https://" or "localhost:PORT" parts
export function splitPath(path: string, includePrefix: boolean = false) {
    const pathParts = path.split('/');
    if (pathParts.length === 0) {
        return pathParts;
    }

    if (!includePrefix) {
        if (pathParts[0].startsWith('http')) {
            // A path https://www.google.com will split into [https:, '', www.google.com]
            return pathParts.slice(2);
        } else if (pathParts[0].startsWith('localhost')) {
            // localpath:PORT/about => [localpath:PORT, about]
            return pathParts.slice(1);
        }
    }

    // if path is something like `/about/` => ['', about, '']
    return pathParts.filter((value) => {
        return value !== '';
    });
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

export function range(n: number) {
    return [...Array(n).keys()];
}

export function stripLeft(value: string, matchingPrefix: string) {
    const prefixLen = matchingPrefix.length;
    let result = value;
    console.log(`Stripping '${value}'`);
    while (result.startsWith(matchingPrefix)) {
        result = result.substring(prefixLen);
    }

    console.log(`Resolved to: '${result}'`);
    return result;
}
