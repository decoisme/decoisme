import type { Metadata } from "next";
import { geist, geistMono } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Decoisme - UI/UX Designer & Creative Developer",
  description: "Portfolio of a creative designer specializing in UI/UX design, web development, and digital experiences.",
  keywords: ["portfolio", "UI/UX designer", "web developer", "Figma", "Next.js", "React", "Design"],
  authors: [{ name: "Decoisme" }],
  openGraph: {
    title: "Decoisme - UI/UX Designer & Creative Developer",
    description: "Crafting beautiful digital experiences with design-first approach",
    type: "website",
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
