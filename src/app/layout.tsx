import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wakamoon - Étude de marché pour business SAAS',
  description: 'Obtenez une étude de marché personnalisée pour lancer votre business SAAS !',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900`}>
        {children}
      </body>
    </html>
  )
}