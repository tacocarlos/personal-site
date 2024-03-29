import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ComponentProps } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carlos\' Personal Website',
  description: 'Website detailing personal projects and hosting some calculators',
}

function RootNav(props: Omit<ComponentProps<"nav">, "className">) {
  return <nav {...props} className="justify-start w-full bg-gray-500 space-x-2 pl-2"/>
}


function RootLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  return <Link {...props} className="text-2xl text-primary-foreground hover:text-4xl hover:text-secondary"/>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-primary"}>
        <RootNav>
          <RootLink href="/about">About</RootLink>
          <RootLink href="/calculator">Calculators</RootLink>
        </RootNav>
        {children}
      </body>
    </html>
  )
}
