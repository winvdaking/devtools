/**
 * Layout racine de l'application Next.js
 */
import type { Metadata } from "next";
import { Poppins, Playfair_Display, Kantumruy_Pro } from "next/font/google";
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

const kantumruyPro = Kantumruy_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-kantumruy-pro",
});

export const metadata: Metadata = {
  title: "dlpz.fr - DevTools - Boîte à outils pour développeurs",
  description:
    "Une collection d'outils essentiels pour les développeurs : formatage JSON, conversion de texte, hachage, encodage Base64, cheatsheets et plus encore.",
  keywords: [
    "devtools",
    "développeur",
    "outils",
    "JSON",
    "Base64",
    "UUID",
    "hash",
    "cheatsheets",
    "git",
    "docker",
    "bash",
    "formatage",
    "encodage",
    "générateur",
    "référence",
  ],
  authors: [{ name: "Dorian Lopez", url: "https://dorianlopez.fr" }],
  creator: "Dorian Lopez",
  publisher: "dlpz.fr",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tools.dlpz.fr",
    title: "dlpz.fr - DevTools - Boîte à outils pour développeurs",
    description:
      "Une collection d'outils essentiels pour les développeurs : formatage JSON, conversion de texte, hachage, encodage Base64, cheatsheets et plus encore.",
    siteName: "dlpz.fr DevTools",
    images: [
      {
        url: "https://dorianlopez.fr/avatar.png",
        width: 1200,
        height: 630,
        alt: "dlpz.fr DevTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dlpz.fr - DevTools - Boîte à outils pour développeurs",
    description:
      "Une collection d'outils essentiels pour les développeurs : formatage JSON, conversion de texte, hachage, encodage Base64, cheatsheets et plus encore.",
    images: ["https://dorianlopez.fr/avatar.png"],
    creator: "@dorianlopez",
  },
  icons: {
    icon: "https://dorianlopez.fr/avatar.png",
    shortcut: "https://dorianlopez.fr/avatar.png",
    apple: "https://dorianlopez.fr/avatar.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} ${kantumruyPro.variable} ${poppins.className}`}
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
