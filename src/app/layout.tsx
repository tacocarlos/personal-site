import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carlos\' Personal Website',
  description: 'Website detailing personal projects and hosting some calculators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const anchorClass = 'mr-5 mt-5 text-xl';
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <a href="/about" className={anchorClass + ' ml-1'}>About</a>
          <a href="/calculator" className={anchorClass}>Calculators</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
