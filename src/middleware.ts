import { NextRequest, NextResponse } from 'next/server';
import isAuthMatch from './lib/isAuthMatch';

export async function middleware(req: NextRequest) {
    if ((await isAdminAuthenticated(req)) === false) {
        const init = {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic',
            },
        };
        return new NextResponse('Unauthorized', init);
    }
}

async function isAdminAuthenticated(req: NextRequest) {
    const authHeader =
        req.headers.get('authorization') || req.headers.get('Authorization');

    if (authHeader == null) return false;

    const [user, pass] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');
    return (
        (await isAuthMatch(user, process.env.ADMIN_USER)) &&
        (await isAuthMatch(pass, process.env.ADMIN_PASS))
    );
}

export const config = {
    matcher: '/admin/:path*',
};
