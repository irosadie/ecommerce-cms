
import React, { FC, ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tokobudea - #1 Ecommerce in Your Heart',
  description: 'Build by NextJS - 13 by Imronrosadi.com',
}

type RootLayout = {
  children: ReactNode
}

const RootLayout: FC<RootLayout> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
