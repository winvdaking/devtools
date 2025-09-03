/**
 * Layout racine de l'application Next.js
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevTools Hub - Boîte à outils pour développeurs',
  description: 'Une collection d\'outils essentiels pour les développeurs : formatage JSON, conversion de texte, hachage, encodage Base64 et plus encore.',
  keywords: ['devtools', 'développeur', 'outils', 'JSON', 'Base64', 'UUID', 'hash'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
