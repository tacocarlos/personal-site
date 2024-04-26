import { ReactNode } from 'react';

type CalculatorLayoutProps = {
    children: ReactNode;
};

export default function CalculatorLayout({ children }: CalculatorLayoutProps) {
    return <section className="h-full w-full pt-2">{children}</section>;
}
