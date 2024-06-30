import QueryWrapper from './components/QueryWrapper'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hex Bot - Ban History',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">

      <body>

        <QueryWrapper>

          {children}

        </QueryWrapper>

      </body>

    </html>

  )
}