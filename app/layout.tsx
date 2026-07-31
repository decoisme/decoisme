import type { Metadata } from "next";
import { geist, geistMono } from "@/lib/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/structured-data";
import { I18nProvider } from "@/lib/i18n";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageLoading } from "@/components/ui/page-loading";

export const metadata: Metadata = {
  metadataBase: new URL('https://decoisme.vercel.app'), // Update setelah deploy
  title: {
    default: 'Decoisme - Developer & Designer',
    template: '%s | Decoisme',
  },
  description: 'Professional Developer & Designer specializing in web development, UI/UX design, Instagram content, PowerPoint presentations, and modern digital experiences. Based in Indonesia, available for freelance projects.',
  keywords: [
    'Developer & Designer',
    'UI/UX Designer',
    'Web Developer',
    'Full Stack Developer',
    'PowerPoint Designer',
    'Google Slides Designer',
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
    title: 'Decoisme - Developer & Designer',
    description: 'Professional Developer & Designer specializing in web development, UI/UX design, Instagram content, PowerPoint presentations, and modern digital experiences.',
    siteName: 'Decoisme',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Decoisme Portfolio - Developer & Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decoisme - Developer & Designer',
    description: 'Professional Developer & Designer specializing in web development, UI/UX design, Instagram content, PowerPoint presentations, and modern digital experiences.',
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
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen text-black antialiased font-sans relative">
        <PageLoading />
        <ScrollProgress />
        <I18nProvider>
          {children}
          <Toaster position="top-right" />
        </I18nProvider>
      </body>
    </html>
  );
}
