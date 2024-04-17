export default async function isAuthMatch(
    input: string,
    expected: string | undefined
) {
    if (expected === undefined) return false;

    return (await hashItem(input)) === expected;
}

async function hashItem(item: string) {
    const buf = await crypto.subtle.digest(
        'SHA-512',
        new TextEncoder().encode(item)
    );
    return Buffer.from(buf).toString('base64');
}
