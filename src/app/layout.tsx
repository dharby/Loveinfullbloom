import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oreoluwa & Daberechukwu | Wedding Celebration",
  description:
    "Join us as we celebrate the wedding of Oreoluwa Esther Philus-Ogun and Daberechukwu Oladimeji Ekwubiri on Friday, March 20th, 2026 at The Charis Center, Ikeja, Lagos.",
  keywords: ["wedding", "Nigerian wedding", "Oreoluwa", "Daberechukwu", "2026", "Lagos", "Philus-Ogun", "Ekwubiri", "Lavender", "Mint"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Oreoluwa & Daberechukwu | Wedding Celebration",
    description: "Friday, March 20th, 2026 — The Charis Center, Ikeja, Lagos",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8FB" },
    { media: "(prefers-color-scheme: dark)", color: "#2D6A4F" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              // Always launch in light mode, ignoring any previously saved theme.
              localStorage.removeItem('wedding-theme');
              document.documentElement.classList.remove('dark');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-screen bg-cream dark:bg-mint text-ink dark:text-cream antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}