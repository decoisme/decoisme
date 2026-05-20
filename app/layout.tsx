import type { Metadata } from "next";
import { geist, geistMono } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL('https://decoisme.vercel.app'), // Update setelah deploy
  title: {
    default: 'Decoisme - UI/UX Designer & Creative Developer',
    template: '%s | Decoisme',
  },
  description: 'Professional UI/UX Designer specializing in Instagram feed design, carousel posts, and modern web interfaces. Based in Indonesia, available for freelance projects.',
  keywords: [
    'UI/UX Designer',
    'Instagram Design',
    'Carousel Post Design',
    'Freelance Designer Indonesia',
    'Web Design',
    'Social Media Design',
    'Figma Designer',
    'Next.js Developer',
    'Portfolio Designer',
    'Creative Designer',
  ],
  authors: [{ name: 'Decoisme' }],
  creator: 'Decoisme',
  publisher: 'Decoisme',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://decoisme.vercel.app',
    title: 'Decoisme - UI/UX Designer & Creative Developer',
    description: 'Professional UI/UX Designer specializing in Instagram feed design, carousel posts, and modern web interfaces.',
    siteName: 'Decoisme',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Decoisme Portfolio - UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decoisme - UI/UX Designer & Creative Developer',
    description: 'Professional UI/UX Designer specializing in Instagram feed design, carousel posts, and modern web interfaces.',
    images: ['/og-image.jpg'],
    creator: '@decoisme',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'diK_veXS_04zBm-cPYJRkErR-0LOVz0UhUJjugvmVyA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          <SmoothScrollProvider>
            {children}
            <Toaster position="top-right" />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
