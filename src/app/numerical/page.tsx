import Link from 'next/link';

export default function Page() {
    return (
        <main className="rounded-xl bg-secondary p-3">
            <h1>Calculator Landing Page</h1>
            <p>
                {' '}
                This is where various algorithms from{' '}
                <em>Numberical Analysis 8th Ed. (Burden, Faires)</em> and{' '}
                <em>Scientific Computing Rev. 2nd Ed. (Heath)</em> will reside
            </p>
            <Link href="/calculator/matrix/eigen-value-power-method">
                Power Method for Eigenvalue Approximation
            </Link>
        </main>
    );
}
