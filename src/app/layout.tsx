/**
 * Layout racine de l'application Next.js
 */
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "dlpz.fr - DevTools - Boîte à outils pour développeurs",
  description:
    "Une collection d'outils essentiels pour les développeurs : formatage JSON, conversion de texte, hachage, encodage Base64 et plus encore.",
  keywords: [
    "devtools",
    "développeur",
    "outils",
    "JSON",
    "Base64",
    "UUID",
    "hash",
  ],
  icons: {
    icon: "https://dorianlopez.fr/avatar.png",
    shortcut: "https://dorianlopez.fr/avatar.png",
    apple: "https://dorianlopez.fr/avatar.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} ${poppins.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
