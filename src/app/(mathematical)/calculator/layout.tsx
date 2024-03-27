import { ReactNode } from "react"

type CalculatorLayoutProps =  {
    children: ReactNode
}

export default function CalculatorLayout({children}: CalculatorLayoutProps) {
    return <section>
        <h1>{`Carlos' Calculator`}</h1>
        {children}
    </section>

}