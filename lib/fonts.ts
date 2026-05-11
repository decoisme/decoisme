import { Geist, Geist_Mono } from 'next/font/google';

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
