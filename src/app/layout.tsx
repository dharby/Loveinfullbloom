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
  keywords: ["wedding", "Nigerian wedding", "Oreoluwa", "Daberechukwu", "2026", "Lagos", "Philus-Ogun", "Ekwubiri", "Lavender", "Mint", "LoveInFullBloom"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Oreoluwa & Daberechukwu | Wedding Celebration",
    description: "Friday, March 20th, 2026 — The Charis Center, Ikeja, Lagos",
    type: "website",
    locale: "en_NG",
    siteName: "Oreoluwa & Daberechukwu Wedding",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oreoluwa & Daberechukwu Wedding — March 20, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oreoluwa & Daberechukwu | Wedding Celebration",
    description: "Friday, March 20th, 2026 — The Charis Center, Ikeja, Lagos",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8FB" },
    { media: "(prefers-color-scheme: dark)", color: "#2D6A4F" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Oreoluwa & Daberechukwu Wedding Celebration",
  startDate: "2026-03-20T08:00:00+01:00",
  endDate: "2026-03-20T18:00:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "The Charis Center",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Etal Avenue First Bank B/Stop, off Kudirat Abiola Way",
      addressLocality: "Ikeja, Lagos",
      addressCountry: "NG",
    },
  },
  performer: [
    { "@type": "Person", name: "Oreoluwa Esther Philus-Ogun" },
    { "@type": "Person", name: "Daberechukwu Oladimeji Ekwubiri" },
  ],
  description: "Wedding celebration of Oreoluwa and Daberechukwu at The Charis Center, Ikeja, Lagos.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
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